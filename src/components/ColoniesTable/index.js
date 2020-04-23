import React, { useState } from 'react';
import { useProfileProvider } from 'contexts/profile';
import { Redirect } from 'react-router-dom';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
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

const ColoniesTable = () => {
  const { deleteColony, shareColony, getAnimals, state: { ownedColonies } } = useProfileProvider();
  const classes = tableStyle();
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [redirectToAnimals, setRedirectToAnimals] = useState(false);
  const [shareDialog, setShareDialogOpen] = React.useState(false);
  const [sharedUser, setSharedUserEmail] = useState('');

  const openShareDialog = () => {
    setShareDialogOpen(true);
  };

  const closeShareDialog = () => {
    setShareDialogOpen(false);
  };

  const updateInputSharedUser = ({ target: { value } }) => {
    setSharedUserEmail(value);
  }

  const share = (colonyId) => {
    const data = { email: sharedUser, colonyId: colonyId };
    shareColony(data);
  }

  /* Pagination handler */
  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, ownedColonies.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleCellClick = async (colonyId, colonySize, rowsPerPage, page) => {
    const request = {
      colonyId, colonySize, rowsPerPage, page,
    };

    await getAnimals(request);
    setRedirectToAnimals(true);
  };

  if (redirectToAnimals) {
    return <Redirect to="/dashboard/colony" />;
  }

  return (
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
                  <Button onClick={() => share(colony.colonyId)} variant="contained" color="default">Share</Button>
                </DialogActions>
              </Dialog>
              <Button variant="contained" color="secondary" onClick={() => {
                deleteColony(colony.colonyId);
              }}>
                Remove
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
  );
};

export default ColoniesTable;





