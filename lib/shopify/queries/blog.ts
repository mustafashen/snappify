import imageFragment from "../fragments/image";

export const getBlogsQuery = /* GraphQL */ `
  query getBlogs($first: Int!) {
    blogs(first: $first) {
      edges {
        node {
          id
          handle
          title
        }
      }
    }
  }
`;

export const getArticlesQuery = /* GraphQL */ `
  query getArticles($id: ID, $first: Int!) {
    blog(id: $id) {
      id
      handle
      title
      seo {
        title
        description
      }
      articles(first: $first) {
        edges {
          node {
            id
            handle
            title
            image {
              ...image
            }
          }
        }
      }
    }
  }
  ${imageFragment}
`;

export const getArticleQuery = /* GraphQL */ `
  query getArticle($id: ID!) {
    article(id: $id) {
      id
      tags
      seo {
        title
        description
      }
      handle
      title
      contentHtml
      author {
        name
      }
      publishedAt
      image {
        ...image
      }
    }
  }
  ${imageFragment}
`;
