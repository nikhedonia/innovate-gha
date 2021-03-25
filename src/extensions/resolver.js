export const resolvers = {
  Repository: {
    artefacts: ({owner:{login}, name}) => {
      console.log(login, name);
      return "blub";
    }
  }
}