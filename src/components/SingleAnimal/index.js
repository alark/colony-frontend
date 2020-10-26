import Gallery from "react-photo-gallery";
// import ImageGallery from 'react-image-gallery';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
// import { render } from "react-dom";
import { AppBar, Box, Breadcrumbs, Button, Card, CardActions, CardActionArea, CardContent, CardMedia, Checkbox, Container, CssBaseline, Divider, Grid, FormControl, IconButton, Input, InputLabel, Link, List, ListItem, ListItemText, MenuItem, Select, Snackbar, Tab, Tabs, TextField, Typography } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useProfileProvider } from 'contexts/profile';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Uploader from 'components/ImageUpload';
import Modal from '@material-ui/core/Modal';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { ClassSharp } from "@material-ui/icons";

const { getList } = require('components/Tags/index');



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  primary: {
    color: 'black',
  }
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
  notes: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: 500,
  },
  gridListTile: {

  },
  modal: {
    position: 'absolute',
    width: 600,
    height: 'auto',
    // backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: 'auto',
  },
}));

const useStylesTag = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 500,
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

//formatting for the tag box
const ITEM_HEIGHT = 75;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(tag, tagList, theme) {
  if(tag === undefined){
    return;
  }
  return {
    fontWeight:
      tagList.indexOf(tag) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const defaultTags = getList().sort();

const SingleAnimal = (props) => {
  const classes = useStyles();
  const classesTwo = useStyles2();
  const classesGrid = gridStyles();
  const themeTag = useTheme();
  const classesTag = useStylesTag();

  const {
    logout, editAnimal, storeNote, storeEvent, addNewToTag, state,
  } = useProfileProvider();
  const { accessRights } = state;
  const currentAnimal = props.location.state.animal;
  const [redirectToAnimals, setRedirectToAnimals] = useState(false);
  const [redirectToColonies, setRedirectToColonies] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const { colonyName, colonyId } = state;
  const [notes, setNotes] = useState('');
  const [event, setEvent] = useState('');
  const [date, setDate] = useState('');
  const [open, setOpen] = React.useState(false);
  const [notesOpen, setNotesOpen] = React.useState(false);
  const [eventOpen, setEventOpen] = React.useState(false);
  const [selectedTags, setselectedTags] = React.useState([]);
  const [selectedImage, setselectedImage] = React.useState(null);
  const [openModal, setModalOpen] = React.useState(false);

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
  const [tagList, setTagList] = React.useState([]);
  const [isDefault, setDefault] = useState(false);
  const [tab, setTab] = React.useState(0);
  const [currentImage, setCurrentImage] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  currentAnimal.imageLinks
    .splice(0, currentAnimal.imageLinks.length, ...(new Set(currentAnimal.imageLinks)));

  const animalNotes = currentAnimal.notes.filter((item, index) => currentAnimal.notes.indexOf(item) === index);

  const animalEvents = currentAnimal.events.filter((item, index) => currentAnimal.events.indexOf(item) === index);

  const BasicRows = () => <Gallery photos={currentAnimal.imageLinks} />;

  animalNotes.sort((a, b) => {
    return b.timestamp - a.timestamp;
  });

  animalEvents.sort((a, b) => {
    return b.timestamp - a.timestamp;
  });

  const handleTagChange = (event) => {
    setselectedTags(event.target.value);
  }

  const addTagToAnimal = (newTags) => {  
      if(typeof currentAnimal.tags !== "object"){
        currentAnimal.tags = [];
      }  
      newTags.forEach(function(item){
        if(typeof currentAnimal.tags === "object" && !currentAnimal.tags.includes(item)){
          currentAnimal.tags.push(item);
        }
      });  

      setTagList(currentAnimal.tags);
    }

  const defaultTraits = (id, gen, litt, mo, da, yr, deathMo, deathDa, deathYr, fth, mth, gn1, gn2, gn3, tod, tags) => {
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

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleNotesClick = () => {
    setNotesOpen(true);
  };

  const handleNotesClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotesOpen(false);
  };

  const handleEventClick = () => {
    setEventOpen(true);
  };

  const handleEventClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setEventOpen(false);
  };

  const handleNextImage = () => {
    const index = currentImage + 1;
    if (index < currentAnimal.imageLinks.length) {
      setCurrentImage(index);
    }
  }

  const handlePreviousImage = () => {
    const index = currentImage - 1;
    if (index >= 0) {
      setCurrentImage(index);
    }
  }

  const handleModalOpen = () => {
    console.log("handlemodalopen: selectedimg", selectedImage);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    console.log("handlemodalclose");
    setModalOpen(false);
  };

  const handleModal = () => {
    console.log("handlemodal");
  }

  const saveChanges = async (event) => {
    event.preventDefault();

    addTagToAnimal(selectedTags);

    const animal = {
      animalUUID: currentAnimal.animalUUID,
      mouseId: animalId,
      gender: gender,
      litter: litter,
      dobMonth: month,
      dobDay: day,
      dobYear: year,
      dodMonth: deathMonth,
      dodDay: deathDay,
      dodYear: deathYear,
      fatherId: father,
      motherId: mother,
      notes: animalNotes,
      events: animalEvents,
      gene1: gene1,
      gene2: gene2,
      gene3: gene3,
      imageLinks: currentAnimal.imageLinks,
      tod: tod,
      tags: currentAnimal.tags,
    };

    const request = { animal, colonyId };
    editAnimal(request);

    currentAnimal.tags.forEach(item => {
      const tagData = { tagName: item, mouse: currentAnimal.animalUUID};
      addNewToTag(tagData);
    });
    handleClick();
  };

  const defaultLink = 'https://d17fnq9dkz9hgj.cloudfront.net/uploads/2012/11/106564123-rats-mice-care-253x169.jpg';

  const avatarLink = currentAnimal.imageLinks.length !== 0 ? currentAnimal.imageLinks[0] : defaultLink;

  const onEventsAdded = (event) => {
    setEvent(event.target.value);
  }

  const onDateAdded = (date) => {
    setDate(date.target.value);
  }

  const onNotesAdded = (event) => {
    setNotes(event.target.value);
  };

  const onSaveNotes = () => {
    const note = { notes, timestamp: Date.now() };
    const myNotes = { colonyId, animalId: currentAnimal.animalUUID, note };
    storeNote(myNotes);
    handleNotesClick();
  };

  const onSaveEvent = () => {
    const currEvent = { event, timestamp: date };
    const myEvent = { colonyId, animalId: currentAnimal.animalUUID, eventInfo: currEvent };
    console.log(myEvent);
    storeEvent(myEvent);
    handleEventClick();
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
          defaultTraits(currentAnimal.mouseId, currentAnimal.gender, currentAnimal.litter, currentAnimal.dobMonth, currentAnimal.dobDay, currentAnimal.dobYear, currentAnimal.dodMonth, currentAnimal.dodDay, currentAnimal.dodYear, currentAnimal.fatherId, currentAnimal.motherId, currentAnimal.gene1, currentAnimal.gene2, currentAnimal.gene3, currentAnimal.tod, currentAnimal.tags)}
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
                {
                  accessRights ?
                    <div className={classesGrid.root}>
                      <Grid container>
                        <Grid item xs>
                          <div className={classesGrid.paper}>
                            <TextField
                              label="ID"
                              variant="outlined"
                              size="small"
                              margin="normal"
                              name="mouseId"
                              defaultValue={currentAnimal.mouseId}
                              onChange={event => setAnimalId(event.target.value)}
                            />
                          </div>
                        </Grid>
                        <Grid item xs>
                          <div className={classesGrid.paper}>
                            <TextField
                              label="Gender"
                              variant="outlined"
                              size="small"
                              margin="normal"
                              name="gender"
                              defaultValue={currentAnimal.gender}
                              onChange={event => setGender(event.target.value)}
                            />
                          </div>
                        </Grid>
                        <Grid item xs>
                          <div className={classesGrid.paper}>
                            <TextField
                              label="tod"
                              variant="outlined"
                              size="small"
                              margin="normal"
                              name="tod"
                              defaultValue={currentAnimal.tod}
                              onChange={event => setTod(event.target.value)}
                            />
                          </div>
                        </Grid>
                      </Grid>

                      <Grid container>
                        <Grid item xs>
                          <div className={classesGrid.paper}>
                            <TextField
                              label="Birth month"
                              variant="outlined"
                              size="small"
                              margin="normal"
                              name="dobMonth"
                              defaultValue={currentAnimal.dobMonth}
                              onChange={event => setMonth(event.target.value)}
                            />
                          </div>
                        </Grid>
                        <Grid item xs>
                          <div className={classesGrid.paper}>
                            <TextField
                              label="Birth day"
                              variant="outlined"
                              size="small"
                              margin="normal"
                              name="dobDay"
                              defaultValue={currentAnimal.dobDay}
                              onChange={event => setDay(event.target.value)}
                            />
                          </div>
                        </Grid>
                        <Grid item xs>
                          <div className={classesGrid.paper}>
                            <TextField
                              label="Birth year"
                              variant="outlined"
                              size="small"
                              margin="normal"
                              name="dobYear"
                              defaultValue={currentAnimal.dobYear}
                              onChange={event => setYear(event.target.value)}
                            />
                          </div>
                        </Grid>
                      </Grid>

                      <Grid container>
                        <Grid item xs>
                          <div className={classesGrid.paper}>
                            <TextField
                              label="Death month"
                              variant="outlined"
                              size="small"
                              margin="normal"
                              name="dodMonth"
                              defaultValue={currentAnimal.dodMonth}
                              onChange={event => setDeathMonth(event.target.value)}
                            />
                          </div>
                        </Grid>
                        <Grid item xs>
                          <div className={classesGrid.paper}>
                            <TextField
                              label="Death day"
                              variant="outlined"
                              size="small"
                              margin="normal"
                              name="dodDay"
                              defaultValue={currentAnimal.dodDay}
                              onChange={event => setDeathDay(event.target.value)}
                            />
                          </div>
                        </Grid>
                        <Grid item xs>
                          <div className={classesGrid.paper}>
                            <TextField
                              label="Death year"
                              variant="outlined"
                              size="small"
                              margin="normal"
                              name="dodYear"
                              defaultValue={currentAnimal.dodYear}
                              onChange={event => setDeathYear(event.target.value)}
                            />
                          </div>
                        </Grid>
                      </Grid>

                      <Grid container>
                        <Grid item xs>
                          <div className={classesGrid.paper}>
                            <TextField
                              label="Litter"
                              variant="outlined"
                              size="small"
                              margin="normal"
                              name="litter"
                              defaultValue={currentAnimal.litter}
                              onChange={event => setLitter(event.target.value)}
                            />
                          </div>
                        </Grid>
                        <Grid item xs>
                          <div className={classesGrid.paper}>
                            <TextField
                              label="Father ID"
                              variant="outlined"
                              size="small"
                              margin="normal"
                              name="fatherId"
                              defaultValue={currentAnimal.fatherId}
                              onChange={event => setFather(event.target.value)}
                            />
                          </div>
                        </Grid>
                        <Grid item xs>
                          <div className={classesGrid.paper}>
                            <TextField
                              label="Mother ID"
                              variant="outlined"
                              size="small"
                              margin="normal"
                              name="motherId"
                              defaultValue={currentAnimal.motherId}
                              onChange={event => setMother(event.target.value)}
                            />
                          </div>
                        </Grid>
                      </Grid>

                      <Grid container>
                        <Grid item xs>
                          <div className={classesGrid.paper}>
                            <TextField
                              label="Gene 1"
                              variant="outlined"
                              size="small"
                              margin="normal"
                              name="gene1"
                              defaultValue={currentAnimal.gene1}
                              onChange={event => setGene1(event.target.value)}
                            />
                          </div>
                        </Grid>
                        <Grid item xs>
                          <div className={classesGrid.paper}>
                            <TextField
                              label="Gene 2"
                              variant="outlined"
                              size="small"
                              margin="normal"
                              name="gene2"
                              defaultValue={currentAnimal.gene2}
                              onChange={event => setGene2(event.target.value)}
                            />
                          </div>
                        </Grid>
                        <Grid item xs>
                          <div className={classesGrid.paper}>
                            <TextField
                              label="Gene 3"
                              variant="outlined"
                              size="small"
                              margin="normal"
                              name="gene3"
                              defaultValue={currentAnimal.gene3}
                              onChange={event => setGene3(event.target.value)}
                            />
                          </div>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs>
                          <div>
                            <FormControl className={classesTag.formControl}>
                              <InputLabel
                                id="tag-label"
                              >Tags</InputLabel>
                              <Select
                                labelId="tag-label"
                                id="multiple-tag"
                                multiple  
                                value={selectedTags}
                                onChange={handleTagChange}
                                input={<Input id="select-multiple-tag"/>}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                              > 
                                {defaultTags.map((tag) => (
                                  <MenuItem key={tag} value={tag} style={getStyles(tag, selectedTags, themeTag)}>
                                    <Checkbox checked={selectedTags.indexOf(tag) > -1} />
                                    <ListItemText primary={tag} />
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </div>
                        </Grid>
                        <Grid item xs>
                          <div className={classesGrid.paper}>
                            <TextField
                              disabled
                              label="Tags"
                              variant="outlined"
                              size="small"
                              margin="normal"
                              name="currentTags"
                              defaultValue={currentAnimal.tags}
                            />
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                    :
                    <div className={classesGrid.root}>
                      <Grid container>
                        <Grid item xs>
                          <div className={classesGrid.paper}>
                            <TextField
                              disabled
                              label="ID"
                              variant="outlined"
                              size="small"
                              margin="normal"
                              name="mouseId"
                              defaultValue={currentAnimal.mouseId}
                              onChange={event => setAnimalId(event.target.value)}
                            />
                          </div>
                        </Grid>
                        <Grid item xs>
                          <div className={classesGrid.paper}>
                            <TextField
                              disabled
                              label="Gender"
                              variant="outlined"
                              size="small"
                              margin="normal"
                              name="gender"
                              defaultValue={currentAnimal.gender}
                              onChange={event => setGender(event.target.value)}
                            />
                          </div>
                        </Grid>
                        <Grid item xs>
                          <div className={classesGrid.paper}>
                            <TextField
                              disabled
                              label="tod"
                              variant="outlined"
                              size="small"
                              margin="normal"
                              name="tod"
                              defaultValue={currentAnimal.tod}
                              onChange={event => setTod(event.target.value)}
                            />
                          </div>
                        </Grid>
                      </Grid>

                      <Grid container>
                        <Grid item xs>
                          <div className={classesGrid.paper}>
                            <TextField
                              disabled
                              label="Birth month"
                              variant="outlined"
                              size="small"
                              margin="normal"
                              name="dobMonth"
                              defaultValue={currentAnimal.dobMonth}
                              onChange={event => setMonth(event.target.value)}
                            />
                          </div>
                        </Grid>
                        <Grid item xs>
                          <div className={classesGrid.paper}>
                            <TextField
                              disabled
                              label="Birth day"
                              variant="outlined"
                              size="small"
                              margin="normal"
                              name="dobDay"
                              defaultValue={currentAnimal.dobDay}
                              onChange={event => setDay(event.target.value)}
                            />
                          </div>
                        </Grid>
                        <Grid item xs>
                          <div className={classesGrid.paper}>
                            <TextField
                              disabled
                              label="Birth year"
                              variant="outlined"
                              size="small"
                              margin="normal"
                              name="dobYear"
                              defaultValue={currentAnimal.dobYear}
                              onChange={event => setYear(event.target.value)}
                            />
                          </div>
                        </Grid>
                      </Grid>

                      <Grid container>
                        <Grid item xs>
                          <div className={classesGrid.paper}>
                            <TextField
                              disabled
                              label="Death month"
                              variant="outlined"
                              size="small"
                              margin="normal"
                              name="dodMonth"
                              defaultValue={currentAnimal.dodMonth}
                              onChange={event => setDeathMonth(event.target.value)}
                            />
                          </div>
                        </Grid>
                        <Grid item xs>
                          <div className={classesGrid.paper}>
                            <TextField
                              disabled
                              label="Death day"
                              variant="outlined"
                              size="small"
                              margin="normal"
                              name="dodDay"
                              defaultValue={currentAnimal.dodDay}
                              onChange={event => setDeathDay(event.target.value)}
                            />
                          </div>
                        </Grid>
                        <Grid item xs>
                          <div className={classesGrid.paper}>
                            <TextField
                              disabled
                              label="Death year"
                              variant="outlined"
                              size="small"
                              margin="normal"
                              name="dodYear"
                              defaultValue={currentAnimal.dodYear}
                              onChange={event => setDeathYear(event.target.value)}
                            />
                          </div>
                        </Grid>
                      </Grid>

                      <Grid container>
                        <Grid item xs>
                          <div className={classesGrid.paper}>
                            <TextField
                              disabled
                              label="Litter"
                              variant="outlined"
                              size="small"
                              margin="normal"
                              name="litter"
                              defaultValue={currentAnimal.litter}
                              onChange={event => setLitter(event.target.value)}
                            />
                          </div>
                        </Grid>
                        <Grid item xs>
                          <div className={classesGrid.paper}>
                            <TextField
                              disabled
                              label="Father ID"
                              variant="outlined"
                              size="small"
                              margin="normal"
                              name="fatherId"
                              defaultValue={currentAnimal.fatherId}
                              onChange={event => setFather(event.target.value)}
                            />
                          </div>
                        </Grid>
                        <Grid item xs>
                          <div className={classesGrid.paper}>
                            <TextField
                              disabled
                              label="Mother ID"
                              variant="outlined"
                              size="small"
                              margin="normal"
                              name="motherId"
                              defaultValue={currentAnimal.motherId}
                              onChange={event => setMother(event.target.value)}
                            />
                          </div>
                        </Grid>
                      </Grid>

                      <Grid container>
                        <Grid item xs>
                          <div className={classesGrid.paper}>
                            <TextField
                              disabled
                              label="Gene 1"
                              variant="outlined"
                              size="small"
                              margin="normal"
                              name="gene1"
                              defaultValue={currentAnimal.gene1}
                              onChange={event => setGene1(event.target.value)}
                            />
                          </div>
                        </Grid>
                        <Grid item xs>
                          <div className={classesGrid.paper}>
                            <TextField
                              disabled
                              label="Gene 2"
                              variant="outlined"
                              size="small"
                              margin="normal"
                              name="gene2"
                              defaultValue={currentAnimal.gene2}
                              onChange={event => setGene2(event.target.value)}
                            />
                          </div>
                        </Grid>
                        <Grid item xs>
                          <div className={classesGrid.paper}>
                            <TextField
                              disabled
                              label="Gene 3"
                              variant="outlined"
                              size="small"
                              margin="normal"
                              name="gene3"
                              defaultValue={currentAnimal.gene3}
                              onChange={event => setGene3(event.target.value)}
                            />
                          </div>
                        </Grid>
                      </Grid>

                      <Grid container>
                        <Grid item xs>
                        <div>
                            <FormControl className={classesTag.formControl}>
                              <InputLabel id="tag-label">Tags</InputLabel>
                              <Select
                                disabled
                                labelId="tag-label"
                                id="multiple-tag"
                                multiple
                                value={selectedTags}
                                onChange={handleTagChange}
                                input={<Input id="select-multiple-tag" />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                              >
                                {defaultTags.map((tag) => (
                                  <MenuItem key={tag} value={tag} style={getStyles(tag, selectedTags, themeTag)}>
                                    <Checkbox checked={selectedTags.indexOf(tag) > -1} />
                                    <ListItemText primary={tag} />
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </div>
                        </Grid>
                        <Grid item xs>
                          <div className={classesGrid.paper}>
                            <TextField
                              disabled
                              label="currentTags"
                              variant="outlined"
                              size="small"
                              margin="normal"
                              name="currentTags"
                              defaultValue={currentAnimal.tags}
                            />
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                }
              </form>

              <div className={classesTwo.controls}>
                
                {
                  accessRights ?
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={saveChanges}
                    >Save Changes
                    </Button>
                    : null
                }
                <Button
                  onClick={() => {
                    setRedirectToAnimals(true);
                  }}
                  variant="outlined"
                  color="primary"
                >Back
                </Button>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="success">
                    Changes saved successfully!
                  </Alert>
                </Snackbar>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className={classesTwo.paper} style={{ flexDirection: 'column' }}>
          <AppBar position="static" style={{ background: 'white' }}>
            <Tabs value={tab} onChange={handleTabChange} aria-label="simple tabs example">
              <Tab label={<span style={{ color: 'black' }}>Notes</span>} {...a11yProps(0)} />
              <Tab label={<span style={{ color: 'black' }}>Gallery</span>} {...a11yProps(1)} />
              <Tab label={<span style={{ color: 'black' }}>Events</span>} {...a11yProps(2)} />
            </Tabs>

            <TabPanel value={tab} index={0}>
              <div>
                <TextField
                  id="filled-full-width"
                  label="Notes"
                  style={{ margin: 8 }}
                  className={classesTwo.textField}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  onChange={onNotesAdded}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Button variant="contained" color="primary" onClick={onSaveNotes}>
                  Save Notes
                  </Button>
                <Snackbar open={notesOpen} autoHideDuration={6000} onClose={handleNotesClose}>
                  <Alert onClose={handleNotesClose} severity="success">
                    Notes saved successfully!
                  </Alert>
                </Snackbar>
              </div>

              <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders">
                  {
                    animalNotes.map((note, index) => (
                      <div key={index}>
                        <ListItem button>
                          <ListItemText
                            primary={<Typography color="textPrimary">{note.notes}</Typography>}
                            secondary={convertTimeStamp(note.timestamp)}
                          />
                        </ListItem>
                        <Divider />
                      </div>
                    ))
                  }
                </List>
              </div>
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <Uploader animalId={currentAnimal.animalUUID} />
              {
                <div className={classesTwo.root}>
                <GridList cellHeight={200} className={classesTwo.gridList} cols={8}>
                  {currentAnimal.imageLinks.map((link) => (
                    <GridListTile className={classesTwo.gridListTile} key={link} rows={0.5} cols={1}
                      onClick={() => {
                        setselectedImage(link) 
                        handleModalOpen()
                      }}
                    >
                      {/* () => setselectedImage(link) */}
                      <img src={link} alt={"image"} />
                    </GridListTile>
                  ))}
                </GridList>
                 <Modal
                  className={classesTwo.modal}
                  open={openModal}
                  onClose={handleModalClose}
                  
                >
                  <div 
                    position='absolute'
                    width='100%'
                    height='100%'
                  >
                    <img
                      // position='relative'
                      margin-left='auto'
                      margin-right='auto'
                      width='600'
                      height='auto'
                      display='block'
                      
                      src={selectedImage}
                      alt={"image"}
                    />
                  </div>
                </Modal>
                </div>

                // currentAnimal.imageLinks.length > 0 ?
                // <Card className={classesTwo.root}>
                //   <CardActionArea>
                //     <CardMedia style={{ align: 'center' }}>
                //       <img src={currentAnimal.imageLinks[currentImage]} alt={currentImage} style={{ display:'block', marginLeft:'auto', marginRight: 'auto', width: '50%', height: '50%' }} />
                //     </CardMedia>
                //     <CardActions>
                //       <IconButton aria-label="prev" onClick={handlePreviousImage}><NavigateBeforeIcon /></IconButton>
                //       <IconButton aria-label="next" onClick={handleNextImage}><NavigateNextIcon /></IconButton>
                //       {currentImage+1} / {currentAnimal.imageLinks.length}
                //     </CardActions>
                //   </CardActionArea>
                // </Card> : null
              }
            </TabPanel>
            <TabPanel value={tab} index={2}>
              <div>
                <TextField
                    id="filled-full-width"
                    label="Event Info"
                    style={{ margin: 8 }}
                    className={classesTwo.textField}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={onEventsAdded}
                    InputLabelProps={{
                      shrink: true,
                    }}
                />

                <input type="date" id="event-time"
                  name="meeting-time" 
                  onChange={onDateAdded}
                />

                <Button variant="contained" color="primary" onClick={onSaveEvent}>
                  Save Event
                  </Button>
                <Snackbar open={eventOpen} autoHideDuration={6000} onClose={handleEventClose}>
                  <Alert onClose={handleEventClose} severity="success">
                    Event saved successfully!
                  </Alert>
                </Snackbar>
              </div>

              <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders">
                  {
                    animalEvents.map((event, index) => (
                      <div key={index}>
                        <ListItem button>
                          <ListItemText
                            primary={<Typography color="textPrimary">{event.event}</Typography>}
                            secondary={convertTimeStamp(event.timestamp)}
                          />
                        </ListItem>
                        <Divider />
                      </div>
                    ))
                  }
                </List>
              </div>
            </TabPanel>
          </AppBar>
        </div>
      </Container>
    </div>
  );
};

export default SingleAnimal;