import { gql } from "@apollo/client";

export const GET_RANDOM_WEBTOONS = gql`
  query GetRandomWebtoons(
    $page: Int = 1
    $perPage: Int = 20
    $type: MediaType = MANGA
    $countryOfOrigin: CountryCode = KR
    $sort: [MediaSort] = [POPULARITY_DESC]
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        hasNextPage
        currentPage
      }
      media(
        type: $type
        countryOfOrigin: $countryOfOrigin
        sort: $sort
        isAdult: false
      ) {
        id
        title {
          romaji
          english
        }
        coverImage {
          extraLarge
        }
        genres
        averageScore
        description(asHtml: false)
      }
    }
  }
`;
