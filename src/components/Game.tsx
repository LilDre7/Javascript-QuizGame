import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useQuestionsStore } from "../store/questions";
import { type Question as QuestionType } from "../types/types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { gradientDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

const Question = ({ info }: { info: QuestionType }) => {
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
            <ListItemButton>
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

  const questionInfo = questions[currentQuestion];

  return (
    <>
      <Question info={questionInfo} />
    </>
  );
};

export default Game;
