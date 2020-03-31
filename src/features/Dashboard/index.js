import React from 'react';
import Logout from 'components/Logout';
import Colonies from 'components/Colonies';
// import ItemForm from 'components/ItemForm';
// import Cart from 'components/Cart';

const Dashboard = () => (
  <div className="dashboard">
    <div style={{ textAlign: 'left' }}>
      <Logout />
    </div>
    <Colonies />
  </div>
);

export default Dashboard;
