import Layout from '@client/components/Common/Layout';
import HomeSections from '@client/components/HomeSections/HomeSections';
import { HomeContextProvider } from '@client/contexts/HomeContext';
import { fetchData, fetchHeadData } from '@client/utils/fetch.utils';
import { IHomeData } from '@shared/types/home.types';
import { localeKeys } from '@shared/types/locale.types';
import { GetStaticProps } from 'next';

interface HomePageProps {
  homeSettings: IHomeData;
}

function IndexPage(props: HomePageProps) {
  return (
    <HomeContextProvider initialSettings={props.homeSettings}>
      <Layout>
        <HomeSections />
      </Layout>
    </HomeContextProvider>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = 
  async ({ locale, defaultLocale }) => {
    const userLocale = locale || defaultLocale || localeKeys[0];
    const [headData, homeSettings] = await Promise.all([
      fetchHeadData(userLocale),
      fetchData('/api/settings/index', userLocale)
    ]);
    return {
      props: {
        ...headData,
        homeSettings,
      },
      revalidate: 100,
    };
  };

export default IndexPage;