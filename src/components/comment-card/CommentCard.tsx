import { Rating } from "../../types";
import { Card, CardHeader, CardContent, Typography } from "@mui/material";

interface CommentCardProps {
  rating: Rating;
}

export const CommentCard = (props: CommentCardProps) => {
  const { name, comment, email } = props.rating;
  return (
    <Card sx={{ flex: "1 1 auto" }} variant="outlined">
      <CardHeader title={name} subheader={email} />
      <CardContent>
        <Typography data-testid={"comment-body"} variant="body2">
          {comment}
        </Typography>
      </CardContent>
    </Card>
  );
};
