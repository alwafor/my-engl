import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Route } from "react-router";
import { GET_RANDOM_WORDS } from "./common/Graphql/query";
import AddWords from "./components/AddWords/AddWords";
import Dictionaries from "./components/Dictionaries/Dictionaries";
import Navbar from "./components/Navbar/Navbar";
import RandWords from "./components/RandWords/RandWords";

function App() {
   // const {loading, error, data} = useQuery(GET_RANDOM_WORDS(5));
   // if(loading) return <div></div>

   return (
      <div className="container">
         <Navbar />
         <Route path="/" exact render={() => <RandWords />} />
         <Route path="/addWords" render={() => <AddWords />} />
         <Route path="/dictionaries" render={() => <Dictionaries />} />
      </div>
   );
}

export default App;
