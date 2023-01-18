import { ReactNode, useContext, useState } from "react";
import { createContext } from "react";
import {
  RatingsContextType,
  Rating,
  RatingsDistribution,
  AddRating,
} from "../types";

const RatingsContext = createContext<RatingsContextType | undefined>(undefined);

interface RatingsContextProviderProps {
  children: ReactNode;
  mockRatings?: Array<Rating>;
}

export const RatingsContextProvider = (props: RatingsContextProviderProps) => {
  const { children, mockRatings } = props;
  const [ratings, setRatings] = useState<Array<Rating>>(
    mockRatings ? mockRatings : []
  );
  const addRating = (rating: Rating) => {
    setRatings([...ratings, rating]);
  };

  const context = {
    ratings,
    addRating,
  };

  return (
    <RatingsContext.Provider value={context}>
      {children}
    </RatingsContext.Provider>
  );
};

export const useRatings = (): {
  latestRatings: Array<Rating>;
  totalRatingsCount: number;
  averageRating: number;
  distribution: RatingsDistribution;
  addRating: AddRating;
} => {
  const context: RatingsContextType | undefined = useContext(RatingsContext);

  if (!context) {
    throw new Error(
      "useRatings can only be used when inside a RatingsContextProvider."
    );
  }

  const distribution: RatingsDistribution = context.ratings.reduce(
    (prev: RatingsDistribution, current: Rating) => {
      if (prev[current.rating]) {
        prev[current.rating] = prev[current.rating] + 1;
      } else {
        prev[current.rating] = 1;
      }

      return prev;
    },
    {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    }
  );

  const averageRating = Math.round(
    context.ratings.reduce(
      (prev: number, current: Rating) => prev + current.rating,
      0
    ) / context.ratings.length
  );

  //TODO: we are pulling the 5 latest we can update this to show a configurable count.
  const latestRatings = context.ratings.slice(-5);

  const totalRatingsCount = context.ratings.length;

  return {
    latestRatings,
    totalRatingsCount,
    averageRating,
    distribution,
    addRating: context.addRating,
  };
};
