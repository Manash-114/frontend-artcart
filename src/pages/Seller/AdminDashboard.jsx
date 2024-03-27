import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import styled from 'styled-components'



const AdminDashboard = () => {
  
  const [userId, setUserId] = useState(null);
  const [isProfileComplete, setIsProfileComplete] = useState(
    localStorage.getItem("isProfileComplete") === "true"
  );
  const [isVerified, setIsVerified] = useState(
    localStorage.getItem('isVerified') === 'true'
  );

  const handleProfileCompletion = (data) => {
    setProfileData(data);
    setProfileCompleted(true);
  };
  const handleEditProfile = () => {
    setProfileCompleted(false);

  };
  
  return (
    <Wrapper>
      <div className="container">
        <div className="dashboard-container">
          <div className="logo">LOGO</div>

          <Link to="dashboard">Dashboard</Link>

          <Link to="profileForm" onClick={handleEditProfile}>ProfileForm</Link>
        </div>
        <div className="overview-container">

          <div className="overview">
            <h2>Overview</h2>
            <div className="profile">
              profile
            </div>
          </div>


          <div className="sub-nav">
            <h3>Home | dashboard</h3>
          </div>

          <div className="main">

            <h1>My Seller App</h1>
              
              <Outlet />
          </div>


        </div>



      </div>

    </Wrapper>
  )
}

export default AdminDashboard

const Wrapper = styled.section`
  width: 100%;
  padding: 0 12px;

  .container{
    display: flex;
    gap: 2rem;

    .dashboard-container{
      flex: 1;
      height: 100vh;
      width: 100%;
      background-color: #ecefef;
      display: flex;
      padding: 10px 0;
      flex-direction: column;
      align-items: center;
    }
    .sub-nav{
      padding: 10px;
      
    }
    .overview-container{
      flex: 5;
      height: 100vh;
      width: 100%;
      background-color: #efebeb;
      padding: 0px 20px;
    }
    .overview{
      display: flex;
      padding: 10px;
      justify-content: space-between;
      height: 3rem;
      background-color: #dac8b0;
      
    }
    .main{
      height: 85%;
      padding: 1rem;
      border-radius: 1rem;
      background-color: #ffffff;
    }
    
  }
  
`