import imageFragment from "../fragments/image";

export const getLogoQuery = /* GraphQL*/ `
  query getLogo {
    shop {
      brand {
        logo {
          id
          ...image
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
          ...image
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