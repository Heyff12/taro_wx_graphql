import { gql } from "apollo-boost";

export const testQuery = gql`
{
  rates(currency: "USD") {
    currency
  }
}
`
