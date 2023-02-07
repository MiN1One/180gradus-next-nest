import { AppProps } from "next/app";
import { appWithTranslation,  } from 'next-i18next';
import { GlobalContextProvider } from "@client/contexts/GlobalContext";
import '@client/sass/index.scss';

const NextApp = ({ Component, pageProps }: AppProps) => {
  return (
    <GlobalContextProvider headData={pageProps.headData}>
      <Component {...pageProps} />
    </GlobalContextProvider>
  );
};

export default appWithTranslation(NextApp);