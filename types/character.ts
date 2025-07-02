import { FuzzyDate } from "./webtoon";

export type Character = {
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
};
