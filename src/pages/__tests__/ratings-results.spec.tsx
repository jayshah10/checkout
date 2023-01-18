import { render, screen } from "@testing-library/react";
import { RatingsContextProvider } from "../../context";
import { Rating } from "../../types";
import { RatingsResults } from "../ratings-results";

jest.mock("react-router-dom", () => ({
  Link: (props: any) => <div>{props.children}</div>,
}));

const renderNewRatingPage = (mockRatings: Array<Rating>) => {
  render(
    <RatingsContextProvider mockRatings={mockRatings}>
      <RatingsResults />
    </RatingsContextProvider>
  );
};

describe("Ratings Results", () => {
  it("should show 'No comments found!' if no ratings available", async () => {
    renderNewRatingPage([]);
    expect(await screen.findByText("No comments found!")).toBeInTheDocument();
  });
});
