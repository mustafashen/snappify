export type Maybe<T> = T | null;

export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type Edge<T> = {
  node: T;
};

export type Cart = Omit<ShopifyCart, 'lines'> & {
  lines: CartItem[];
};

export type CartItem = {
  id: string;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: Product;
  };
};

export type Collection = ShopifyCollection & {
  path: string;
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type Menu = {
  title: string;
  path: string;
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export type Page = {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
};

export type Product = Omit<ShopifyProduct, 'variants' | 'images'> & {
  variants: ProductVariant[];
  images: Image[];
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
};

export type SEO = {
  title: string;
  description: string;
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  lines: Connection<CartItem>;
  totalQuantity: number;
};

export type ShopifyCollection = {
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  updatedAt: string;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  variants: Connection<ProductVariant>;
  featuredImage: Image;
  images: Connection<Image>;
  seo: SEO;
  tags: string[];
  updatedAt: string;
};

export type ShopifyCartOperation = {
  data: {
    cart: ShopifyCart;
  };
  variables: {
    cartId: string;
  };
};

export type ShopifyProductSearchOperation = {
  data: {
    search: {
      edges: { 
        node: ShopifyProduct
      }[]
    };
  };
  variables: {
    query: string;
    first?: number;
    sortKey?: 'RELEVANCE' | 'BEST_SELLING' | 'CREATED_AT' | 'PRICE';
    reverse?: boolean;
  };
}

export type ShopifyCreateCartOperation = {
  data: { cartCreate: { cart: ShopifyCart } };
};

export type ShopifyAddToCartOperation = {
  data: {
    cartLinesAdd: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type ShopifyRemoveFromCartOperation = {
  data: {
    cartLinesRemove: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lineIds: string[];
  };
};

export type ShopifyUpdateCartOperation = {
  data: {
    cartLinesUpdate: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      id: string;
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type ShopifyCollectionOperation = {
  data: {
    collection: ShopifyCollection;
  };
  variables: {
    handle: string;
  };
};

export type ShopifyCollectionProductsOperation = {
  data: {
    collection: {
      products: Connection<ShopifyProduct>;
    };
  };
  variables: {
    handle: string;
    reverse?: boolean;
    sortKey?: string;
  };
};

export type ShopifyCollectionsOperation = {
  data: {
    collections: Connection<ShopifyCollection>;
  };
};

export type ShopifyMenuOperation = {
  data: {
    menu?: {
      items: {
        title: string;
        url: string;
      }[];
    };
  };
  variables: {
    handle: string;
  };
};

export type ShopifyPageOperation = {
  data: { pageByHandle: Page };
  variables: { handle: string };
};

export type ShopifyPagesOperation = {
  data: {
    pages: Connection<Page>;
  };
};

export type ShopifyProductOperation = {
  data: { product: ShopifyProduct };
  variables: {
    handle: string;
  };
};

export type ShopifyProductRecommendationsOperation = {
  data: {
    productRecommendations: ShopifyProduct[];
  };
  variables: {
    productId: string;
  };
};

export type ShopifyProductsOperation = {
  data: {
    products: Connection<ShopifyProduct>;
  };
  variables: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
    first?: number
  };
};

export type Customer = {
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  acceptsMarketing: boolean,
  password?: string
}


export type CustomerAccessToken = {
    accessToken: string;
}

export type DeletedAccessToken = string;

export type ShopifyGetCustomerOperation = {
    data: {
        customer: Customer;
    },
    variables: {
        customerAccessToken: string;
    }
}

export type ShopifyCustomerCreateOperation = {
  data: {
    customerCreate: {
      customer: Customer;
    }
  },
  variables: {
    input: {
      firstName?: string,
      lastName?: string,
      email: string,
      password: string,
      phone?: string,
      acceptsMarketing?: boolean
    }
  }
}

export type ShopifyCustomerUpdateOperation = {
    data: {
      customerUpdate: {
        customer: Customer;
      }
    },
    variables: {
      customer: Customer,
      customerAccessToken: string
    }
  }

  
export type ShopifyCustomerAccessTokenCreateOperation = {
  data: {
    customerAccessTokenCreate: {
      customerAccessToken: CustomerAccessToken;
    }
  },
  variables: {
    input: {
      email: string,
      password: string
    }
  }
}

export type ShopifyCustomerAccessTokenDeleteOperation = {
  data: {
    customerAccessTokenDelete: {
      deletedAccessToken: string;
    }
  },
  variables: {
    customerAccessToken: string;
  }
}

export type ShopifyRecoverCustomerOperation = {
  data: {
  },
  variables: {
    email: string;
  }
}

export type ShopifyResetCustomerOperation = {
  data: {
    customerResetByUrl: {
      customer: Customer;
    }
  },
  variables: {
    resetUrl: string,
    password: string
  }
}

export type ShopifyActivateCustomerOperation = {
  data: {
    customerResetByUrl: {
      customer: Customer;
    }
  },
  variables: {
    activationUrl: string,
    password: string
  }
}

export type CustomerAddress = {
  address1: string,
  address2: string,
  city: string,
  company: string,
  country: string,
  firstName: string,
  lastName: string,
  phone: string,
  province: string,
  zip: string,
  id?: string
}

export type ShopifyGetCustomerAddressOperation = {
  data: {
    customer: {
      addresses: {
        edges: {
          node: CustomerAddress
        }[]
      }
    }
  },
  variables: {
    customerAccessToken: string,
    first: number
  }
}

export type ShopifyCreateCustomerAddressOperation = {
  data: {
    customerAddressCreate: {
      customerAddress: CustomerAddress;
    }
  },
  variables: {
    address: CustomerAddress,
    customerAccessToken: string
  }
}

export type ShopifyUpdateCustomerAddressOperation = {
  data: {
    customerAddressUpdate: {
      customerAddress: CustomerAddress;
    }
  },
  variables: {
    address: CustomerAddress,
    customerAccessToken: string,
    id: string
  }
}

export type ShopifyUpdateDefaultCustomerAddressOperation = {
  data: {
    customerDefaultAddressUpdate: {
      customer: Customer;
    }
  },
  variables: {
    addressId: string,
    customerAccessToken: string,
  }
}

export type ShopifyDeleteCustomerAddressOperation = {
  data: {
  },
  variables: {
    id: string,
    customerAccessToken: string
  }
}

type OrderCancelReason =
  | 'CUSTOMER'
  | 'DECLINED'
  | 'FRAUD'
  | 'INVENTORY'
  | 'OTHER'
  | 'STAFF';

type CurrencyCode = |"AED"|"AFN"|"ALL"|"AMD"|"ANG"|"AOA"|"ARS"|"AUD"|"AWG"|"AZN"|"BAM"|"BBD"|"BDT"|"BGN"|"BHD"|"BIF"|"BMD"|"BND"|"BOB"|"BRL"|"BSD"|"BTN"|"BWP"|"BYN"|"BZD"|"CAD"|"CDF"|"CHF"|"CLP"|"CNY"|"COP"|"CRC"|"CVE"|"CZK"|"DJF"|"DKK"|"DOP"|"DZD"|"EGP"|"ERN"|"ETB"|"EUR"|"FJD"|"FKP"|"GBP"|"GEL"|"GHS"|"GIP"|"GMD"|"GNF"|"GTQ"|"GYD"|"HKD"|"HNL"|"HRK"|"HTG"|"HUF"|"IDR"|"ILS"|"INR"|"IQD"|"IRR"|"ISK"|"JEP"|"JMD"|"JOD"|"JPY"|"KES"|"KGS"|"KHR"|"KID"|"KMF"|"KRW"|"KWD"|"KYD"|"KZT"|"LAK"|"LBP"|"LKR"|"LRD"|"LSL"|"LTL"|"LVL"|"LYD"|"MAD"|"MDL"|"MGA"|"MKD"|"MMK"|"MNT"|"MOP"|"MRU"|"MUR"|"MVR"|"MWK"|"MXN"|"MYR"|"MZN"|"NAD"|"NGN"|"NIO"|"NOK"|"NPR"|"NZD"|"OMR"|"PAB"|"PEN"|"PGK"|"PHP"|"PKR"|"PLN"|"PYG"|"QAR"|"RON"|"RSD"|"RUB"|"RWF"|"SAR"|"SBD"|"SCR"|"SDG"|"SEK"|"SGD"|"SHP"|"SLL"|"SOS"|"SRD"|"SSP"|"STN"|"SYP"|"SZL"|"THB"|"TJS"|"TMT"|"TND"|"TOP"|"TRY"|"TTD"|"TWD"|"TZS"|"UAH"|"UGX"|"USD"|"UYU"|"UZS"|"VED"|"VES"|"VND"|"VUV"|"WST"|"XAF"|"XCD"|"XOF"|"XPF"|"XXX"|"YER"|"ZAR"|"ZMW";

type MoneyV2 = {
  amount: number,
  currencyCode: CurrencyCode
}

type OrderFinancialStatus =
  | "Authorized"
  | "Paid"
  | "Partially paid"
  | "Partially refunded"
  | "Pending"
  | "Refunded"
  | "Voided";

type OrderFulfillmentStatus =
  | "Fulfilled"
  | "In progress"
  | "On hold"
  | "Open"
  | "Partially fulfilled"
  | "Pending fulfillment"
  | "Restocked"
  | "Scheduled"
  | "Unfulfilled";

type DiscountApplicationAllocationMethod =
  | 'ACROSS'
  | 'EACH'
  | 'ONE';

type DiscountApplicationTargetSelection =
  | 'ALL'
  | 'ENTITLED'
  | 'EXPLICIT';

type DiscountApplicationTargetType =
  | 'LINE_ITEM'
  | 'SHIPPING_LINE';

type PricingPercentageValue = {
  percentage: number;
}

type PricingValue = MoneyV2 | PricingPercentageValue;

type DiscountApplication = {
  allocationMethod: DiscountApplicationAllocationMethod;
  targetSelection: DiscountApplicationTargetSelection;
  targetType: DiscountApplicationTargetType;
  value: PricingValue;
}

type DiscountAllocation = {
  allocatedAmount: MoneyV2;
  discountApplication: DiscountApplication;
};

type FulfillmentTrackingInfo = {
  number: string;
  url: URL;
};

type Fulfillment = {
  trackingCompany: string;
  trackingInfo: FulfillmentTrackingInfo[];
};

export type CustomerOrder = {
  billingAddress: CustomerAddress;
  cancelReason: OrderCancelReason | null;
  canceledAt: string | null;
  currencyCode: CurrencyCode;
  currentSubtotalPrice: MoneyV2;
  currentTotalDuties: MoneyV2 | null;
  currentTotalPrice: MoneyV2;
  currentTotalTax: MoneyV2;
  customerLocale: string;
  customerUrl: URL;
  edited: boolean;
  email: string;
  financialStatus: OrderFinancialStatus;
  fulfillmentStatus: OrderFulfillmentStatus;
  id: string;
  name: string;
  orderNumber: number;
  originalTotalDuties: MoneyV2 | null;
  originalTotalPrice: MoneyV2;
  phone: string | null;
  processedAt: string;
  shippingAddress: CustomerAddress;
  shippingDiscountAllocations: Array<DiscountAllocation>;
  statusUrl: URL;
  subtotalPrice: MoneyV2;
  successfulFulfillments: Array<Fulfillment>;
  totalPrice: MoneyV2;
  totalRefunded: MoneyV2;
  totalShippingPrice: MoneyV2;
  totalTax: MoneyV2 | null;
};

export type ShopifyGetCustomerOrdersOperation = {
    data: {
      customer: {
        orders: {
          edges: {
            node: CustomerOrder
          }[]
        }
      }
    },
    variables: {
      customerAccessToken: string,
      first: number
    }
}

export type Logo = {
  id: string,
  image: Image
}

export type ShopifyGetLogoOperation = {
  data: {
    shop: {
      brand: {
        logo: {
          id: string,
          image: Image
        },
        squareLogo: {
          id: string,
          image: Image
        }
      }
    }
  }
}

export type SquareLogo = {
  id: string,
  image: Image
}

export type ShopifyGetSquareLogoOperation = {
  data: {
    shop: {
      brand: {
        squareLogo: {
          id: string,
          image: Image
        }
      }
    }
  }
}


export type CoverImage = {
  id: string,
  image: Image
}

export type ShopifyGetCoverOperation = {
  data: {
    shop: {
      brand: {
        coverImage: {
          id: string,
          image: Image
        }
      }
    }
  }
}

export type StoreDescription = {
  id: string,
  name: string,
  brand: {
    shortDescription: string
    slogan: string
  }
}

export type ShopifyGetStoreDescriptionOperation = {
  data: {
    shop: {
      id: string,
      name: string
      brand: {
        shortDescription: string
        slogan: string
      }
    }
  }
}

export type ShopPolicy = {
  body: string,
  handle: string,
  id: string,
  title: string,
  url: string
}

export type Policy = 'privacyPolicy' | 'refundPolicy' | 'shippingPolicy' | 'subscriptionPolicy' | 'termsOfService'

export type StorePolicy = {
  privacyPolicy: ShopPolicy,
  refundPolicy: ShopPolicy,
  shippingPolicy: ShopPolicy,
  subscriptionPolicy: ShopPolicy,
  termsOfService: ShopPolicy
}

export type ShopifyGetStorePolicyOperation = {
  data: {
    shop: {
      privacyPolicy: ShopPolicy,
      refundPolicy: ShopPolicy,
      shippingPolicy: ShopPolicy,
      subscriptionPolicy: ShopPolicy,
      termsOfService: ShopPolicy
    }
  }
}