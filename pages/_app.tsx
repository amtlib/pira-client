import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme/theme';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';

function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  )
}

export default function MyApp(props) {
  const { Component, pageProps } = props;

  return (
    <SafeHydrate>
      <React.Fragment>
        <Head>
          <title>Pollish</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Component {...pageProps} />
            </MuiPickersUtilsProvider>
          </ApolloProvider>
        </ThemeProvider>
      </React.Fragment>
    </SafeHydrate>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};