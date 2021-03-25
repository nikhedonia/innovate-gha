import { gql } from "@apollo/client";
export default gql`
query GetRepos ($org: String!) {
    organization(login: $org) {
        repositories(first: 10) {
            nodes {
                id
                name
                updatedAt
                defaultBranchRef { 
                    name
                    target {
                        ... on Commit {
                          abbreviatedOid
                          message
                          author {
                            name
                          }
                        }
                      }

                    associatedPullRequests(first: 1) { # pull requests to this branch
                        nodes {
                            body # markdown text
                            author { login }
                            changedFiles
                            mergeable # can we merge?
                                # labels { ... }
                            # hovercard { ... } access github issue
                            # projectCards # associated stories(kanban) and their states
                            # assignees { ... }
                            # comments { ... }
                            # files { ... } # access changed files
                            reviews (first: 1) {
                                nodes {
                                    author { login }
                                    # reactions { }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}`;