import { AverageRating } from "../AverageRating";
import { render, screen } from "@testing-library/react";

describe("Average Rating", () => {
  it("should correctly show average rating if provided", async () => {
    render(<AverageRating averageRating={3.5} totalRatingCount={undefined} />);
    expect(await screen.findByTestId("average-rating-label")).toHaveTextContent(
      "3.5"
    );
  });

  it("should correctly show N/A  if average rating not provided", async () => {
    render(
      <AverageRating averageRating={undefined} totalRatingCount={undefined} />
    );
    expect(await screen.findByTestId("average-rating-label")).toHaveTextContent(
      "N/A"
    );
  });

  it("should correctly show total ratings if provided", async () => {
    render(<AverageRating averageRating={3.5} totalRatingCount={300} />);
    expect(await screen.findByTestId("total-ratings-label")).toHaveTextContent(
      "(300) total"
    );
  });

  it("should correctly show  no ratings if total ratings not provided", async () => {
    render(<AverageRating averageRating={3.5} totalRatingCount={undefined} />);
    expect(await screen.findByTestId("total-ratings-label")).toHaveTextContent(
      "No Ratings submitted"
    );
  });

  it.todo("should correctly show average star rating");
});
