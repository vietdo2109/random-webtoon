import { Character } from "./character";

export type Webtoon = {
  bannerImage: string | null;
  chapters: number | null;
  characters: {
    nodes: Character[];
  };
  coverImage: string | null;
  description: string | null;
  endDate: FuzzyDate;
  genres: string[] | null;
  id: number;
  averageScore: number | null;
  startDate: FuzzyDate;
  status: string | null;
  title: string;
  tags: { name: string }[] | null;
};

export type FuzzyDate = {
  day: number | null;
  month: number | null;
  year: number | null;
};
