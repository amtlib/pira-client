import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme/theme';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';
import { UserContainer } from '../containers/UserContainer';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column"
  }
}));

function SafeHydrate({ children }) {
  const classes = useStyles();
  return (
    <div className={classes.root} suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  )
}

export default function MyApp(props) {
  const { Component } = props;

  return (
    <SafeHydrate>
      <Head>
        <title>Pollish</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css" />
      </Head>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <UserContainer>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Component />
            </UserContainer>
          </MuiPickersUtilsProvider>
        </ApolloProvider>
      </ThemeProvider>
    </SafeHydrate>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
};