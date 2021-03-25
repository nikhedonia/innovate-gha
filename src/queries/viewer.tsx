import { gql } from "@apollo/client";
export default gql`
  query GetViewer {
    viewer {
      login
      avatarUrl
      name
    }
  }
`;
