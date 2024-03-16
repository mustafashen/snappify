import imageFragment from "../fragments/image";

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
      brand {
        shortDescription
        slogan
      }
    }
  }
`;