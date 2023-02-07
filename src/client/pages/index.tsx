import Layout from '@client/components/Common/Layout';
import Hero from '@client/components/Hero/Hero';
import { ScrollContainer } from '@client/components/ScrollContainer/ScrollContainer';
import { fetchHeadData } from '@client/utils/fetch.utils';
import { GetStaticProps } from 'next';

interface HomePageProps {
}

function IndexPage(props: HomePageProps) {
  return (
    <Layout>
      <main>
        <ScrollContainer 
          sections={[
            <Hero />,
            <Hero />,
            <Hero />,
          ]}
        />
      </main>
    </Layout>
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