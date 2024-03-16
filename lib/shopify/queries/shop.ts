import imageFragment from "../fragments/image";
import { ShopPolicyFragment, ShopPolicyWithDefaultFragment } from "../fragments/shop";

export const getLogoQuery = /* GraphQL*/ `
  query getLogo {
    shop {
      brand {
        logo {
          id
          image {
            ...image
          }
        }
      }
    }
  }
  ${imageFragment}
`;

export const getSquareLogoQuery = /* GraphQL*/ `
  query getLogo {
    shop {
      brand {
        squareLogo {
          id
          image {
            ...image
          }
        }
      }
    }
  }
  ${imageFragment}
`;

export const getCoverQuery = /* GraphQL*/ `
  query getCover {
    shop {
      brand {
        coverImage {
          id
          image {
            ...image
          }
        }
      }
    }
  }
  ${imageFragment}
`;

export const getShopDescriptionQuery = /* GraphQL*/ `
  query getDescription {
    shop {
      id
      name
      brand {
        shortDescription
        slogan
      }
    }
  }
`;

export const getShopPolicyQuery = /* GraphQL*/ `
  query getDescription {
    shop {
      privacyPolicy {
        ...shopPolicy
      }
      refundPolicy {
        ...shopPolicy
      }
      shippingPolicy {
        ...shopPolicy
      }
      subscriptionPolicy {
        ...shopPolicyWithDefault
      }
      termsOfService {
        ...shopPolicy
      }
    }
  }
  ${ShopPolicyFragment}
  ${ShopPolicyWithDefaultFragment}
`;
