import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useProfileProvider } from 'contexts/profile';
import { Button, Breadcrumbs, Card, CardContent, Link, TextField, Grid, Container, CssBaseline, Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { makeStyles } from '@material-ui/core/styles';
import { auth } from 'components/FirebaseConfig';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const useStyles2 = makeStyles(theme => ({
  table: {
    width: '100%',
    minWidth: 500,
    marginTop: 8,
  },
  paper: {
    width: '100%',
    padding: theme.spacing(2, 4, 3),
    outline: 0,
  },
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 500,
  },
  controls: {
    display: 'flex',
    alignItems: 'right',
    alignContent: 'right',
    alignSelf: 'flex-end',
    float: 'right',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

const gridStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    display: 'inline-block',
  },
}));

const AddAnimal = () => {
  const classesGrid = gridStyles();
  const classesTwo = useStyles2();
  const classes = useStyles();
  const { logout, addAnimal, state } = useProfileProvider();
  const [animalInfo, setAnimalInfo] = useState({});
  const [redirectToAnimals, setRedirectToAnimals] = useState(false);
  const [redirectToColonies, setRedirectToColonies] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const { colonyName, colonyId } = state;

  const attemptAddAnimal = (event) => {
    // TODO: Check for 401 and redirect if 200.
    event.preventDefault();
    const request = { animal: animalInfo, colonyId };
    console.log(request);
    addAnimal(request);
    setRedirectToAnimals(true);
  };

  /**
   * A reusable function to update the state with a key/value pair where the
   * key is the name of the component and the value is its most recent value...
   *
   * This is a great pattern to use if you need to make the UI react to the input
   * in more complex forms and if you need the most recent value of the users'
   * submission before they click submit for validation purposes...
   * @param name
   * @param value
   */
  const updateInput = ({ target: { name, value } }) => {
    setAnimalInfo(prevState => ({ ...prevState, [name]: value }));
  };

  if (redirectToAnimals) {
    return <Redirect to="/dashboard/colony" />;
  } else if (redirectToColonies) {
    return <Redirect to="/dashboard" />;
  } else if (redirectToLogin) {
    logout();
    return <Redirect to="/" />;
  }

  return (
    <div>
      <div className={classes.root} style={{ textAlign: 'left' }}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link color="inherit" onClick={() => setRedirectToLogin(true)}>
            Logout
          </Link>
          <Link color="inherit" onClick={() => setRedirectToColonies(true)}>
            Colonies
          </Link>
          <Link color="inherit" onClick={() => setRedirectToAnimals(true)}>
            {colonyName}
          </Link>
        </Breadcrumbs>
      </div>

      <Container component="main">
        <CssBaseline />
        <div className={classesTwo.paper}>
          <Typography component="h1" variant="h5">
            Add Animal to {colonyName}
          </Typography>

          <Card className={classesTwo.root}>
            <CardContent className={classes.form}>
            <form className={classes.form} noValidate>
                <div className={classesGrid.root}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <div className={classesGrid.paper}>
                        <TextField
                          name="mouseId"
                          variant="outlined"
                          size="small"
                          margin="normal"
                          label="ID"
                          onChange={updateInput}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <div className={classesGrid.paper}>
                        <TextField
                          name="gender"
                          variant="outlined"
                          size="small"
                          margin="normal"
                          label="Gender"
                          onChange={updateInput}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <div className={classesGrid.paper}>
                        <TextField
                          name="tod"
                          variant="outlined"
                          size="small"
                          margin="normal"
                          label="TOD"
                          onChange={updateInput}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <div className={classesGrid.paper}>
                        <TextField
                          name="dobMonth"
                          variant="outlined"
                          size="small"
                          margin="normal"
                          label="Birth month"
                          onChange={updateInput}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <div className={classesGrid.paper}>
                        <TextField
                          name="dobDay"
                          variant="outlined"
                          size="small"
                          margin="normal"
                          label="Birth day"
                          onChange={updateInput}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <div className={classesGrid.paper}>
                        <TextField
                          name="dobYear"
                          variant="outlined"
                          size="small"
                          margin="normal"
                          label="Birth year"
                          onChange={updateInput}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <div className={classesGrid.paper}>
                        <TextField
                          name="dodMonth"
                          variant="outlined"
                          size="small"
                          margin="normal"
                          label="Death month"
                          onChange={updateInput}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <div className={classesGrid.paper}>
                        <TextField
                          name="dodDay"
                          variant="outlined"
                          size="small"
                          margin="normal"
                          label="Death day"
                          onChange={updateInput}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <div className={classesGrid.paper}>
                        <TextField
                          name="dodYear"
                          variant="outlined"
                          size="small"
                          margin="normal"
                          label="Death year"
                          onChange={updateInput}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <div className={classesGrid.paper}>
                        <TextField
                          name="litter"
                          variant="outlined"
                          size="small"
                          margin="normal"
                          label="Litter"
                          onChange={updateInput}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <div className={classesGrid.paper}>
                        <TextField
                          name="fatherId"
                          variant="outlined"
                          size="small"
                          margin="normal"
                          label="Father ID"
                          onChange={updateInput}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <div className={classesGrid.paper}>
                        <TextField
                          name="motherId"
                          variant="outlined"
                          size="small"
                          margin="normal"
                          label="Mother ID"
                          onChange={updateInput}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <div className={classesGrid.paper}>
                        <TextField
                          name="gene1"
                          variant="outlined"
                          size="small"
                          margin="normal"
                          label="Gene 1"
                          onChange={updateInput}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <div className={classesGrid.paper}>
                        <TextField
                          name="gene2"
                          variant="outlined"
                          size="small"
                          margin="normal"
                          label="Gene 2"
                          onChange={updateInput}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <div className={classesGrid.paper}>
                        <TextField
                          name="gene3"
                          variant="outlined"
                          size="small"
                          margin="normal"
                          label="Gene 3"
                          onChange={updateInput}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={attemptAddAnimal}
            >
              Add Animal
            </Button>
            <Button
              onClick={() => {
                setRedirectToAnimals(true);
              }}
              variant="outlined"
              color="primary"
            >Back
            </Button>
          </form>
          </CardContent>
          </Card>
        </div>
      </Container >
    </div>
  );
};

export default AddAnimal;
