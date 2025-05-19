import { ApolloClient, InMemoryCache } from "@apollo/client";

const client5005 = new ApolloClient({
  uri: "https://api.lionsystems.com.mx/graphql",
  cache: new InMemoryCache(),
});

export default client5005;
