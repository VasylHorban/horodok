export const getArticleCollectionQuery = (limit: number) => {
  return /* GraphQL */ `
       query articleCollectionQuery {
           articleCollection(limit: ${limit}) {
               total
               items {
                   content {
                       json
                   }
                   authore
                   categoryRef {
                       sys {
                           id
                       }
                   }
                   sys {
                       id
                   }
                   bannerImage
                   date
                   title
               }
           }
       }
   `;
};

export const getArticleByIdQuery = (id: string) => {
  return /* GraphQL */ `
       query articleEntryQuery {
           article(id: "${id}") {
               sys {
                   id
               }
               # add the fields you want to query
               content {
                   json
               }
               authore
               categoryRef {
                   sys {
                       id
                   }
               }
               bannerImage
               date
               title
           }
       }
   `;
};

export const GET_MAIN_ARTICLE_QUERY = /* GraphQL */ `
  query articleCollectionQuery {
    articleCollection(limit: 1) {
      items {
        authore
        categoryRef {
          sys {
            id
          }
        }
        sys {
          id
        }
        bannerImage
        date
        title
      }
    }
  }
`;

export const GET_RUBRICS_QUERY = /* GraphQL */ `
  query rubricCollectionQuery {
    rubricCollection {
      items {
        rubricPath
        name
      }
    }
  }
`;

/* NEW */

export const GET_STATIC_CONTACT_DATA = /* GraphQL */ `
  query contactUsStaticCollectionQuery {
    contactUsStaticCollection {
      items {
        workingHoursDescription
        workingHoursTitle
        contacDetailsDescription
        contactDetailsTitle
        formTitle
        sys {
          id
        }
        addressTitle
        adderssDescription
        addressTitle
        contacDataDescription
        shortDescrption
        title
      }
    }
  }
`;

export const GET_STATIC_ABOUT_DATA = /*GraphQL*/ `
  query aboutCollectionQuery {
  aboutCollection {
    items {
      title
      missionDescription
      valuesTitle
      valuesDescription
      valuesItemsCollection {
        items {
          title
          description
        }
      }
      missionTitle
      description
      bannerImage {
        title
        url
      }
    }
  }
}
`;

export const GET_ARTICLE_LIST = /* GraphQL */ `
  query articleCollectionQuery($skip: Int, $limit: Int) {
    articleCollection(skip: $skip, limit: $limit) {
      total
      items {
        sys {
          id
        }
        publishDate
        description {
          json
        }
        title
        previewImg {
          url
          title
        }
        authorCollection {
          items {
            fullName
            description
          }
        }
      }
    }
  }
`;

// queries/articleByIdQuery.ts
export const GET_ARTICLE_BY_ID = /* GraphQL */ `
  query GetArticleById($id: String!) {
    article(id: $id) {
      sys {
        id
      }
      title
      previewImg {
        url
        description
      }
      description {
        json
        links {
          assets {
            block {
              sys {
                id
              }
              url
              description
            }
          }
        }
      }
      authorCollection {
        items {
          fullName
        }
      }
      publishDate
    }
  }
`;

export const GET_STATIC_BANNER_DATA = /*GraphQL*/ `
  query mainStaticCollectionQuery {
  mainStaticCollection {
    items {
      title
      sectionName
      description
      image {
        url
        title
      }
    }
  }
}
`;

export const GET_ARTICLES_IDS = /*GraphQL*/ `
  query GetArticlesInMainPage {
    articleCollection(where: { inMainPage: true }) {
      items {
        sys {
          id
        }
      }
    }
  }
`;
