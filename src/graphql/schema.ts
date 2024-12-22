import { Document } from '@contentful/rich-text-types';
import { ContentfulImage } from './types';

export interface Article {
  sys: { id: string };
  title: string;
  previewImg?: { url: string; description: string };
  description: {
    json: any;
    links: {
      assets: {
        block: {
          sys: { id: string };
          url: string;
          description?: string;
        }[];
      };
    };
  };
  authorCollection?: { items: { fullName: string }[] };
  publishDate: string;
}

export interface ContactUsStatic {
  name: string;
  shortDescrption: string;
  title: string;
  contacDataDescription: string;
  addressTitle: string;
  adderssDescription: string[];
  contactDetailsTitle: string;
  contacDetailsDescription: string[];
  workingHoursTitle: string;
  workingHoursDescription: string[];
  formTitle: string;
}

export interface ValuesItemStatic {
  title: string;
  description: string;
}

export interface AboutStatic {
  title: string;
  missionDescription: string;
  valuesTitle: string;
  valuesDescription: string;
  missionTitle: string;
  description: string;
  bannerImage: ContentfulImage;
  valuesItemsCollection: {
    items: ValuesItemStatic[];
  };
}

export interface MainBannerStatic {
  title: string;
  description: string;
  sectionName: string;
  image: ContentfulImage;
}
