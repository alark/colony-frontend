import React, { useState } from 'react';
import { useProfileProvider } from 'contexts/profile';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar, Button, Box, TextField, Container, CssBaseline, Menu, MenuItem, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableRow, Typography, Paper } from '@material-ui/core';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Share from '@material-ui/icons/Share';
import Add from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
import DraftsIcon from '@material-ui/icons/Drafts';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import { useEffect } from 'react';

const paginationStyle = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

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

function TablePaginationActions(props) {
  const classes = paginationStyle();
  const theme = useTheme();
  const {
    count, page, rowsPerPage, onChangePage,
  } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (

    <div className={classes.root}>

      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

const tableStyle = makeStyles({
  table: {
    width: '100%',
    minWidth: 500,
    marginTop: 8,
  },
});

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
  const { addColony, deleteColony, shareColony, getAnimals, sortList, sortAlpha, state: { ownedColonies, sharedColonies } } = useProfileProvider();
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('');
  const classes = tableStyle();
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [redirectToAnimals, setRedirectToAnimals] = useState(false);
  const [addDialog, setAddDialogOpen] = React.useState(false);
  const [shareDialog, setShareDialogOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [shareOpen, setShareOpen] = React.useState(false);
  const [sharedUser, setSharedUserEmail] = useState('');
  const tabClasses = tabStyle();
  const [tab, setTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    setPage(0);
  };

  useEffect(() => {
    console.log("LATEST LIST: ", ownedColonies);
  });

  const openAddDialog = () => {
    setAddDialogOpen(true);
  };

  const closeAddDialog = () => {
    setAddDialogOpen(false);
  };

  const openShareDialog = () => {
    setShareDialogOpen(true);
  };

  const closeShareDialog = () => {
    setShareDialogOpen(false);
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
        const colonies = await addColony(data);
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
      closeShareDialog();
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

  const updateInputSharedUser = ({ target: { value } }) => {
    setSharedUserEmail(value);
  }

  const share = (colonyId) => {
    const data = { email: sharedUser, colonyId: colonyId };
    shareColony(data);
  }

  /* Pagination handler */
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, ownedColonies.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    setPage(newPage);
  };

  const handleCellClick = async (colonyId, colonySize, rowsPerPage, page) => {
    const request = {
      colonyId, colonySize, rowsPerPage, page,
    };

    await getAnimals(request);
    setRedirectToAnimals(true);
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

  if (redirectToAnimals) {
    return <Redirect to="/dashboard/colony" />;
  }

  return (
    <Container component="main">
      <CssBaseline />
      <h1>Your Colonies</h1>

      <div className={classes.root}>
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

        <AppBar position="static">
          <Tabs value={tab} onChange={handleTabChange} aria-label="simple tabs example">
            <Tab label="Your Colonies" {...a11yProps(0)} />
            <Tab label="Shared Colonies" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
          <TableContainer className={classes.table} component={Paper}>
            <Table className={classes.table} aria-label="custom pagination table">
              <TableBody>
                {(rowsPerPage > 0
                  ? ownedColonies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : ownedColonies
                ).map(colony => (
                  <TableRow key={colony.colonyId}>
                    <TableCell
                      style={{ cursor: 'pointer' }}
                      component="th"
                      scope="row"
                      onClick={async () => await handleCellClick(colony.colonyId, colony.size, rowsPerPage, page)}
                    >
                      <div style={{ fontWeight: 'bold', fontSize: 18 }}>{colony.colonyName}</div>
                      <p style={{ color: '#333333' }}>Size: {colony.size}</p>
                    </TableCell>
                    <TableCell align="right">
                      <Button variant="contained" color="primary" startIcon={<Share />} onClick={openShareDialog}>Share</Button>
                      <Dialog open={shareDialog} onClose={closeShareDialog} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Share with others</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Share animal colony with another user.
                              </DialogContentText>
                          <div>
                            <TextField variant="outlined" margin="dense" size="small" name="email" label="Person to share" onChange={updateInputSharedUser} />
                          </div>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={() => share(colony.colonyId)} variant="outlined" color="default">Share</Button>
                        </DialogActions>
                      </Dialog>
                      <Button variant="outlined" color="primary" onClick={() => {
                        deleteColony(colony.colonyId);
                      }}>
                        Delete Colony
                          </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[]}
                    colSpan={3}
                    count={ownedColonies.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { 'aria-label': 'rows per page' },
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
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

        <AppBar position="static">
          <Tabs value={tab} onChange={handleTabChange} aria-label="simple tabs example">
            <Tab label="Your Colonies" {...a11yProps(0)} />
            <Tab label="Shared Colonies" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
          <TableContainer className={classes.table} component={Paper}>
            <Table className={classes.table} aria-label="custom pagination table">
              <TableBody>
                {(rowsPerPage > 0
                  ? sharedColonies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : sharedColonies
                ).map(colony => (
                  <TableRow key={colony.colonyId}>
                    <TableCell
                      style={{ cursor: 'pointer' }}
                      component="th"
                      scope="row"
                      onClick={async () => await handleCellClick(colony.colonyId, colony.size, rowsPerPage, page)}
                    >
                      <div style={{ fontWeight: 'bold', fontSize: 18 }}>{colony.colonyName}</div>
                      <p style={{ color: '#333333' }}>Size: {colony.size}</p>
                    </TableCell>
                    <TableCell align="right">
                      <Button variant="contained" color="primary" startIcon={<Share />} onClick={openShareDialog}>Share</Button>
                      <Dialog open={shareDialog} onClose={closeShareDialog} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Share with others</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Share animal colony with another user.
                              </DialogContentText>
                          <div>
                            <TextField variant="outlined" margin="dense" size="small" name="email" label="Person to share" onChange={updateInputSharedUser} />
                          </div>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={() => share(colony.colonyId)} variant="outlined" color="default">Share</Button>
                        </DialogActions>
                      </Dialog>
                      <Button variant="outlined" color="primary" onClick={() => {
                        deleteColony(colony.colonyId);
                      }}>
                        Delete Colony
                          </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[]}
                    colSpan={3}
                    count={ownedColonies.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { 'aria-label': 'rows per page' },
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
      </TabPanel>
      </div>
    </Container >
  );
};

export default Colonies;
