import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

interface HomePageProps {
  data: string;
}

const IndexPage: NextPage = ({ data }: HomePageProps) => {
  const { t } = useTranslation();
  return (
    <main>
      <h1>{data}</h1>
      {t('test')}
      {t('missing')}
    </main>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = 
  async ({ locale, defaultLocale }) => {
    const response = await fetch(process.env.SERVER_HOST + '/test');
    const data = await response.text();
    const translations = await serverSideTranslations(
      locale || defaultLocale, 
    );

    return {
      props: {
        data,
        ...translations
      },
      revalidate: 100,
    };
  };

export default IndexPage;