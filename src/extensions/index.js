import { loader } from 'graphql.macro';

export * from './resolver'
export const schema = loader('./schema.gql');