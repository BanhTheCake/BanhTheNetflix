import '@/styles/globals.css'
import React from 'react';
import type { AppContext, AppProps } from 'next/app'
import { CssBaseline } from '@mui/material';

import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import Theme from '@/layouts/Theme';
import AuthProvider, { AuthState, getUser } from '@/context/auth.context';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  setLogger,
} from 'react-query'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from 'next/app';
import AxiosConfig from '@/layouts/AxiosConfig';
import NextNProgress from 'nextjs-progressbar';

interface MyAppProps extends AppProps {
  auth: AuthState | null
}


setLogger({
  error: () => { },
  log: () => { },
  warn: () => { },
})
export default function MyApp({ Component, pageProps, auth }: MyAppProps) {
  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        retry: 0
      }
    }
  }))
  return <>
    <Provider store={store}>
      <CssBaseline />
      <Theme>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <AuthProvider value={auth}>
              <AxiosConfig>
                <NextNProgress options={{ showSpinner: false }} />
                <Component {...pageProps} />
              </AxiosConfig>
            </AuthProvider>
          </Hydrate>
        </QueryClientProvider>
        <ToastContainer style={{ width: 'fit-content' }} />
      </Theme>
    </Provider>
  </>
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)
  const auth = await getUser(appContext.ctx)
  return { ...appProps, auth: auth }
}