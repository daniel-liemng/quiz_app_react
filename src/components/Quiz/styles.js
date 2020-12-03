import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  root: {
    // minHeight: "100vh",
    textAlign: "center",
  },
  inner: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  paperRoot: {
    padding: "2.5rem 2rem",
    backgroundColor: "#f6bd60",
  },
  questionText: {
    color: "#fff",
  },
  buttonsGroup: {
    display: "inline-block",
    width: "50%",
  },
  option: {
    backgroundColor: "#457b9d",
    borderRadius: "20px",
    cursor: "pointer",
    color: "white",
    margin: "1rem auto",
    padding: "1rem 0.5rem",
    textAlign: "center",
    width: "90%",
    transition: "0.5s linear",

    "&:hover": {
      backgroundColor: "#2a9d8f",
      // color: "black",
    },
  },
  functionButtons: {
    display: "flex",
    justifyContent: "space-around",
  },
  functionButton: {
    width: "10rem",
  },
  support: {
    display: "flex",
    justifyContent: "space-between",
    margin: "0 1rem",
    fontSize: "1.3rem",
  },
  support1Icon: {
    cursor: "pointer",
    color: "#9b5de5",
  },
  support2Icon: {
    cursor: "pointer",
    color: "#06d6a0",
  },
}));
