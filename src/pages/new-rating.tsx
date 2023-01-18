import { NewRatingForm } from "../components";
import { useRatings } from "../context";
import { Rating } from "../types";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";

export const NewRating = () => {
  const { addRating } = useRatings();
  const navigate = useNavigate();
  const submitNewRating = (rating: Rating) => {
    addRating(rating);
    navigate("/ratings-results");
  };
  return (
    <Container>
      <NewRatingForm onSubmit={submitNewRating} />
    </Container>
  );
};
