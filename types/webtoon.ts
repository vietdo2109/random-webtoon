export type Webtoon = {
  bannerImage: string | null;
  chapters: number | null;
  characters: {
    nodes: {
      age: string | null;
      dateOfBirth: FuzzyDate;
      description: string | null;
      gender: string | null;
      image: {
        large: string | null;
        medium: string | null;
      };
      name: {
        full: string | null;
      };
    }[];
  };
  coverImage: string | null;
  description: string | null;
  endDate: FuzzyDate;
  genres: string[] | null;
  id: number;
  startDate: FuzzyDate;
  status: string | null;
  title: string;
  tags: string[] | null;
};

export type FuzzyDate = {
  day: number | null;
  month: number | null;
  year: number | null;
};
