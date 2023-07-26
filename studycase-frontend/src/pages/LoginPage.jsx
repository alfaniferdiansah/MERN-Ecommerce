import React, { useDebugValue, useEffect } from 'react'
import Login from '../components/Login/Login.jsx'
import { useSelector } from 'react-redux'
import { selectAuth } from '../redux/userSelector.js'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const LoginPage = () => {

  return (
    <div>
      <Login />
    </div>
  )
}

export default LoginPage
