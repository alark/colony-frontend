import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import Animals from 'components/Animals';


const Colony = () => {
  const [redirectToColonies, setRedirectToColonies] = useState(false);

  if (redirectToColonies) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="animals">
      <Button variant="outlined" onClick={() => setRedirectToColonies(true)}>Back to colonies</Button>
      <Animals />
    </div>
  );
};

export default Colony;
