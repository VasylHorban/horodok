import { IconAdjustments, IconBulb, IconHeartHandshake, IconHomeEco, IconThumbUp, IconUser } from '@tabler/icons-react';
import type { Metadata } from 'next';
import Features4 from '~/components/widgets/Features4';
import Hero2 from '~/components/widgets/Hero2';
import { AboutStatic, fetchCollection, GET_STATIC_ABOUT_DATA } from '~/graphql';

export const metadata: Metadata = {
  title: `About us`,
};

const icons = [IconUser, IconBulb, IconThumbUp, IconAdjustments, IconHeartHandshake, IconHomeEco];

const Page = async () => {
  let aboutData: AboutStatic | undefined;

  async function getContactUsData() {
    try {
      let res = await fetchCollection<AboutStatic>('aboutCollection', GET_STATIC_ABOUT_DATA);
      aboutData = res[0];
    } catch (error) {
      console.error('Error fetching contact us data:', error);
    }
  }

  await getContactUsData();
  return (
    <>
      <Hero2
        title={aboutData?.title}
        subtitle={aboutData?.description}
        image={{
          src: aboutData?.bannerImage?.url || '',
          alt: aboutData?.bannerImage?.title || '',
        }}
      />
      <Features4 header={{ title: aboutData?.missionTitle, subtitle: aboutData?.missionDescription }} />
      <Features4
        hasBackground
        header={{ title: aboutData?.valuesTitle, subtitle: aboutData?.description }}
        items={aboutData?.valuesItemsCollection.items.map((item, i) => ({ ...item, icon: icons[i] }))}
      />
    </>
  );
};

export default Page;
