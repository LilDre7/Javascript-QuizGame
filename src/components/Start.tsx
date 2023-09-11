import { Button } from "@mui/material";
import { useQuestionsStore } from "../store/questions";
import limitQuestions from "../helpers/limitQuestions";

const Start = () => {
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions);

  const handleClick = () => {
    fetchQuestions(limitQuestions);
  };

  return (
    <Button
      onClick={handleClick}
      className="start-button"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "2rem",
        margin: "0 auto",
      }}
      disableElevation
      disableRipple
      sx={{ mt: 5 }}
      variant="contained"
      color="primary"
    >
      <b>!Empezar! ⚔️</b>
    </Button>
  );
};

export default Start;
