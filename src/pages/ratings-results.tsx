import { useRatings } from "../context";
import {
  Container,
  Stack,
  Button,
  Grid,
  Typography,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import { RatingsChart, AverageRating } from "../components";
import { CommentCard } from "../components/comment-card";

export const RatingsResults = () => {
  const { latestRatings, distribution, averageRating, totalRatingsCount } =
    useRatings();
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h3">Ratings Summary</Typography>
          <Button
            data-testid={"add-new-rating-button"}
            variant="outlined"
            component={Link}
            to={"/new-rating"}
          >
            Add New Rating
          </Button>
        </Grid>
        <Grid item xs={6} md={2}>
          <AverageRating
            averageRating={averageRating}
            totalRatingCount={totalRatingsCount}
          />
        </Grid>
        <Grid
          item
          xs={6}
          md={10}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "stretch",
            flex: "1 1 auto",
          }}
        >
          <RatingsChart ratingDistribution={distribution} />
        </Grid>
        <Grid item xs={12} md={12}>
          <Typography variant="h5">Latest Comments</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "stretch",
          }}
        >
          {latestRatings?.length > 0 ? (
            <Stack
              direction="column"
              spacing={2}
              sx={{ display: "flex", flex: "1 1 auto" }}
            >
              {latestRatings.map((rating) => (
                <CommentCard rating={rating} />
              ))}
            </Stack>
          ) : (
            <Alert sx={{ flex: "1 1 auto" }} severity="info">
              No comments found!
            </Alert>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};
