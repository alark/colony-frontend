import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, List, ListItem, ListItemText, Grid, Breadcrumbs, Link, Container, CssBaseline, Divider } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useProfileProvider } from 'contexts/profile';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Uploader from 'components/ImageUpload';


const useStyles = makeStyles(theme => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
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
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  notes: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const SingleAnimal = (props) => {
  const classes = useStyles();
  const classesTwo = useStyles2();
  const {
    logout, editAnimal, storeNote, state,
  } = useProfileProvider();
  const currentAnimal = props.location.state.animal;
  const [redirectToAnimals, setRedirectToAnimals] = useState(false);
  const [redirectToColonies, setRedirectToColonies] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const { colonyName, colonyId } = state;
  const [notes, setNotes] = useState('');

  /** Traits */
  const [animalId, setAnimalId] = useState('');
  const [gender, setGender] = useState('');
  const [litter, setLitter] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [deathMonth, setDeathMonth] = useState('');
  const [deathDay, setDeathDay] = useState('');
  const [deathYear, setDeathYear] = useState('');
  const [father, setFather] = useState('');
  const [mother, setMother] = useState('');
  const [gene1, setGene1] = useState('');
  const [gene2, setGene2] = useState('');
  const [gene3, setGene3] = useState('');
  const [tod, setTod] = useState('');
  const [isDefault, setDefault] = useState(false);

  currentAnimal.imageLinks
    .splice(0, currentAnimal.imageLinks.length, ...(new Set(currentAnimal.imageLinks)));

  const animalNotes = currentAnimal.notes
    .filter((item, index) => currentAnimal.notes.indexOf(item) === index);

  animalNotes.sort((a, b) => {
    return b.timestamp - a.timestamp;
  });

  console.log('Current animal', currentAnimal);

  const defaultTraits = (id, gen, litt, mo, da, yr, deathMo, deathDa, deathYr, fth, mth, gn1, gn2, gn3, tod) => {
    setAnimalId(id);
    setGender(gen);
    setLitter(litt);
    setMonth(mo);
    setDay(da);
    setYear(yr);
    setDeathMonth(deathMo);
    setDeathDay(deathDa);
    setDeathYear(deathYr);
    setFather(fth);
    setMother(mth);
    setGene1(gn1);
    setGene2(gn2);
    setGene3(gn3);
    setTod(tod);
    setDefault(true);
  };

  const saveChanges = async (event) => {
    event.preventDefault();
    const animal = {
      animalUUID: currentAnimal.animalUUID,
      mouseId: animalId,
      gender,
      litter,
      dobMonth: month,
      dobDay: day,
      dobYear: year,
      dodMonth: deathMonth,
      dodDay: deathDay,
      dodYear: deathYear,
      fatherId: father,
      motherId: mother,
      gene1,
      gene2,
      gene3,
      imageLinks: currentAnimal.imageLinks,
      tod,
    };
    const request = { animal, colonyId };
    editAnimal(request);
  };

  const defaultLink = 'https://d17fnq9dkz9hgj.cloudfront.net/uploads/2012/11/106564123-rats-mice-care-253x169.jpg';

  const avatarLink = currentAnimal.imageLinks.length !== 0 ? currentAnimal.imageLinks[0] : defaultLink;

  const onNotesAdded = (event) => {
    setNotes(event.target.value);
  };

  const onSaveNotes = () => {
    const note = { notes, timestamp: Date.now() };
    const myNotes = { colonyId, animalId: currentAnimal.animalUUID, note };
    storeNote(myNotes);
  };

  const convertTimeStamp = timestamp => (new Date(timestamp)).toLocaleString();


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
      {
        isDefault ?
          null :
          defaultTraits(currentAnimal.mouseId, currentAnimal.gender, currentAnimal.litter, currentAnimal.dobMonth, currentAnimal.dobDay, currentAnimal.dobYear, currentAnimal.dodMonth, currentAnimal.dodDay, currentAnimal.dodYear, currentAnimal.fatherId, currentAnimal.motherId, currentAnimal.gene1, currentAnimal.gene2, currentAnimal.gene3, currentAnimal.tod)}
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
          <Link
            color="textPrimary"
            aria-current="page"
          >
            {currentAnimal.mouseId}
          </Link>
        </Breadcrumbs>
      </div>
      <Container component="main">
        <CssBaseline />
        <div className={classesTwo.paper}>
          <Card className={classesTwo.root}>
            <CardMedia
              className={classesTwo.cover}
              image={avatarLink}
              title="Rat"
            />

            <CardContent className={classes.form}>
              <form className={classes.form} noValidate>
                <Grid container>
                  <Grid item>
                    <Typography variant="subtitle1" color="textSecondary">
                      <strong>ID:</strong>
                    </Typography>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      name="mouseId"
                      defaultValue={currentAnimal.mouseId}
                      onChange={event => setAnimalId(event.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" color="textSecondary">
                      <strong>Gender:</strong>
                    </Typography>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      name="gender"
                      defaultValue={currentAnimal.gender}
                      onChange={event => setGender(event.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" color="textSecondary">
                      <strong>tod:</strong>
                    </Typography>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      name="gene3"
                      defaultValue={currentAnimal.tod}
                      onChange={event => setTod(event.target.value)}
                    />
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item>
                    <Typography variant="subtitle1" color="textSecondary">
                      <strong>Date of birth month:</strong>
                    </Typography>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      name="dobMonth"
                      defaultValue={currentAnimal.dobMonth}
                      onChange={event => setMonth(event.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" color="textSecondary">
                      <strong>Date of birth day:</strong>
                    </Typography>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      name="dobDay"
                      defaultValue={currentAnimal.dobDay}
                      onChange={event => setDay(event.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" color="textSecondary">
                      <strong>Date of birth year:</strong>
                    </Typography>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      name="dobYear"
                      defaultValue={currentAnimal.dobYear}
                      onChange={event => setYear(event.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item>
                    <Typography variant="subtitle1" color="textSecondary">
                      <strong>Date of death month:</strong>
                    </Typography>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      name="dodMonth"
                      defaultValue={currentAnimal.dodMonth}
                      onChange={event => setDeathMonth(event.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" color="textSecondary">
                      <strong>Date of death day:</strong>
                    </Typography>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      name="dodDay"
                      defaultValue={currentAnimal.dodDay}
                      onChange={event => setDeathDay(event.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" color="textSecondary">
                      <strong>Date of death year:</strong>
                    </Typography>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      name="dodYear"
                      defaultValue={currentAnimal.dodYear}
                      onChange={event => setDeathYear(event.target.value)}
                    />
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item>
                    <Typography variant="subtitle1" color="textSecondary">
                      <strong>Litter:</strong>
                    </Typography>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      name="litter"
                      type="litter"
                      defaultValue={currentAnimal.litter}
                      onChange={event => setLitter(event.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" color="textSecondary">
                      <strong>Father ID:</strong>
                    </Typography>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      name="fatherId"
                      defaultValue={currentAnimal.fatherId}
                      onChange={event => setFather(event.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" color="textSecondary">
                      <strong>Mother ID:</strong>
                    </Typography>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      name="motherId"
                      defaultValue={currentAnimal.motherId}
                      onChange={event => setMother(event.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item>
                    <Typography variant="subtitle1" color="textSecondary">
                      <strong>Gene 1:</strong>
                    </Typography>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      name="gene1"
                      type="gene1"
                      defaultValue={currentAnimal.gene1}
                      onChange={event => setGene1(event.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" color="textSecondary">
                      <strong>Gene 2:</strong>
                    </Typography>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      name="gene2"
                      defaultValue={currentAnimal.gene2}
                      onChange={event => setGene2(event.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" color="textSecondary">
                      <strong>Gene 3:</strong>
                    </Typography>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      name="gene3"
                      defaultValue={currentAnimal.gene3}
                      onChange={event => setGene3(event.target.value)}
                    />
                  </Grid>
                </Grid>
              </form>

              <div className={classesTwo.controls}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={saveChanges}
                >Save Changes
                </Button>
                <Button
                  onClick={() => {
                    setRedirectToAnimals(true);
                  }}
                  variant="outlined"
                  color="primary"
                >Back
                </Button>
              </div>
            </CardContent>

          </Card>

          <div className={classesTwo.details} style={{ flexDirection: 'column' }}>
            <div>
              <TextField
                id="filled-full-width"
                label="Notes"
                placeholder="Type your notes here"
                style={{ margin: 8 }}
                className={classesTwo.textField}
                fullWidth
                // onChange={onNotesAdded}
                margin="normal"
                variant="outlined"
                onChange={onNotesAdded}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className={classesTwo.controls} style={{ paddingRight: 0 }}>

              <Button variant="contained" color="primary" onClick={onSaveNotes}>
                Save Note
              </Button>

            </div>
            <Uploader animalId={currentAnimal.animalUUID} />
          </div>

          <div className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">
              {
              animalNotes.map((note, index) => (
                <div key={index}>
                  <ListItem button>
                    <ListItemText
                      primary={note.notes}
                      secondary={convertTimeStamp(note.timestamp)}
                    />
                  </ListItem>
                  <Divider />
                </div>
              ))
            }

            </List>
          </div>
          {
            currentAnimal.imageLinks.map((link, index) => (
              <img src={link} key={index} />
            ))
          }
        </div>
      </Container>
    </div>
  );
};

export default SingleAnimal;
