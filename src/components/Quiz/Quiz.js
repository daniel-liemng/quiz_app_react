import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Typography,
  Grid,
  Container,
  Paper,
  Button,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import LocationDisabledOutlinedIcon from "@material-ui/icons/LocationDisabledOutlined";
import AccessAlarmOutlinedIcon from "@material-ui/icons/AccessAlarmOutlined";
import useStyles from "./styles";
import { QuizContext } from "../../context";
import { isEmpty } from "../../utils/IsEmpty";

import correctNotification from "../../assets/audio/correct-answer.mp3";
import wrongNotification from "../../assets/audio/wrong-answer.mp3";
import buttonSound from "../../assets/audio/button-sound.mp3";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
};

const Quiz = () => {
  const classes = useStyles();

  const history = useHistory();

  const { quiz } = useContext(QuizContext);

  // state
  const [questions, setQuestions] = useState(quiz);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [nextQuestion, setNextQuestions] = useState({});
  const [previousQuestion, setPreviousQuestions] = useState({});
  const [answer, setAnswer] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [numberOfAnsweredQuestions, setNumberOfAnsweredQuestions] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [hints, setHints] = useState(5);
  const [fiftyFifty, setFiftyFifty] = useState(2);
  const [usedFiftyFifty, setUsedFiftyFifty] = useState(false);
  const [time, setTime] = useState({});

  const [isOpenSnackBar, setIsOpenSnackBar] = useState(false);
  const [message, setMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("");

  const [previousRandomNumbers, setPreviousRandomNumbers] = useState([]);

  console.log(questions);

  const displayQuestions = (
    questions,
    currentQuestion,
    previousQuestion,
    nextQuestion
  ) => {
    if (!isEmpty(questions)) {
      // initial
      setCurrentQuestion(questions[currentQuestionIndex]);
      setNextQuestions(questions[currentQuestionIndex + 1]);
      setPreviousQuestions(questions[currentQuestionIndex - 1]);
      setAnswer(currentQuestion.answer);
      setNumberOfQuestions(questions.length);
      // for hints purpose
      setPreviousRandomNumbers([]);
      showOptions();
    }
  };

  useEffect(() => {
    displayQuestions(
      questions,
      currentQuestion,
      previousQuestion,
      nextQuestion
    );
  }, [
    questions,
    currentQuestion,
    previousQuestion,
    nextQuestion,
    currentQuestionIndex,
  ]);

  const handleOptionClick = (e) => {
    if (e.target.innerHTML.toLowerCase() === answer.toLowerCase()) {
      setTimeout(() => {
        document.getElementById("correct-sound").play();
      }, 500);

      correctAnswer();
    } else {
      setTimeout(() => {
        document.getElementById("wrong-sound").play();
      }, 500);

      wrongAnswer();
    }
  };

  const handleCloseOptionClick = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsOpenSnackBar(false);
  };

  const correctAnswer = () => {
    setIsOpenSnackBar(true);
    setMessage("Correct Answer!");
    setSnackbarColor("success");

    setScore((prevScore) => prevScore + 1);
    setCorrectAnswers((prevCorrect) => prevCorrect + 1);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }

    setNumberOfAnsweredQuestions((prevNumofAnsQues) => prevNumofAnsQues + 1);
  };

  const wrongAnswer = () => {
    setIsOpenSnackBar(true);
    setMessage("Wrong Answer!");
    setSnackbarColor("error");

    setWrongAnswers((prevCorrect) => prevCorrect + 1);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
    setNumberOfAnsweredQuestions((prevNumofAnsQues) => prevNumofAnsQues);
  };

  const handleSoundBtnClick = () => {
    document.getElementById("button-sound").play();
  };

  const handleNextBtnClick = () => {
    handleSoundBtnClick();
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousBtnClick = () => {
    handleSoundBtnClick();
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleQuitBtnClick = () => {
    handleSoundBtnClick();
    if (window.confirm("Are you sure to quit?")) {
      history.push("/");
    }
  };

  const handleFiftyFifty = () => {};

  // Show all options for the next question after using hints to get rid of wrong answers
  const showOptions = () => {
    const options = Array.from(document.querySelectorAll("#option"));

    options.forEach((option, index) => {
      option.style.visibility = "visible";
    });
  };

  const handleHints = () => {
    if (hints > 0) {
      const options = Array.from(document.querySelectorAll("#option"));

      let indexOfAnswer;

      // Get index of correct option
      options.forEach((option, index) => {
        if (option.innerHTML.toLowerCase() === answer.toLowerCase()) {
          indexOfAnswer = index;
        }
      });

      // Hide the wrong answers randomly -> create an array to hold the indexes of wrong answer
      while (true) {
        const randomNumber = Math.round(Math.random() * 3);
        if (
          randomNumber !== indexOfAnswer &&
          !previousRandomNumbers.includes(randomNumber)
        ) {
          options.forEach((option, index) => {
            if (index === randomNumber) {
              option.style.visibility = "hidden";
              setHints((prevHints) => prevHints - 1);
              setPreviousRandomNumbers(
                previousRandomNumbers.concat(randomNumber)
              );
            }
          });
          break;
        }

        if (previousRandomNumbers.length >= 3) break;
      }
    }
  };

  console.log("cc", currentQuestion);
  console.log("aa", answer);

  console.log("777", previousRandomNumbers);

  return (
    <div className={classes.root}>
      <>
        <audio id='correct-sound' src={correctNotification}></audio>
        <audio id='wrong-sound' src={wrongNotification}></audio>
        <audio id='button-sound' src={buttonSound}></audio>
      </>
      <Container className={classes.inner}>
        <Paper className={classes.paperRoot}>
          <Typography variant='h3'>Quiz Content</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div className={classes.support}>
                <span onClick={handleFiftyFifty}>
                  <LocationDisabledOutlinedIcon
                    className={classes.support1Icon}
                    fontSize='large'
                  />
                  <span style={{ fontWeight: "bold" }}>{fiftyFifty}</span>
                </span>

                <span onClick={handleHints}>
                  <EmojiObjectsOutlinedIcon
                    className={classes.support2Icon}
                    fontSize='large'
                  />
                  <span style={{ fontWeight: "bold" }}>{hints}</span>
                </span>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.clock}>
                <Typography>{`${
                  currentQuestionIndex + 1
                } of ${numberOfQuestions}`}</Typography>
                <AccessAlarmOutlinedIcon />
              </div>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h4' className={classes.questionText}>
                {currentQuestion.question}
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.options}>
              <div className={classes.buttonsGroup}>
                <Typography
                  onClick={handleOptionClick}
                  className={classes.option}
                  id='option'
                >
                  {currentQuestion.optionA}
                </Typography>
                <Typography
                  onClick={handleOptionClick}
                  className={classes.option}
                  id='option'
                >
                  {currentQuestion.optionB}
                </Typography>
              </div>
              <div className={classes.buttonsGroup}>
                <Typography
                  onClick={handleOptionClick}
                  className={classes.option}
                  id='option'
                >
                  {currentQuestion.optionC}
                </Typography>
                <Typography
                  onClick={handleOptionClick}
                  className={classes.option}
                  id='option'
                >
                  {currentQuestion.optionD}
                </Typography>
              </div>
            </Grid>

            <Grid item xs={12} className={classes.functionButtons}>
              <Button
                variant='contained'
                type='button'
                color='primary'
                className={classes.functionButton}
                onClick={handlePreviousBtnClick}
                disabled={currentQuestionIndex === 0}
              >
                Prev
              </Button>
              <Button
                variant='contained'
                type='button'
                color='secondary'
                className={classes.functionButton}
                onClick={handleNextBtnClick}
                disabled={currentQuestionIndex === questions.length - 1}
              >
                Next
              </Button>
              <Button
                variant='contained'
                type='button'
                color='primary'
                className={classes.functionButton}
                onClick={handleQuitBtnClick}
              >
                Quit
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Snackbar
          open={isOpenSnackBar}
          autoHideDuration={1000}
          onClose={handleCloseOptionClick}
        >
          <Alert onClose={handleCloseOptionClick} severity={snackbarColor}>
            {message}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default Quiz;
