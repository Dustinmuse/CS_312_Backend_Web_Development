import gql from "graphql-tag";

export const typeDefs = gql`
  type LocationWeatherType {
    zip: String!
    weather: String!
    tempC: String!
    tempF: String!
    # Stored as zip strings in Mongo, resolved into weather objects in resolver.ts
    friends: [LocationWeatherType!]!
  }

  input LocationWeatherInput {
    zip: String!
    weather: String
    tempC: String
    tempF: String
    friends: [String]
  }

  type Query {
    weather(zip: String): [LocationWeatherType]!
  }

  type Mutation {
    weather(data: LocationWeatherInput): [LocationWeatherType]!
  }
`;
