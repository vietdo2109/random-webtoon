import { gql } from "@apollo/client";

export const GET_WEBTOON_BY_IDS = gql`
  query ($ids: [Int], $page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        hasNextPage
      }
      media(id_in: $ids) {
        id
        title {
          english
          romaji
        }
        coverImage {
          extraLarge
          large
        }
        genres
        status
      }
    }
  }
`;
