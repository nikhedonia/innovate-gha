import { gql } from "@apollo/client";
export default gql`
query GetProjects { 
    organisation(login: "buckaroo-pm") {
      repositories(first: 10) {
        nodes {
          defaultBranchRef { # or ref(qualifiedName: "master")
            name # branchname
            target { # the latest gitobject of the branch
              ... on Commit { # if commit
                history(first: 10) { # get commit history
                  nodes {
                    message
                    # we can also access files and diffs here
                  }
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
                reviews {
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
  }
`;
