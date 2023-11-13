import {gql} from "@apollo/client";

export const LOAD_DATA = gql`
  query GetRepository($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name, followRenames: null) {
      createdAt
      databaseId
      description
      archivedAt
      id
      name
    }
  }
`;
