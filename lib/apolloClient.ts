import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://graphql.anilist.co", // AniList GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;
