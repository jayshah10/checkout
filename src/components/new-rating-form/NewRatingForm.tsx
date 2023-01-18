import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Box,
  Rating as MuiRating,
  Button,
  Grid,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, TypeOf } from "zod";
import { Rating } from "../../types";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

export interface NewRatingFormProps {
  onSubmit: (rating: Rating) => void;
}

const ratingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid Email address."),
  comment: z.string().min(1, "Comment is required"),
  rating: z.string(), //.min(1, "Rating is required"),
});

//see comment next to the ratings input below as to why we need a 'new' type def here instead of using Rating.
type FormOutput = TypeOf<typeof ratingSchema>;

export const NewRatingForm = (props: NewRatingFormProps) => {
  const { onSubmit } = props;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormOutput>({
    resolver: zodResolver(ratingSchema),
  });

  const onSubmitHandler: SubmitHandler<FormOutput> = (values) => {
    // incoming values should be validate by this time so we just convert to a rating object and send it out.
    onSubmit({
      name: values.name,
      email: values.email,
      rating: Number.parseInt(values.rating),
      comment: values.comment,
    });
  };

  return (
    <Card variant="outlined">
      <CardHeader title="Add New Rating" />
      <CardContent>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Stack spacing={2}>
                <TextField
                  inputProps={{ "data-testid": "new-comment-name-field" }}
                  id="name"
                  label="Name"
                  error={!!errors["name"]}
                  helperText={errors["name"] ? errors["name"].message : ""}
                  {...register("name")}
                />
                <TextField
                  inputProps={{ "data-testid": "new-comment-email-field" }}
                  id="email"
                  label="Email"
                  error={!!errors["email"]}
                  helperText={errors["email"] ? errors["email"].message : ""}
                  {...register("email")}
                />
                {/**
                 * Mui rating does not like being given a string, and the on change prop provided by react hook always looks at
                 * the event target instead of the onchange value. which returns a string. so we need to capture a string then convert to
                 * a number to save down
                 */}
                <Controller
                  name="rating"
                  control={control}
                  defaultValue={"3"}
                  rules={{ required: true }}
                  render={(props) => (
                    <MuiRating
                      data-testid="new-comment-rating-selector"
                      name="rating"
                      onChange={props.field.onChange}
                      value={Number(props.field.value)}
                    />
                  )}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                sx={{ width: "100%" }}
                inputProps={{ "data-testid": "new-comment-comment-field" }}
                id="comment"
                label="Comment"
                placeholder="Enter comment here..."
                error={!!errors["comment"]}
                helperText={errors["comment"] ? errors["comment"].message : ""}
                multiline
                rows={8}
                {...register("comment")}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                data-testid={"new-comment-submit-button"}
                type="submit"
                variant="outlined"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};
