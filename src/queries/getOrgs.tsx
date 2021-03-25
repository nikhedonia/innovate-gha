import { gql } from "@apollo/client";
export default gql`
query GetOrgs { 
    viewer { 
      organizations(first: 10) {
        nodes {
          avatarUrl
          name
        }
      }
    }
  }
`