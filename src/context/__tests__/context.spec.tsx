import { render, screen } from "@testing-library/react";
import { Rating } from "../../types";
import { RatingsContextProvider, useRatings } from "../context";

const MockRatingsComponent = () => {
  const { latestRatings, totalRatingsCount, averageRating, distribution } =
    useRatings();
  return (
    <div>
      <div data-testid={"latest-ratings"}>{JSON.stringify(latestRatings)}</div>
      <div data-testid={"total-ratings-count"}>
        {totalRatingsCount ? totalRatingsCount : ""}
      </div>
      <div data-testid={"average-rating"}>
        {averageRating ? averageRating : ""}
      </div>
      <div data-testid={"distribution"}>{JSON.stringify(distribution)}</div>
    </div>
  );
};

const renderUseRatings = (mockRatings: Array<Rating>) => {
  render(
    <RatingsContextProvider mockRatings={mockRatings}>
      <MockRatingsComponent />
    </RatingsContextProvider>
  );
};

const mockMultipleRatings = [
  { name: "name-1", email: "email-1", comment: "comment-1", rating: 1 },
  { name: "name-2", email: "email-2", comment: "comment-2", rating: 3 },
];

const mockDistributionRatings = [
  { name: "name-1", email: "email-1", comment: "comment-1", rating: 1 },
  { name: "name-2", email: "email-2", comment: "comment-2", rating: 3 },
  { name: "name-3", email: "email-3", comment: "comment-3", rating: 3 },
];

const mocklatestRatingsLimit = [
  { name: "name-1", email: "email-1", comment: "comment-1", rating: 1 },
  { name: "name-2", email: "email-2", comment: "comment-2", rating: 3 },
  { name: "name-3", email: "email-3", comment: "comment-3", rating: 3 },
  { name: "name-4", email: "email-4", comment: "comment-4", rating: 3 },
  { name: "name-5", email: "email-5", comment: "comment-5", rating: 3 },
  { name: "name-6", email: "email-6", comment: "comment-6", rating: 3 },
];

describe("useRatings", () => {
  it("should return correct total ratings count", async () => {
    renderUseRatings(mockMultipleRatings);
    expect(await screen.findByTestId("total-ratings-count")).toHaveTextContent(
      "2"
    );
  });

  it("should return correct average", async () => {
    renderUseRatings(mockMultipleRatings);
    expect(await screen.findByTestId("average-rating")).toHaveTextContent("2");
  });

  it("should return correct distribution", async () => {
    renderUseRatings(mockDistributionRatings);
    expect(await screen.findByTestId("distribution")).toHaveTextContent(
      '{"1":1,"2":0,"3":2,"4":0,"5":0}'
    );
  });

  it("should return correct latest ratings", async () => {
    renderUseRatings(mockDistributionRatings);
    expect(await screen.findByTestId("latest-ratings")).toHaveTextContent(
      '[{"name":"name-1","email":"email-1","comment":"comment-1","rating":1},{"name":"name-2","email":"email-2","comment":"comment-2","rating":3},{"name":"name-3","email":"email-3","comment":"comment-3","rating":3}]'
    );
  });

  it("should return only last 5 latest ratings", async () => {
    renderUseRatings(mocklatestRatingsLimit);
    expect(await screen.findByTestId("latest-ratings")).toHaveTextContent(
      '[{"name":"name-2","email":"email-2","comment":"comment-2","rating":3},{"name":"name-3","email":"email-3","comment":"comment-3","rating":3},{"name":"name-4","email":"email-4","comment":"comment-4","rating":3},{"name":"name-5","email":"email-5","comment":"comment-5","rating":3},{"name":"name-6","email":"email-6","comment":"comment-6","rating":3}]'
    );
  });

  it("Should not return any latest ratings if none created", async () => {
    renderUseRatings([]);
    expect(await screen.findByTestId("latest-ratings")).toHaveTextContent("[]");
  });
});
