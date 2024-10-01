import { Document } from '@contentful/rich-text-types'

export interface Article {
   title: string
   date: string
   bannerImage: string
   authore: string
   sys: {
      id: string
   }
   categoryRef: {
      sys: {
         id: string
      }
   }
   content?: {
      json: Document
   }
}
