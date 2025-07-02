import { gql } from "@apollo/client";

export const GET_WEBTOON_BY_ID = gql`
  query ($id: Int) {
    Media(id: $id) {
      id
      title {
        english
        romaji
      }
      coverImage {
        extraLarge
        large
      }
      bannerImage
      genres
      tags {
        name
      }
      rankings {
        allTime
        context
        id
        type
        rank
      }
      averageScore
      description(asHtml: false)
      status
      startDate {
        day
        month
        year
      }
      endDate {
        day
        month
        year
      }
      chapters
      staff {
        edges {
          id
        }
      }
      characters {
        nodes {
          name {
            full
            alternative
          }
          age
          gender
          dateOfBirth {
            day
            month
            year
          }
          description
          image {
            large
            medium
          }
        }
      }
    }
  }
`;
