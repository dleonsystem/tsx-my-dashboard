import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/graphql", // endpoint público
  cache: new InMemoryCache(),
});

export default client;
