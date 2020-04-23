import React from 'react';
import { useProfileProvider } from 'contexts/profile';
import { Redirect } from 'react-router-dom';
import Login from 'components/LoginForm';


const HomePage = () => {
  const { state: { loggedIn } } = useProfileProvider();
  return (
    <div className="home-page" style={{ textAlign: 'center' }}>
      <h1 style={{paddingTop: 30, fontFamily:'Courier New'}}>Animal Colony Management System</h1>
      { loggedIn ? <Redirect to="/dashboard" /> : <Login /> }
    </div>
  );
};

export default HomePage;
