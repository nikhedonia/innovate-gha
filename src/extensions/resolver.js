export const resolvers = {
  Repository: {
    artefacts: ({owner:{login}, name}) => {
      return "blub";
    }
  }
}