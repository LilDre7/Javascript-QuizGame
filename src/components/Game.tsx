import {
  Card,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useQuestionsStore } from "../store/questions";
import { type Question as QuestionType } from "../types/types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { gradientDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer);

  const createHandleClick = (asnwerIndex: number) => () => {
    selectAnswer(info.id, asnwerIndex);
  };

  const getBackgroundColor = (index: number) => {
    const { userSelectedAnswer, correctAnswer } = info;
    // Usuario no ha seleccionada nada todavia
    if (userSelectedAnswer == null) return "trasparent";
    // Usuario ha seleccionado la respuesta correcta pero no ha seleccionado la respuesta correcta
    if (index === correctAnswer && index !== userSelectedAnswer) return "green";
    // Usuario ha seleccionado la respuesta correcta
    if (index === correctAnswer) return "green";
    // Usuario ha seleccionado la respuesta incorrecta
    if (index === userSelectedAnswer) return "red";

    // Usuario ha seleccionado la respuesta incorrecta y la respuesta correcta

    return "trasparent";
  };

  return (
    <Card
      variant="outlined"
      sx={{
        p: 3,
        bgcolor: "#1E1E1E",
        color: "white",
        width: "100%",
        borderRadius: "20px",
        boxShadow: "0px 0px 10px #000000",
        marginTop: 4,
      }}
    >
      <Typography variant="h5">{info.question}</Typography>

      <SyntaxHighlighter language="javascript" style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>

      <List sx={{ bgcolor: "#333", mt: 2 }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              onClick={createHandleClick(index)}
              sx={{
                backgroundColor: getBackgroundColor(index),
              }}
            >
              <ListItemText primary={answer} sx={{ textAlign: "center" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

const Game = () => {
  const questions = useQuestionsStore((state) => state.questions);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion);
  const goPreviousQuestion = useQuestionsStore(
    (state) => state.goPreviousQuestion
  );

  console.log(questions);

  const questionInfo = questions[currentQuestion];

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <IconButton
          onClick={goPreviousQuestion}
          disabled={currentQuestion === 0}
        >
          <i className="bx bxs-chevrons-left bx-tada"></i>
        </IconButton>
        {currentQuestion + 1} / {questions.length}
        <IconButton
          onClick={goNextQuestion}
          disabled={currentQuestion === questions.length - 1}
        >
          <i className="bx bxs-chevrons-right bx-tada"></i>
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
    </>
  );
};

export default Game;
