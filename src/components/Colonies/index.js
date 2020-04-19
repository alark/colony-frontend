import React, { useState } from 'react';
import { useProfileProvider } from 'contexts/profile';
import { Redirect } from 'react-router-dom';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Button, TextField, Container, CssBaseline, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@material-ui/core';
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
  const { addColony, deleteColony, getAnimals, sortList, sortAlpha, state: { ownedColonies } } = useProfileProvider();
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('');
  const classes = tableStyle();
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [redirectToAnimals, setRedirectToAnimals] = useState(false);
  const [addColonyOpen, setaddColonyOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(()=> {
      console.log("LATEST LIST: ", ownedColonies);
  });

  const handleClickDialogOpen = () => {
    setaddColonyOpen(true);
  };

  const handleDialogClose = () => {
    setaddColonyOpen(false);
  };

  /* Uploading File. */
  const chooseFile = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    const reader = new FileReader();
          
    if (file != null && file.size > 0){
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
        handleDialogClose();
    }
  };

  const isBlank = function(input) {
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
  const updateInput = ({ target: { value } }) => {
      setFileName(value);
  };

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

        <Button variant="outlined" color="primary" startIcon={<Add />} onClick={handleClickDialogOpen}>
          Add Colony
        </Button>
        <Dialog open={addColonyOpen} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add Colony</DialogTitle>
          <DialogContent> 
            <DialogContentText>
              Upload an animal colony along with its name.
            </DialogContentText>
            <input type="file" name="file" onChange={chooseFile} />
            <div>
              <TextField variant="outlined" margin="dense" size="small" name="colonyName" label="Colony Name" onChange={updateInput} />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={uploadFile} variant="outlined" color="default" startIcon={<CloudUploadIcon />}>Upload</Button>
          </DialogActions>
        </Dialog>
      </div>

      <TableContainer className={classes.table} component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableBody>
            {(rowsPerPage > 0
              ? ownedColonies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : ownedColonies
            ).map(ownedColony => (
              <TableRow key={ownedColony.colonyId}>
                <TableCell
                  style={{ cursor: 'pointer' }}
                  component="th"
                  scope="row"
                  onClick={async () => await handleCellClick(ownedColony.colonyId, ownedColony.size, rowsPerPage, page)}
                >
                  <div style={{ fontWeight: 'bold', fontSize: 18 }}>{ownedColony.colonyName}</div>
                  <p style={{ color: '#333333' }}>Size: {ownedColony.size}</p>
                </TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="primary" startIcon={<Share />}>Share</Button>
                  <Button variant="outlined" color="primary" onClick={() => {
                      deleteColony(ownedColony.colonyId);
                      }}>
                      Delete Colony
                    </Button>
                </TableCell>
              </TableRow>
            ))}
            {/*
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6}><p style= {{ color: 'rgba(224, 224, 224, 1)' ,fontWeight: 'bold', fontSize: 18, textAlign: 'center'}}>No Colonies</p></TableCell>
              </TableRow>
            )}
            */}
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

    </Container >
  );
};

export default Colonies;
