import React from 'react'
import { Navigate, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoutes = ({component: Component}) => {
    const isVerified = useSelector((state) => state.profileCompletion.isVerified);

  return (
    <Route
        render = {(props) => {
            isVerified? (
            <Component {...props} />
            ):(
                <Navigate replace to="/profile-completion" />
            )
        }}
    />
  )
}

export default ProtectedRoutes
