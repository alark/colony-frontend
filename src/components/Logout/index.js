import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useProfileProvider } from 'contexts/profile';
import { Button } from '@material-ui/core';
import ExitToApp from '@material-ui/icons/ExitToApp';

const Logout = ({ redirectURL }) => {
  const { logout } = useProfileProvider();
  const [redirect, setRedirect] = useState(false);

  const handleLogout = () => {
    logout();
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to={redirectURL} />;
  }
  return (
    <Button variant="outlined" startIcon={<ExitToApp />} onClick={handleLogout}>
      Logout
    </Button>
  );
};

Logout.propTypes = {
  redirectURL: PropTypes.string,
};

Logout.defaultProps = {
  redirectURL: '/',
};

export default Logout;
