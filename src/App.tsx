import "./App.css";
import { Container, Stack, Typography } from "@mui/material";
import JavaScriptLogo from "./assets/JavaScriptLogo";
import Start from "./components/Start";
import { useQuestionsStore } from "./store/questions";
import Game from "./components/Game";
import Footer from "./components/Footer";

const App = () => {
  const questions = useQuestionsStore((state) => state.questions);

  return (
    <main>
      <Container maxWidth="sm">
        <Stack
          direction="row"
          gap={2}
          component="header"
          display="flex"
          alignItems="center"
          justifyItems="center"
          justifyContent="center"
          sx={{
            marginTop: 4,
            marginBottom: 4,
          }}
        >
          <JavaScriptLogo />
          <Typography variant="h2" component="h1">
            JavaScript Quiz
          </Typography>
        </Stack>

        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}
        <Footer />
      </Container>
    </main>
  );
};

export default App;
