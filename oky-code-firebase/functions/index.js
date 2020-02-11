const functions = require("firebase-functions")
const { makeExecutableSchema } = require("graphql-tools")
const express = require("express")
const gqlMiddleware = require("express-graphql")
const { readFileSync } = require("fs")
const { join } = require("path")
const resolvers = require("./src/graphql/resolvers")
const typeDefs = readFileSync(
  join(__dirname, "src/graphql", "schema.graphql"),
  "UTF-8"
)
const app = express()
const schema = makeExecutableSchema({ typeDefs, resolvers })

app.use("/", gqlMiddleware({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
  })
)

exports.api = functions.https.onRequest(app);
