import React, { useState, useEffect } from 'react';
import ColoniesTable from 'components/ColoniesTable';
import SharedColoniesTable from 'components/SharedColoniesTable';
import { useProfileProvider } from 'contexts/profile';
import PropTypes from 'prop-types';
import { AppBar, Button, Box, TextField, Container, CssBaseline, Menu, MenuItem, Tabs, Tab, Typography } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Add from '@material-ui/icons/Add';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

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

const tabStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const Colonies = () => {
  const { addColony, sortList, sortAlpha, state: { ownedColonies, sharedColonies } } = useProfileProvider();
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('');
  const [addDialog, setAddDialogOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [tab, setTab] = React.useState(0);
  const tabClasses = tabStyle();

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    console.log("OWNED LIST: ", ownedColonies);
    console.log("SHARED LIST: ", sharedColonies);
  });

  const openAddDialog = () => {
    setAddDialogOpen(true);
  };

  const closeAddDialog = () => {
    setAddDialogOpen(false);
  };

  /* Uploading File. */
  const chooseFile = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    const reader = new FileReader();

    if (file != null && file.size > 0) {
      reader.readAsText(file);
    }
    else {
      alert("Please input a file!");
    }

    let check = true;

    reader.onload = async () => {
      const load = reader.result;
      const data = { payload: load, name: fileName };
      if (!isBlank(fileName.trim())) {
        await addColony(data);
      }
      else {
        check = false;
        alert("Name can not be blank or just spaces!");
      }
    };

    reader.onerror = () => {
      console.log(reader.onerror);
    };

    if (check) {
      closeAddDialog();
    }
  };

  const isBlank = function (input) {
    if (input.length === 0) {
      return true;
    }
    return false;
  }
  /**
 * Updates input for file name.
 *
 * @param name
 * @param value
 */
  const updateInputFileName = ({ target: { value } }) => {
    setFileName(value);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSort = (key) => {
    sortList(key);
    handleClose();
  };

  const handleAlpha = (key) => {
    sortAlpha(key);
    handleClose();
  }

  return (
    <Container component="main">
      <CssBaseline />
      <h1>Your Colonies</h1>

      <div className={tabClasses.root}>
        <AppBar position="static">
          <Tabs value={tab} onChange={handleTabChange} aria-label="simple tabs example">
            <Tab label="Your Colonies" {...a11yProps(0)} />
            <Tab label="Shared Colonies" {...a11yProps(1)} />
          </Tabs>
        </AppBar>

        <TabPanel value={tab} index={0}>
          <div className="uploadFile" style={{ textAlign: 'right' }}>
            <Button variant="outlined" color="primary" onClick={() => {
              handleAlpha("colonyName");
            }}>
              Sort by Name
            </Button>
            <Button variant="outlined" color="primary" onClick={() => {
              handleSort("size");
            }}>
              Sort by Size
            </Button>
            <Button variant="outlined" color="primary" startIcon={<Add />} onClick={openAddDialog}>
              Add Colony
            </Button>
            <Dialog open={addDialog} onClose={closeAddDialog} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Add Colony</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Upload an animal colony along with its name.
                    </DialogContentText>
                <input type="file" name="file" onChange={chooseFile} />
                <div>
                  <TextField variant="outlined" margin="dense" size="small" name="colonyName" label="Colony Name" onChange={updateInputFileName} />
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={uploadFile} variant="outlined" color="default" startIcon={<CloudUploadIcon />}>Upload</Button>
              </DialogActions>
            </Dialog>
          </div>
          <ColoniesTable />
        </TabPanel>

        <TabPanel value={tab} index={1}>
          <div className="uploadFile" style={{ textAlign: 'right' }}>
            <Button variant="outlined" color="primary" onClick={() => {
              handleAlpha("colonyName");
            }}>
              Sort by Name
            </Button>
            <Button variant="outlined" color="primary" onClick={() => {
              handleSort("size");
            }}>
              Sort by Size
            </Button>
            <Dialog open={addDialog} onClose={closeAddDialog} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Add Colony</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Upload an animal colony along with its name.
                    </DialogContentText>
                <input type="file" name="file" onChange={chooseFile} />
                <div>
                  <TextField variant="outlined" margin="dense" size="small" name="colonyName" label="Colony Name" onChange={updateInputFileName} />
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={uploadFile} variant="outlined" color="default" startIcon={<CloudUploadIcon />}>Upload</Button>
              </DialogActions>
            </Dialog>
          </div>
          <SharedColoniesTable />
        </TabPanel>
      </div>
    </Container >
  );
};

export default Colonies;
