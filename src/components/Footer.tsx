import { useQuestionsDate } from "../hooks/useQuestionDate";

const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionsDate();

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
          style={{ fontSize: "1.6rem", color: "#15ff00" }}
          className="bx bx-badge-check bx-tada"
        ></i>
        {`${correct} correctas `}
        <i
          style={{ fontSize: "1.6rem", color: "#ff0000" }}
          className="bx bx-message-alt-x bx-tada bx-flip-horizontal"
        ></i>
        {`${incorrect} incorrectas `}
        <i
          style={{ fontSize: "1.6rem", color: "#2f00ff" }}
          className="bx bx-search-alt bx-tada"
        ></i>
        {`${unanswered} disponibles `}
      </strong>
    </footer>
  );
};

export default Footer;
