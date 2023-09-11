import { useQuestionsStore } from "../store/questions";

const Footer = () => {
  const questions = useQuestionsStore((state) => state.questions);

  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;

  questions.forEach((question) => {
    const { userSelectedAnswer, correctAnswer } = question;
    if (userSelectedAnswer == null) unanswered++;
    else if (userSelectedAnswer === correctAnswer) correct++;
    else incorrect++;
  });

  return (
    <footer>
      <strong
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "2rem",
          marginBottom: "2rem",
          gap: "1rem",
        }}
      >
        <i
          style={{ fontSize: "1.6rem" }}
          className="bx bx-badge-check bx-tada"
        ></i>
        {`${correct} correctas `}
        <i
          style={{ fontSize: "1.6rem" }}
          className="bx bx-message-alt-x bx-tada bx-flip-horizontal"
        ></i>
        {`${incorrect} incorrectas `}
        <i
          style={{ fontSize: "1.6rem" }}
          className="bx bx-search-alt bx-tada"
        ></i>
        {`${unanswered} disponibles `}
      </strong>
    </footer>
  );
};

export default Footer;
