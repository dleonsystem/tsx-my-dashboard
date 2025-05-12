import { ApolloClient, InMemoryCache } from "@apollo/client";

const client5005 = new ApolloClient({
  uri: "http://localhost:5005/graphql",
  cache: new InMemoryCache(),
});

export default client5005;
