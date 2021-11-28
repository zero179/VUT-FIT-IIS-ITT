import '../styles/globals.css'
import type {AppProps} from 'next/app'
import apolloClient from "../src/config/apolloClient";
import {ApolloProvider} from "@apollo/client";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "../src/config/theme";
import {LocalizationProvider} from "@mui/lab";
import DateAdapter from '@mui/lab/AdapterDayjs';
import {UserProvider} from "@auth0/nextjs-auth0";
import Head from "next/head";

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <title>IS project</title>
            </Head>
            <ThemeProvider theme={theme}>
                <ApolloProvider client={apolloClient}>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <UserProvider>
                            <CssBaseline/>
                            <Component {...pageProps} />
                        </UserProvider>
                    </LocalizationProvider>
                </ApolloProvider>
            </ThemeProvider>
        </>
    )
}

export default MyApp
