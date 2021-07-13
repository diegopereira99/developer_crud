import { FC, useEffect } from 'react';
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@material-ui/styles';
import { Container, CssBaseline } from '@material-ui/core';
import theme from '../../styles/theme';
import Head from 'next/head';
import NavBar from '../components/NavBar';
import Loading from '../components/Loading';
import "../../styles/global.scss";
import AppUtilsProvider from '../contexts/appUtilsContext/Provider';
import CustomAlert from '../components/Alert';
import ConfirmationDialogProvider from '../contexts/confirmationDialogContext/Provider';

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Developer CRUD</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <AppUtilsProvider>
          <ConfirmationDialogProvider>
            <Loading />
            <CustomAlert />
            <CssBaseline />
            <NavBar />
            <Container className="main-container">
              <Component {...pageProps} />
            </Container>
          </ConfirmationDialogProvider>
        </AppUtilsProvider>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
