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
      media(type: $type, countryOfOrigin: $countryOfOrigin, sort: $sort) {
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

export const GET_WEBTOONS_BY_GENRES = gql`
  query (
    $page: Int = 1
    $perPage: Int = 5
    $type: MediaType
    $countryOfOrigin: CountryCode = KR
    $genres: [String]
    $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC]
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        hasNextPage
      }
      media(
        type: $type
        sort: $sort
        countryOfOrigin: $countryOfOrigin
        genre_in: $genres
      ) {
        id
        title {
          english
          romaji
        }
        coverImage {
          extraLarge
        }
        genres
        description(asHtml: false)
      }
    }
  }
`;
