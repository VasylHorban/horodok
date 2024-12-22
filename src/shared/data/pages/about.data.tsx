import {
  ContactProps,
  FAQsProps,
  FeaturesProps,
  HeroProps,
  StatsProps,
  StepsProps,
  TeamProps,
  TestimonialsProps,
} from '~/shared/types';
import hero2Img from '~/assets/images/hero2.png';
import {
  IconAdjustments,
  IconAward,
  IconBook,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBulb,
  IconCirclesRelation,
  IconClock,
  IconFlame,
  IconHeartHandshake,
  IconHomeEco,
  IconMail,
  IconMapPin,
  IconNumber1,
  IconNumber2,
  IconNumber3,
  IconNumber4,
  IconNumber5,
  IconPalette,
  IconPhoneCall,
  IconPuzzle2,
  IconScale,
  IconThumbUp,
  IconUser,
} from '@tabler/icons-react';

// Hero2 data on About page *******************
export const hero2About: HeroProps = {
  title: 'Народна Думка: Голос української громади',
  subtitle:
    'Народна Думка — це незалежне медіа, що висвітлює найактуальніші події з усієї України. Ми прагнемо бути платформою для висловлення думок і позицій кожного українця, сприяючи відкритому діалогу та громадянській активності.',
  image: {
    src: hero2Img,
    alt: 'Народна Думка',
  },
};

// FeaturesFour data on About page *******************
export const featuresFourAbout: FeaturesProps = {
  id: 'features-four-on-about',
  hasBackground: false,
  header: {
    title: 'Наша місія',
    subtitle:
      'Народна Думка — це платформа, що об’єднує українців заради спільної мети: розвитку суспільства через чесну та об’єктивну інформацію. Ми прагнемо донести голос громади та сприяти змінам на краще.',
  },
};

const icons = [IconUser, IconBulb, IconThumbUp, IconAdjustments, IconHeartHandshake, IconHomeEco];

// FeaturesFour data on About page (Two) *******************
export const featuresFourAboutTwo: FeaturesProps = {
  id: 'features-four-on-about-two',
  hasBackground: false,
  header: {
    title: 'Наші цінності',
    subtitle: 'Наші цінності відображають основні принципи, які ми сповідуємо у нашій роботі та взаємодії з громадою.',
  },
  isAfterContent: true,
  columns: 2,
  items: [
    {
      title: 'Прозорість і чесність',
      description: 'Ми завжди дотримуємося етичних стандартів, забезпечуючи точність і правдивість інформації.',
      icon: IconUser,
    },
    {
      title: 'Інновації та адаптивність',
      description:
        'Ми постійно впроваджуємо нові підходи та технології, щоб покращити роботу і бути ближчими до нашої аудиторії.',
      icon: IconBulb,
    },
    {
      title: 'Якість та надійність',
      description:
        'Наша робота базується на високих стандартах якості, ми гарантуємо достовірність і надійність наших матеріалів.',
      icon: IconThumbUp,
    },
    {
      title: 'Доступність і індивідуалізація',
      description: 'Ми прагнемо зробити інформацію доступною для всіх та враховуємо потреби кожного користувача.',
      icon: IconAdjustments,
    },
    {
      title: 'Співпраця та партнерство',
      description:
        'Ми будуємо міцні стосунки з нашими партнерами та аудиторією, ґрунтуючись на довірі та спільних цінностях.',
      icon: IconHeartHandshake,
    },
    {
      title: 'Етичність та відповідальність',
      description: 'Ми відповідально ставимося до впливу нашої діяльності на суспільство та довкілля.',
      icon: IconHomeEco,
    },
  ],
};
