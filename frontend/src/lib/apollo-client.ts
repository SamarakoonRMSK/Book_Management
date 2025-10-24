'use client';

import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql', // Our backend URL
});

// This authLink reads the token from localStorage
const authLink = setContext((_, { headers }) => {
    // Check if we are on the client side
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('book-app-token');
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : '',
            },
        };
    }
    return { headers };
});

export const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([authLink, httpLink]),
});
