import { gql } from "@apollo/client";
export default gql`
query GetRepos {
    organization(login: "newdaycards") {
        repositories(first: 10) {
            nodes {
                id
                name
                updatedAt
                defaultBranchRef { 
                    target {
                    ... on Commit { # if commit
                            history(first: 10) { # get commit history
                                nodes {
                                    message
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
}`;