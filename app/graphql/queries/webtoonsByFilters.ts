import { gql } from "@apollo/client";

export const GET_WEBTOONS_BY_FILTERS = gql`
  query (
    $page: Int = 1
    # $id: Int
    $type: MediaType
    # $search: String
    $countryOfOrigin: CountryCode = KR
    # $year: String

    $yearLesser: FuzzyDateInt
    $yearGreater: FuzzyDateInt
    $chapterLesser: Int
    $chapterGreater: Int
    $genres: [String]
    $excludedGenres: [String]
    $tags: [String]
    $excludedTags: [String]
    $averageScoreGreater: Int
    $averageScoreLesser: Int
    # $minimumTagRank: Int
    $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC]
  ) {
    Page(page: $page, perPage: 20) {
      pageInfo {
        hasNextPage
      }
      media(
        type: $type
        sort: $sort
        countryOfOrigin: $countryOfOrigin
        genre_in: $genres
        genre_not_in: $excludedGenres
        averageScore_greater: $averageScoreGreater
        averageScore_lesser: $averageScoreLesser
        tag_in: $tags
        tag_not_in: $excludedTags
        startDate_lesser: $yearLesser
        startDate_greater: $yearGreater
        chapters_lesser: $chapterLesser
        chapters_greater: $chapterGreater
        isAdult: false
      ) {
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

        rankings {
          allTime
          context
          id
          type
          rank
        }

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
  }
`;
