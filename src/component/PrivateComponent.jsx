import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateComponent() {
    const auth = localStorage.getItem('bloggingToken')
  return auth ? <Outlet/>: <Navigate to="/register" />
}

export default PrivateComponent