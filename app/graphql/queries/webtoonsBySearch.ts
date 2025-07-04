import { gql } from "@apollo/client";

export const GET_WEBTOONS_BY_SEARCH = gql`
  query (
    $page: Int = 1
    $type: MediaType
    $search: String
    $countryOfOrigin: CountryCode = KR
    $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC]
  ) {
    Page(page: $page, perPage: 20) {
      pageInfo {
        hasNextPage
      }
      media(
        type: $type
        sort: $sort
        search: $search
        countryOfOrigin: $countryOfOrigin
        isAdult: false
      ) {
        id
        title {
          english
          romaji
        }
        coverImage {
          large
        }
        genres
        status
      }
    }
  }
`;
