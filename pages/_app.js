// $FlowFixMe StrictMode isn't typed yet
import React, { StrictMode } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import App, { Container } from 'next/app';
import { IntlProvider, addLocaleData } from 'react-intl';
import * as Sentry from '@sentry/browser';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from 'react-apollo';
import { MDXProvider } from '@mdx-js/tag';
import GlobalStyles from '../components/GlobalStyles';
import withApolloClient from '../lib/withData';
import { colors } from '../config';
import { version } from '../package.json';
import Document from '../components/layouts/Document';
import Meta from '../components/Meta';
import Paragraph from '../components/Paragraph';
import Error from './_error';

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

// Register React Intl's locale data for the user's locale in the browser. This
// locale data was added to the page by `pages/_document.js`. This only happens
// once, on initial page load in the browser.
if (typeof window !== 'undefined' && window.ReactIntlLocaleData) {
  Object.keys(window.ReactIntlLocaleData).forEach(lang => {
    addLocaleData(window.ReactIntlLocaleData[lang]);
  });
}

class MyApp extends App {
  constructor(...args) {
    super(...args);
    Sentry.init({
      dsn: process.env.SENTRY,
      release: version,
      environment: process.env.NODE_ENV,
      serverName: process.env.NOW != null ? 'now.sh' : 'localhost',
    });
  }

  static getInitialProps = async ({ Component, ctx }) => {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
      const { statusCode } = pageProps;
      if (statusCode !== 200) {
        ctx.res.statusCode = statusCode;
        return { statusCode };
      }
    }

    // Get the `locale` and `messages` from the request object on the server.
    // In the browser, use the same values that the server serialized.
    const { req } = ctx;
    const { locale, messages } = req || window.__NEXT_DATA__.props.pageProps;

    return { pageProps, locale, messages };
  };

  componentDidCatch(error, errorInfo) {
    Sentry.captureException(error, { extra: errorInfo });
    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const {
      Component,
      pageProps,
      locale,
      messages,
      apollo,
      statusCode,
    } = this.props;

    const now = Date.now();

    return (
      <StrictMode>
        <IntlProvider messages={messages} initialNow={now} locale={locale}>
          <Container>
            <ThemeProvider theme={colors}>
              <MDXProvider components={{ p: Paragraph }}>
                <ApolloProvider client={apollo}>
                  <>
                    <GlobalStyles />
                    {/* $FlowFixMe not sure how to tell flow that Meta is wrapped in withRouter */}
                    <Meta />
                    {statusCode ? (
                      <Error statusCode={statusCode} />
                    ) : (
                      <Document>
                        <Component {...pageProps} />
                      </Document>
                    )}
                  </>
                </ApolloProvider>
              </MDXProvider>
            </ThemeProvider>
          </Container>
        </IntlProvider>
      </StrictMode>
    );
  }
}

export default withApolloClient(MyApp);
