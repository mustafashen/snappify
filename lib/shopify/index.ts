import { HIDDEN_PRODUCT_TAG, SHOPIFY_GRAPHQL_API_ENDPOINT, TAGS, defaultSort } from 'lib/constants';
import { isShopifyError } from 'lib/type-guards';
import { ensureStartsWith } from 'lib/utils';
import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  addToCartMutation,
  createCartMutation,
  editCartItemsMutation,
  removeFromCartMutation
} from './mutations/cart';
import { getCartQuery } from './queries/cart';
import {
  getCollectionProductsQuery,
  getCollectionQuery,
  getCollectionsQuery
} from './queries/collection';
import { getMenuQuery } from './queries/menu';
import { getPageQuery, getPagesQuery } from './queries/page';
import {
  getProductQuery,
  getProductRecommendationsQuery,
  getProductsQuery
} from './queries/product';
import {
  Cart,
  Collection,
  Connection,
  Customer,
  CustomerAccessToken,
  CustomerAddress,
  Image,
  Menu,
  Page,
  Product,
  ShopifyActivateCustomerOperation,
  ShopifyAddToCartOperation,
  ShopifyCart,
  ShopifyCartOperation,
  ShopifyCollection,
  ShopifyCollectionOperation,
  ShopifyCollectionProductsOperation,
  ShopifyCollectionsOperation,
  ShopifyCreateCartOperation,
  ShopifyCreateCustomerAddressOperation,
  ShopifyCustomerAccessTokenCreateOperation,
  ShopifyCustomerAccessTokenDeleteOperation,
  ShopifyCustomerCreateOperation,
  ShopifyCustomerUpdateOperation,
  ShopifyDeleteCustomerAddressOperation,
  ShopifyGetCustomerOperation,
  ShopifyMenuOperation,
  ShopifyPageOperation,
  ShopifyPagesOperation,
  ShopifyProduct,
  ShopifyProductOperation,
  ShopifyProductRecommendationsOperation,
  ShopifyProductSearchOperation,
  ShopifyProductsOperation,
  ShopifyRecoverCustomerOperation,
  ShopifyRemoveFromCartOperation,
  ShopifyResetCustomerOperation,
  ShopifyUpdateCartOperation,
  ShopifyUpdateCustomerAddressOperation,
  ShopifyUpdateDefaultCustomerAddressOperation
} from './types';
import { customerAccessTokenCreateMutation, customerAccessTokenDeleteMutation, customerActivateMutation, customerAddressCreateMutation, customerAddressDeleteMutation, customerAddressUpdateDefaultMutation, customerAddressUpdateMutation, customerCreateMutation, customerRecoverMutation, customerResetMutation, customerUpdateMutation } from './mutations/customer';
import { productSearchQuery } from './queries/search';
import { getCustomerQuery } from './queries/customer';

const domain = process.env.SHOPIFY_STORE_DOMAIN
  ? ensureStartsWith(process.env.SHOPIFY_STORE_DOMAIN, 'https://')
  : '';
const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never;

export async function shopifyFetch<T>({
  cache = 'force-cache',
  headers,
  query,
  tags,
  variables
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key,
        ...headers
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
      cache,
      ...(tags && { next: { tags } })
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e) {
    if (isShopifyError(e)) {
      throw {
        cause: e.cause?.toString() || 'unknown',
        status: e.status || 500,
        message: e.message,
        query
      };
    }

    throw {
      error: e,
      query
    };
  }
}

const removeEdgesAndNodes = (array: Connection<any>) => {
  return array.edges.map((edge) => edge?.node);
};

const reshapeCart = (cart: ShopifyCart): Cart => {
  if (!cart.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = {
      amount: '0.0',
      currencyCode: 'USD'
    };
  }

  return {
    ...cart,
    lines: removeEdgesAndNodes(cart.lines)
  };
};

const reshapeCollection = (collection: ShopifyCollection): Collection | undefined => {
  if (!collection) {
    return undefined;
  }

  return {
    ...collection,
    path: `/search/${collection.handle}`
  };
};

const reshapeCollections = (collections: ShopifyCollection[]) => {
  const reshapedCollections = [];

  for (const collection of collections) {
    if (collection) {
      const reshapedCollection = reshapeCollection(collection);

      if (reshapedCollection) {
        reshapedCollections.push(reshapedCollection);
      }
    }
  }

  return reshapedCollections;
};

const reshapeImages = (images: Connection<Image>, productTitle: string) => {
  const flattened = removeEdgesAndNodes(images);

  return flattened.map((image) => {
    const filename = image.url.match(/.*\/(.*)\..*/)[1];
    return {
      ...image,
      altText: image.altText || `${productTitle} - ${filename}`
    };
  });
};

const reshapeProduct = (product: ShopifyProduct, filterHiddenProducts: boolean = true) => {
  if (!product || (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))) {
    return undefined;
  }

  const { images, variants, ...rest } = product;

  return {
    ...rest,
    images: reshapeImages(images, product.title),
    variants: removeEdgesAndNodes(variants)
  };
};

const reshapeProducts = (products: ShopifyProduct[]) => {
  const reshapedProducts = [];

  for (const product of products) {
    if (product) {
      const reshapedProduct = reshapeProduct(product);

      if (reshapedProduct) {
        reshapedProducts.push(reshapedProduct);
      }
    }
  }

  return reshapedProducts;
};

export async function reshapeCustomer(customer: Customer) {
  return {...customer}
}

export async function reshapeCustomerAddress(customerAddress: CustomerAddress) {
  return {...customerAddress}
}

export async function reshapeCustomerAccessToken(customerAccessToken: CustomerAccessToken) {
  return {...customerAccessToken}
}

export async function createCart(): Promise<Cart> {
  const res = await shopifyFetch<ShopifyCreateCartOperation>({
    query: createCartMutation,
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.cartCreate.cart);
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyAddToCartOperation>({
    query: addToCartMutation,
    variables: {
      cartId,
      lines
    },
    cache: 'no-store'
  });
  return reshapeCart(res.body.data.cartLinesAdd.cart);
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
    query: removeFromCartMutation,
    variables: {
      cartId,
      lineIds
    },
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.cartLinesRemove.cart);
}

export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyUpdateCartOperation>({
    query: editCartItemsMutation,
    variables: {
      cartId,
      lines
    },
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

export async function getCart(cartId: string): Promise<Cart | undefined> {
  const res = await shopifyFetch<ShopifyCartOperation>({
    query: getCartQuery,
    variables: { cartId },
    tags: [TAGS.cart],
    cache: 'no-store'
  });

  // Old carts becomes `null` when you checkout.
  if (!res.body.data.cart) {
    return undefined;
  }

  return reshapeCart(res.body.data.cart);
}

export async function getCollection(handle: string): Promise<Collection | undefined> {
  const res = await shopifyFetch<ShopifyCollectionOperation>({
    query: getCollectionQuery,
    tags: [TAGS.collections],
    variables: {
      handle
    }
  });

  return reshapeCollection(res.body.data.collection);
}

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
    query: getCollectionProductsQuery,
    tags: [TAGS.collections, TAGS.products],
    variables: {
      handle: collection,
      reverse,
      sortKey: sortKey === 'CREATED_AT' ? 'CREATED' : sortKey
    }
  });

  if (!res.body.data.collection) {
    console.log(`No collection found for \`${collection}\``);
    return [];
  }

  return reshapeProducts(removeEdgesAndNodes(res.body.data.collection.products));
}

export async function getCollections(): Promise<Collection[]> {
  const res = await shopifyFetch<ShopifyCollectionsOperation>({
    query: getCollectionsQuery,
    tags: [TAGS.collections]
  });
  const shopifyCollections = removeEdgesAndNodes(res.body?.data?.collections);
  const collections = [
    {
      handle: '',
      title: 'All',
      description: 'All products',
      seo: {
        title: 'All',
        description: 'All products'
      },
      path: '/search',
      updatedAt: new Date().toISOString()
    },

    ...reshapeCollections(shopifyCollections).filter(
      (collection) => !collection.handle.startsWith('hidden')
    )
  ];

  return collections;
}

export async function getMenu(handle: string): Promise<Menu[]> {
  const res = await shopifyFetch<ShopifyMenuOperation>({
    query: getMenuQuery,
    tags: [TAGS.collections],
    variables: {
      handle
    }
  });

  return (
    res.body?.data?.menu?.items.map((item: { title: string; url: string }) => ({
      title: item.title,
      path: item.url.replace(domain, '').replace('/collections', '/search').replace('/pages', '')
    })) || []
  );
}

export async function getPage(handle: string): Promise<Page> {
  const res = await shopifyFetch<ShopifyPageOperation>({
    query: getPageQuery,
    variables: { handle }
  });

  return res.body.data.pageByHandle;
}

export async function getPages(): Promise<Page[]> {
  const res = await shopifyFetch<ShopifyPagesOperation>({
    query: getPagesQuery
  });

  return removeEdgesAndNodes(res.body.data.pages);
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  const res = await shopifyFetch<ShopifyProductOperation>({
    query: getProductQuery,
    tags: [TAGS.products],
    variables: {
      handle
    }
  });

  return reshapeProduct(res.body.data.product, false);
}

export async function getProductRecommendations(productId: string): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyProductRecommendationsOperation>({
    query: getProductRecommendationsQuery,
    tags: [TAGS.products],
    variables: {
      productId
    }
  });

  return reshapeProducts(res.body.data.productRecommendations);
}

export async function getProducts({
  query,
  reverse,
  sortKey
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyProductsOperation>({
    query: getProductsQuery,
    tags: [TAGS.products],
    variables: {
      query,
      reverse,
      sortKey
    }
  });

  return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
}

export async function getCustomer({
    customerAccessToken
}: {
    customerAccessToken: string
}): Promise<Customer> {
  const res = await shopifyFetch<ShopifyGetCustomerOperation>({
    query: getCustomerQuery,
    variables: {
      customerAccessToken
    }
  })

  return reshapeCustomer(res.body.data.customer);
}

export async function createCustomer({
  email,
  password,
  firstName,
  lastName,
  phone,
  acceptsMarketing,
}: {
  email: string,
  password: string
  firstName?: string,
  lastName?: string,
  phone?: string,
  acceptsMarketing?: boolean,
}): Promise<Customer> {
  const res = await shopifyFetch<ShopifyCustomerCreateOperation>({
    query: customerCreateMutation,
    variables: {
      input: {
        email,
        password,
        firstName,
        lastName,
        phone,
        acceptsMarketing
      }
    }
  })

  return reshapeCustomer(res.body.data.customerCreate.customer)
}

export async function updateCustomer({
  email,
  password,
  firstName,
  lastName,
  phone,
  acceptsMarketing,
}: {
  email: string,
  password: string
  firstName?: string,
  lastName?: string,
  phone?: string,
  acceptsMarketing?: boolean,
}): Promise<Customer> {
  const res = await shopifyFetch<ShopifyCustomerUpdateOperation>({
    query: customerUpdateMutation,
    variables: {
      input: {
        email,
        password,
        firstName,
        lastName,
        phone,
        acceptsMarketing
      }
    }
  })

  return reshapeCustomer(res.body.data.customerCreate.customer)
}

export async function createCustomerAccessToken({
  email,
  password
}: {
  email: string,
  password: string
}): Promise<CustomerAccessToken> {
  const res = await shopifyFetch<ShopifyCustomerAccessTokenCreateOperation>({
    query: customerAccessTokenCreateMutation,
    variables: {
      input: {
        email,
        password
      }
    },
    cache: 'no-store'
  })

  return reshapeCustomerAccessToken(res.body.data.customerAccessTokenCreate.customerAccessToken)
}

export async function deleteCustomerAccessToken({
  customerAccessToken
}: {
  customerAccessToken: string
}): Promise<CustomerAccessToken> {
  const res = await shopifyFetch<ShopifyCustomerAccessTokenDeleteOperation>({
    query: customerAccessTokenDeleteMutation,
    variables: {
      customerAccessToken
    },
    cache: 'no-store'
  })

  return reshapeCustomerAccessToken(res.body.data.customerAccessTokenDelete.deletedAccessToken)
}

export async function recoverCustomer({
  email
} : {
  email: string
}) {
  const res = await shopifyFetch<ShopifyRecoverCustomerOperation>({
    query: customerRecoverMutation,
    variables: {
      email
    },
    cache: 'no-store'
  })

  return res.status === 200
}

export async function resetCustomer({
  resetURL,
  password
} : {
  resetURL: string,
  password: string
}) {
  const res = await shopifyFetch<ShopifyResetCustomerOperation>({
    query: customerResetMutation,
    variables: {
      resetURL,
      password
    },
    cache: 'no-store'
  })

  return reshapeCustomer(res.body.data.customerResetByUrl.customer)
}

export async function activateCustomer({
  activationURL,
  password
} : {
  activationURL: string,
  password: string
}) {
  const res = await shopifyFetch<ShopifyActivateCustomerOperation>({
    query: customerActivateMutation,
    variables: {
      activationURL,
      password
    },
    cache: 'no-store'
  })

  return reshapeCustomer(res.body.data.customerResetByUrl.customer)
}

export async function createCustomerAddress({
  address,
  customerAccessToken
} : {
  address: CustomerAddress,
  customerAccessToken: string
}) {
  const res = await shopifyFetch<ShopifyCreateCustomerAddressOperation>({
    query: customerAddressCreateMutation,
    variables: {
      address,
      customerAccessToken
    },
    cache: 'no-store'
  })

  return reshapeCustomerAddress(res.body.data.customerAddressCreate.customerAddress)
}

export async function deleteCustomerAddress({
  id,
  customerAccessToken
} : {
  id: string,
  customerAccessToken: string
}) {
  const res = await shopifyFetch<ShopifyDeleteCustomerAddressOperation>({
    query: customerAddressDeleteMutation,
    variables: {
      id,
      customerAccessToken
    },
    cache: 'no-store'
  })

  return res.status === 200
}

export async function updateCustomerAddress({
  address,
  customerAccessToken,
  id
} : {
  address: CustomerAddress,
  customerAccessToken: string,
  id: string
}) {
  const res = await shopifyFetch<ShopifyUpdateCustomerAddressOperation>({
    query: customerAddressUpdateMutation,
    variables: {
      address,
      customerAccessToken,
      id
    },
    cache: 'no-store'
  })

  return reshapeCustomerAddress(res.body.data.customerAddressUpdate.customerAddress)
}

export async function updateCustomerDefaultAddress({
  addressId,
  customerAccessToken,
} : {
  addressId: string,
  customerAccessToken: string,
}) {
  const res = await shopifyFetch<ShopifyUpdateDefaultCustomerAddressOperation>({
    query: customerAddressUpdateDefaultMutation,
    variables: {
      addressId,
      customerAccessToken,
    },
    cache: 'no-store'
  })

  return reshapeCustomer(res.body.data.customerDefaultAddressUpdate.customer)
}

export async function searchProducts({
  query, 
  first,
  sortKey,
  reverse } : {
    query?: string,
    first?: number,
    sortKey?: 'RELEVANCE' | 'BEST_SELLING' | 'CREATED_AT' | 'PRICE',
    reverse?: boolean
  }) {
  const res = await shopifyFetch<ShopifyProductSearchOperation>({
    query: productSearchQuery,
    variables: { 
      query: query ? query : '',
      first: first ? first : 5,
      sortKey: sortKey ? sortKey : defaultSort.sortKey,
      reverse: reverse ? reverse : defaultSort.reverse
    },
    tags: [TAGS.cart],
    cache: 'no-store'
  });
  const foundProduct = removeEdgesAndNodes(res.body.data.search)
  return reshapeProducts(foundProduct)
}

// This is called from `app/api/revalidate.ts` so providers can control revalidation logic.
export async function revalidate(req: NextRequest): Promise<NextResponse> {
  // We always need to respond with a 200 status code to Shopify,
  // otherwise it will continue to retry the request.
  const collectionWebhooks = ['collections/create', 'collections/delete', 'collections/update'];
  const productWebhooks = ['products/create', 'products/delete', 'products/update'];
  const topic = headers().get('x-shopify-topic') || 'unknown';
  const secret = req.nextUrl.searchParams.get('secret');
  const isCollectionUpdate = collectionWebhooks.includes(topic);
  const isProductUpdate = productWebhooks.includes(topic);

  if (!secret || secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
    console.error('Invalid revalidation secret.');
    return NextResponse.json({ status: 200 });
  }

  if (!isCollectionUpdate && !isProductUpdate) {
    // We don't need to revalidate anything for any other topics.
    return NextResponse.json({ status: 200 });
  }

  if (isCollectionUpdate) {
    revalidateTag(TAGS.collections);
  }

  if (isProductUpdate) {
    revalidateTag(TAGS.products);
  }

  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}
