import { WordResolver } from './src/modules/Resolvers/word';
import "reflect-metadata";
import { createConnection } from "typeorm";
import { schema as GraphqlSchema } from "./src/Graphql/schema";
import { getWord, getAllWords, getRandomWords, getWordsCount } from "./src/Graphql/query";
import { addWord, addWords, addDictionary } from "./src/Graphql/mutations";
import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import {buildSchema} from 'type-graphql';
import * as cors from 'cors';
import { DictionaryResolver } from './src/modules/Resolvers/dictionary';

const main = async () => {
   await createConnection();
   const schema = await buildSchema({
      resolvers: [WordResolver, DictionaryResolver]
   });

   const apolloServer = new ApolloServer({
      schema
   });
   const app = express();

   app.use(cors({
      credentials: true
   }));

   apolloServer.applyMiddleware({app});
   app.listen(4000,() => {console.log("Server started: http://localhost:4000/graphql")})
}
main();

// createConnection().then((connection) => {
//    const root = {
//       getWord,
//       addWord,
//       addWords,
//       getRandomWords,
//       getWordsCount,
//       getAllWords,
//       addDictionary,
//    };

//    app.listen(4000, () => {
//       console.log("RUN!");
//    });
// });
