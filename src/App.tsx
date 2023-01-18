import { Routes, Route } from "react-router-dom";
import { RatingsContextProvider } from "./context";
import { NewRating, RatingsResults } from "./pages";
import { Container } from "@mui/material";

export const App = () => {
  return (
    <RatingsContextProvider>
      <Container maxWidth={false} sx={{ marginTop: "20px" }} disableGutters>
        <Routes>
          <Route path="/new-rating" element={<NewRating />} />
          <Route path="/ratings-results" element={<RatingsResults />} />
          <Route path="*" element={<NewRating />} />
        </Routes>
      </Container>
    </RatingsContextProvider>
  );
};
