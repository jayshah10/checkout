import { NewRatingForm } from "../NewRatingForm";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const writeInField = async (field: string, value: string) => {
  fireEvent.change(await screen.findByTestId(field), {
    target: { value: value },
  });
};

const clickSubmit = async () => {
  userEvent.click(await screen.findByTestId("new-comment-submit-button"));
};

const clickRating = async (value: number) => {
  const rating = await screen.findByText(`${value} Stars`);
  userEvent.click(rating);
};

describe("New Rating Form", () => {
  it("correctly returns the data entered", async () => {
    const callback = (value: any) => {
      expect(value).toStrictEqual({
        name: "New Name",
        email: "new@email.com",
        comment: "new comment here",
        rating: 3,
      });
    };
    render(<NewRatingForm onSubmit={callback} />);
    writeInField("new-comment-name-field", "New Name");
    writeInField("new-comment-email-field", "new@email.com");
    writeInField("new-comment-comment-field", "new comment here");
    clickSubmit();
  });

  it("correctly returns the selected rating value", async () => {
    const callback = (value: any) => {
      expect(value).toStrictEqual({
        name: "New Name",
        email: "new@email.com",
        comment: "new comment here",
        rating: 5,
      });
    };
    render(<NewRatingForm onSubmit={callback} />);
    writeInField("new-comment-name-field", "New Name");
    writeInField("new-comment-email-field", "new@email.com");
    writeInField("new-comment-comment-field", "new comment here");
    clickRating(5);
    clickSubmit();
  });

  it("should correctly validate empty fields", async () => {
    render(<NewRatingForm onSubmit={() => {}} />);
    clickSubmit();
    expect(await screen.findByText("Name is required")).toBeInTheDocument();
    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    expect(await screen.findByText("Comment is required")).toBeInTheDocument();
  });

  it("should correctly validate incorrect emails", async () => {
    render(<NewRatingForm onSubmit={() => {}} />);
    writeInField("new-comment-email-field", "not an email");
    clickSubmit();
    expect(
      await screen.findByText("Invalid Email address.")
    ).toBeInTheDocument();
  });
});
