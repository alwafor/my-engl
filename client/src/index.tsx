import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { client } from "./common/Graphql/client";
import './common/Styles/zero.css'
import "./common/Styles/styles.css";

ReactDOM.render(
   <ApolloProvider client={client}>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </ApolloProvider>,

   document.getElementById("root")
);
