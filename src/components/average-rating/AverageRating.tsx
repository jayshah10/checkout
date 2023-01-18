import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Rating,
} from "@mui/material";

interface AverageRatingProps {
  averageRating?: number;
  totalRatingCount?: number;
}

export const AverageRating = (props: AverageRatingProps) => {
  const { averageRating, totalRatingCount } = props;

  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="subtitle1">Average Rating</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography data-testid={"average-rating-label"} variant="h3">
              {averageRating ? averageRating : "N/A"}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Rating value={averageRating ? averageRating : 0} readOnly />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography data-testid={"total-ratings-label"} variant="subtitle1">
              {totalRatingCount
                ? `(${totalRatingCount}) total`
                : "No Ratings submitted."}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
