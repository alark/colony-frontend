import React from 'react';
import { useProfileProvider } from 'contexts/profile';
import { Container, CssBaseline, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

const Cart = () => {
  const { state: { items } } = useProfileProvider();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <TableContainer component={Paper}>
        <Table aria-label="Cart Items">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(item => (
              <TableRow key={item.name}>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="right">{item.cost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container >
  );
};

export default Cart;
