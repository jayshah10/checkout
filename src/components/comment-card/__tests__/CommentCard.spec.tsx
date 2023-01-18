import { CommentCard } from "../CommentCard";
import { render, screen } from "@testing-library/react";
import { Rating } from "../../../types";

const testRating: Rating = {
  name: "userName1",
  email: "email@email.com",
  comment: "Test comment",
  rating: 4,
};

describe("Comment Card", () => {
  it("correctly shows comment", async () => {
    render(<CommentCard rating={testRating} />);
    expect(await screen.findByTestId("comment-body")).toHaveTextContent(
      "Test comment"
    );
  });

  it("correctly shows comment user's email", async () => {
    render(<CommentCard rating={testRating} />);
    expect(await screen.findByText("email@email.com")).toBeInTheDocument();
  });

  it("correctly shows comment user's name", async () => {
    render(<CommentCard rating={testRating} />);
    expect(await screen.findByText("userName1")).toBeInTheDocument();
  });
});
