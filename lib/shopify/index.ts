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
  Article,
  Blog,
  Cart,
  Collection,
  Connection,
  CoverImage,
  Customer,
  CustomerAccessToken,
  CustomerAddress,
  CustomerOrder,
  Image,
  Logo,
  Menu,
  Page,
  Product,
  ShopPolicy,
  ShopifyActivateCustomerOperation,
  ShopifyAddToCartOperation,
  ShopifyArticleOperation,
  ShopifyBlogOperation,
  ShopifyBlogsOperation,
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
  ShopifyGetCoverOperation,
  ShopifyGetCustomerAddressOperation,
  ShopifyGetCustomerOperation,
  ShopifyGetCustomerOrdersOperation,
  ShopifyGetLogoOperation,
  ShopifyGetSquareLogoOperation,
  ShopifyGetStoreDescriptionOperation,
  ShopifyGetStorePolicyOperation,
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
  ShopifyUpdateDefaultCustomerAddressOperation,
  SquareLogo,
  StoreDescription,
  StorePolicy
} from './types';
import { customerAccessTokenCreateMutation, customerAccessTokenDeleteMutation, customerActivateMutation, customerAddressCreateMutation, customerAddressDeleteMutation, customerAddressUpdateDefaultMutation, customerAddressUpdateMutation, customerCreateMutation, customerRecoverMutation, customerResetMutation, customerUpdateMutation } from './mutations/customer';
import { productSearchQuery } from './queries/search';
import { getCustomerAddressQuery, getCustomerOrdersQuery, getCustomerQuery } from './queries/customer';
import { getCoverQuery, getLogoQuery, getShopDescriptionQuery, getShopPolicyQuery, getSquareLogoQuery } from './queries/shop';
import { getArticleQuery, getArticlesQuery, getBlogsQuery } from './queries/blog';

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
  return array.edges.map((edge) => {
    if (edge.cursor) {
      edge.node.cursor = edge.cursor;
    }
    return edge?.node
  });
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

function reshapeCustomer(customer: Customer) {
  return {...customer}
}

function reshapeCustomerAddress(customerAddress: CustomerAddress) {
  return {...customerAddress}
}

function reshapeCustomerAddresses(customerAddresses: CustomerAddress[]) {
    const reshapedAddresses = [];

    for (const address of customerAddresses) {
      if (address) {
        const reshapedProduct = reshapeCustomerAddress(address);
  
        if (reshapedProduct) {
            reshapedAddresses.push(reshapedProduct);
        }
      }
    }
  
    return reshapedAddresses;
}

function reshapeCustomerOrder(customerOrder: CustomerOrder) {
    return {...customerOrder}
}

function reshapeStoreLogo(logo: Logo) {
  return {...logo}
}

function reshapeStoreSquareLogo(squareLogo: SquareLogo) {
  return {...squareLogo}
}

function reshapeStoreCoverImage(coverImage: CoverImage) {
  return {...coverImage}
}

function reshapeStoreDescription(storeDescription: StoreDescription) {
  return {...storeDescription.brand, id: storeDescription.id, name: storeDescription.name}
}

function reshapeStorePolicy(storePolicy: StorePolicy) {
  const policies: ShopPolicy[] = []

  Object.keys(storePolicy).forEach((policy) => {
    policies.push({
      //@ts-ignore
      ...storePolicy[policy]
    })
  })

  return policies
}

function reshapeCustomerOrders(customerOrders: CustomerOrder[]) {
      const reshapedOrders = [];
  
      for (const order of customerOrders) {
        if (order) {
          const reshapedProduct = reshapeCustomerOrder(order);
    
          if (reshapedProduct) {
              reshapedOrders.push(reshapedProduct);
          }
        }
      }
    
      return reshapedOrders;
}

function reshapeCustomerAccessToken(customerAccessToken: CustomerAccessToken) {
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

export async function getLogo() {
  const res = await shopifyFetch<ShopifyGetLogoOperation>({
    query: getLogoQuery,
  });


  return reshapeStoreLogo(res.body?.data?.shop.brand.logo);
}

export async function getSquareLogo() {
  const res = await shopifyFetch<ShopifyGetSquareLogoOperation>({
    query: getSquareLogoQuery,
  });


  return reshapeStoreSquareLogo(res.body?.data?.shop.brand.squareLogo);
}

export async function getCoverImage() {
  const res = await shopifyFetch<ShopifyGetCoverOperation>({
    query: getCoverQuery,
  });
  
  return reshapeStoreCoverImage(res.body?.data?.shop.brand.coverImage);
}

export async function getDescription() {
  const res = await shopifyFetch<ShopifyGetStoreDescriptionOperation>({
    query: getShopDescriptionQuery,
  });


  return reshapeStoreDescription(res.body?.data?.shop);
}

export async function getPolicies() {
  const res = await shopifyFetch<ShopifyGetStorePolicyOperation>({
    query: getShopPolicyQuery,
  });


  return reshapeStorePolicy(res.body?.data?.shop);
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
    },
    cache: 'no-store'
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
  sortKey,
  first
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
  first?: number
}): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyProductsOperation>({
    query: getProductsQuery,
    tags: [TAGS.products],
    variables: {
      query,
      reverse,
      sortKey,
      first: first ? first : 250,
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
    },
    cache: 'no-store'
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
    },
    cache: 'no-store'
  })

  return reshapeCustomer(res.body.data.customerCreate.customer)
}

export async function updateCustomer({
  updates,
  customerAccessToken,
}: {
  updates: Customer,
  customerAccessToken: string
}): Promise<Customer> {
  const res = await shopifyFetch<ShopifyCustomerUpdateOperation>({
    query: customerUpdateMutation,
    variables: {
      customer: updates,
      customerAccessToken
    },
    cache: 'no-store'
  })

  console.log(res.body.data)
  return reshapeCustomer(res.body.data.customerUpdate.customer)
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
}): Promise<string> {
  const res = await shopifyFetch<ShopifyCustomerAccessTokenDeleteOperation>({
    query: customerAccessTokenDeleteMutation,
    variables: {
      customerAccessToken
    },
    cache: 'no-store'
  })

  return res.body.data.customerAccessTokenDelete.deletedAccessToken
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
  resetUrl,
  password
} : {
  resetUrl: string,
  password: string
}) {
  const res = await shopifyFetch<ShopifyResetCustomerOperation>({
    query: customerResetMutation,
    variables: {
      resetUrl,
      password
    },
    cache: 'no-store'
  })

  return reshapeCustomer(res.body.data.customerResetByUrl.customer)
}

export async function activateCustomer({
  activationUrl,
  password
} : {
  activationUrl: string,
  password: string
}) {
  const res = await shopifyFetch<ShopifyActivateCustomerOperation>({
    query: customerActivateMutation,
    variables: {
      activationUrl,
      password
    },
    cache: 'no-store'
  })

  return reshapeCustomer(res.body.data.customerResetByUrl.customer)
}

export async function getCustomerAddress({
    customerAccessToken,
    first
}: {
    customerAccessToken: string,
    first: number
}): Promise<CustomerAddress[]> {
  const res = await shopifyFetch<ShopifyGetCustomerAddressOperation>({
    query: getCustomerAddressQuery,
    variables: {
      customerAccessToken,
      first
    },
    cache: 'no-store'
  })
  
  return reshapeCustomerAddresses(removeEdgesAndNodes(res.body.data.customer.addresses))
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

export async function getCustomerOrders({
    first,
    customerAccessToken,
  } : {
    first: number,
    customerAccessToken: string,
  }) {
    const res = await shopifyFetch<ShopifyGetCustomerOrdersOperation>({
      query: getCustomerOrdersQuery,
      variables: {
        first,
        customerAccessToken,
      },
      cache: 'no-store'
    })
  
    return reshapeCustomerOrders(removeEdgesAndNodes(res.body.data.customer.orders))
  }

export async function searchProducts({
  query, 
  first,
  sortKey,
  reverse,
  after } : {
    query?: string,
    first?: number,
    sortKey?: 'RELEVANCE' | 'PRICE',
    reverse?: boolean,
    after?: string
  }) {

  const res = await shopifyFetch<ShopifyProductSearchOperation>({
    query: productSearchQuery,
    variables: { 
      query: query ? query : '',
      first: first ? first : 5,
      sortKey: sortKey ? sortKey : defaultSort.sortKey,
      reverse: reverse ? reverse : defaultSort.reverse,
      after: after ? after : null
    },
    tags: [TAGS.cart]
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

export async function getBlogs({first}: {first: number}): Promise<Blog[]> {
  const res = await shopifyFetch<ShopifyBlogsOperation>({
    query: getBlogsQuery,
    variables: { first }
  });

  const blogs = removeEdgesAndNodes(res.body.data.blogs)
  return blogs
}

export async function getArticles({first, id}: {first: number, id: string}): Promise<Blog> {
  const res = await shopifyFetch<ShopifyBlogOperation>({
    query: getArticlesQuery,
    variables: { 
      first,
      id
    }
  });

  const articles = removeEdgesAndNodes(res.body.data.blog.articles)
  const blog = {...res.body.data.blog, articles}
  return blog;
}

export async function getArticle({id}: {id: string}): Promise<Article> {
  const res = await shopifyFetch<ShopifyArticleOperation>({
    query: getArticleQuery,
    variables: { id }
  });

  return res.body.data.article;
}