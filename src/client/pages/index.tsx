import Layout from '@client/components/Common/Layout';
import HomeContent from '@client/components/HomeContent/HomeContent';
import { HomeContextProvider } from '@client/contexts/HomeContext';
import { fetchHeadData } from '@client/utils/fetch.utils';
import { GetStaticProps } from 'next';

interface HomePageProps {
}

function IndexPage(props: HomePageProps) {
  return (
    <HomeContextProvider>
      <Layout>
        <HomeContent />
      </Layout>
    </HomeContextProvider>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = 
  async ({ locale, defaultLocale }) => {
    return {
      props: {
        ...(await fetchHeadData(locale || defaultLocale))
      },
      revalidate: 100,
    };
  };

export default IndexPage;