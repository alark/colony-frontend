import React, { useState } from 'react';
import { Breadcrumbs, Link } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import Animals from 'components/Animals';
import {useProfileProvider} from 'contexts/profile';


const Colony = () => {
  const { logout } = useProfileProvider();
  const [redirectToColonies, setRedirectToColonies] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  if (redirectToColonies) {
    return <Redirect to="/dashboard" />;
  }
  else if (redirectToLogin) {
    logout();
    return <Redirect to="/" />;

  }

  return (
    <div className="animals">
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" onClick={()=> setRedirectToLogin(true)}>
          Logout
        </Link>
        <Link color="inherit" onClick={() => setRedirectToColonies(true)}>
          Colonies
        </Link>
        <Link
        color="textPrimary"
        aria-current="page"
        >
          Current Colony
        </Link>
      </Breadcrumbs>
      <Animals />
    </div>
  );
};

export default Colony;
