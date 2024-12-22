import type { Metadata } from 'next';

import { SITE } from '~/config.js';

import Hero from '~/components/widgets/Hero';

import Content from '~/components/widgets/Content';
import Contact from '~/components/widgets/Contact';
import { contentHomeOne, contentHomeTwo } from '~/shared/data/pages/home.data';
import {
  Article,
  ContactUsStatic,
  fetchCollection,
  GET_ARTICLE_BY_ID,
  GET_ARTICLES_IDS,
  GET_STATIC_BANNER_DATA,
  GET_STATIC_CONTACT_DATA,
  MainBannerStatic,
  fetchEntityById,
} from '~/graphql';
import { IconClock, IconMapPin, IconPhoneCall } from '@tabler/icons-react';

export const metadata: Metadata = {
  title: SITE.title,
};

const form = {
  title: 'Заповніть форму для запитання',
  inputs: [
    {
      type: 'text',
      name: 'name',
      autocomplete: 'off',
      placeholder: 'Ваше імя',
    },
    {
      type: 'email',
      name: 'email',
      autocomplete: 'on',
      placeholder: 'Електронна пошта',
    },
  ],
  textarea: {
    cols: 30,
    rows: 5,
    name: 'textarea',
    placeholder: 'Опишіть ваше запитання',
  },
  btn: {
    title: 'Надіслати',
    type: 'submit',
  },
};

export default async function Page() {
  let contactData: ContactUsStatic | undefined;
  let bannerData: MainBannerStatic | undefined;

  let articles: Article[] = [];

  async function getContactUsData() {
    try {
      // let ids = [];
      let bannerRes = await fetchCollection<MainBannerStatic>(
        'mainStaticCollection',
        GET_STATIC_BANNER_DATA, // Replace with your actual query
      );
      let res = await fetchCollection<ContactUsStatic>(
        'contactUsStaticCollection',
        GET_STATIC_CONTACT_DATA, // Replace with your actual query
      );
      let idsRes = await fetchCollection<Article>(
        'articleCollection',
        GET_ARTICLES_IDS, // Replace with your actual query
      );
      const dataArts = Promise.all(
        idsRes.map(async (elem) => {
          return await fetchEntityById<Article>(
            'article',
            GET_ARTICLE_BY_ID, // Replace with your actual query
            { id: elem.sys.id },
          );
        }),
      );
      articles = await dataArts;
      bannerData = bannerRes[0];
      contactData = res[0];
    } catch (error) {
      console.error('Error fetching contact us data:', error);
    }
  }

  await getContactUsData();

  return (
    <>
      <Hero
        title={bannerData?.title}
        image={{ src: bannerData?.image.url || '', alt: bannerData?.image.title || '' }}
      />
      <Content
        content={articles[0].description.json}
        header={{ title: bannerData?.sectionName, subtitle: bannerData?.description }}
        image={{ alt: articles[0].previewImg?.description || '', src: articles[0].previewImg?.url || '' }}
      />
      <Content
        content={articles[1].description.json}
        image={{ alt: articles[1].previewImg?.description || '', src: articles[1].previewImg?.url || '' }}
      />
      <Contact
        hasBackground={true}
        content={contactData?.contacDataDescription}
        header={{
          title: contactData?.title,
          subtitle: contactData?.shortDescrption,
        }}
        items={[
          {
            icon: IconMapPin,
            title: contactData?.addressTitle,
            description: contactData?.adderssDescription,
          },
          {
            icon: IconPhoneCall,
            title: contactData?.contactDetailsTitle,
            description: contactData?.contacDetailsDescription,
          },
          {
            icon: IconClock,
            title: contactData?.workingHoursTitle,
            description: contactData?.workingHoursDescription,
          },
        ]}
        form={{
          inputs: [
            {
              type: 'text',
              name: 'name',
              autocomplete: 'off',
              placeholder: 'Ваше імя',
            },
            {
              type: 'email',
              name: 'email',
              autocomplete: 'on',
              placeholder: 'Електронна пошта',
            },
          ],
          title: contactData?.formTitle,
          btn: {
            title: 'Надіслати',
            type: 'submit',
          },
          textarea: {
            cols: 30,
            rows: 5,
            name: 'textarea',
            placeholder: 'Опишіть ваше запитання',
          },
        }}
      />
    </>
  );
}
