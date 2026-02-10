import gql from "graphql-tag";

export const typeDefs = gql`
  type LocationWeatherType {
    zip: String!
    weather: String!
    tempC: String!
    tempF: String!
    friends: [LocationWeatherType!]!
    advisory: String
  }

  input LocationWeatherInput {
    zip: String!
    weather: String
    tempC: String
    tempF: String
    friends: [String]
    advisory: String
  }

  type Query {
    weather(zip: String): [LocationWeatherType]!
  }

  type Mutation {
    weather(data: LocationWeatherInput): [LocationWeatherType]!
  }
`;
