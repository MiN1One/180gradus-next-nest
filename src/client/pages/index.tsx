import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface HomePageProps {
  data: string;
}

function IndexPage({ data }: HomePageProps) {
  return (
    <main>
      
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