import React from "react";
import { ApolloProvider } from "@apollo/client";
import client5005 from "../api/apolloClient5005";
import LoginForm from "../components/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <ApolloProvider client={client5005}>
      <LoginForm />
    </ApolloProvider>
  );
};

export default LoginPage;
