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
   `
}

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
   `
}

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
`

export const GET_RUBRICS_QUERY = /* GraphQL */ `
   query rubricCollectionQuery {
      rubricCollection {
         items {
            rubricPath
            name
         }
      }
   }
`
