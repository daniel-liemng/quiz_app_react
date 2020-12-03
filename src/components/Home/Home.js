import React from "react";
import { Link } from "react-router-dom";
import { Container, Paper, Typography, Grid, Button } from "@material-ui/core";
import useStyles from "./styles";

const Home = () => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Paper>
        <Typography variant='h3' align='center'>
          Quiz App
        </Typography>
        <Grid container spacing={3} align='center'>
          <Grid item sm={12} style={{ margin: "1rem 0" }}>
            <Button
              component={Link}
              to='/quiz'
              variant='contained'
              color='default'
            >
              Play
            </Button>
          </Grid>
          <Grid item sm={12}>
            <div className={classes.buttons}>
              <Button variant='contained' color='primary'>
                Login
              </Button>
              <Button variant='contained' color='secondary'>
                Register
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Home;
