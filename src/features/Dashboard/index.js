import React, { useState } from 'react';
import Colonies from 'components/Colonies';
import { Breadcrumbs, Link } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { useProfileProvider } from 'contexts/profile';
// import ItemForm from 'components/ItemForm';
// import Cart from 'components/Cart';

const Dashboard = () => {
  const { logout } = useProfileProvider();
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  if (redirectToLogin) {
    logout();
    return <Redirect to="/" />;
  }

  return (
    <div className="dashboard">
      <div style={{ textAlign: 'left' }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" onClick={()=> setRedirectToLogin(true)}>
            Logout
          </Link>
          <Link 
          color="textPrimary"
          aria-current="page">
            Colonies
          </Link>
        </Breadcrumbs>
      </div>
      <Colonies />
    </div>
  );
};

export default Dashboard;
