export type Rating = {
  name: string;
  email: string;
  comment: string;
  rating: number;
};

export type AddRating = (rating: Rating) => void;

export type RatingsContextType = {
  ratings: Array<Rating>;
  addRating: AddRating;
};

export type RatingsDistribution = Record<number, number>;
