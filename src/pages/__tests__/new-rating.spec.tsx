import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RatingsContextProvider, useRatings } from "../../context";
import { NewRating } from "../new-rating";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

const writeInField = async (field: string, value: string) => {
  fireEvent.change(await screen.findByTestId(field), {
    target: { value: value },
  });
};

const clickSubmit = async () => {
  userEvent.click(await screen.findByTestId("new-comment-submit-button"));
};

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

const renderNewRatingPage = () => {
  render(
    <RatingsContextProvider>
      <NewRating />
      <MockRatingsComponent />
    </RatingsContextProvider>
  );
};

describe("New-Rating-Page", () => {
  it("should navigage to ratings result when new rating submitted", async () => {
    renderNewRatingPage();
    writeInField("new-comment-name-field", "New Name");
    writeInField("new-comment-email-field", "new@email.com");
    writeInField("new-comment-comment-field", "new comment here");
    clickSubmit();
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/ratings-results");
    });
  });

  it("should add a rating to the context when submitted", async () => {
    renderNewRatingPage();
    writeInField("new-comment-name-field", "New Name");
    writeInField("new-comment-email-field", "new@email.com");
    writeInField("new-comment-comment-field", "new comment here");
    clickSubmit();
    await waitFor(async () => {
      expect(await screen.findByTestId("latest-ratings")).toHaveTextContent(
        '[{"name":"New Name","email":"new@email.com","rating":3,"comment":"new comment here"}]'
      );
    });
  });
});
