import React, { useEffect } from 'react'
import Signup from '../components/Login/Signup.jsx'
import { useSelector } from 'react-redux';
import { selectAuth } from '../redux/userSelector.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignupPage = () => {
  const auth = useSelector(selectAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if(auth === true){
      navigate("/");
      toast.error("you are already sign in!!");
    }
  }, [])

  return (
    <div>
      <Signup />
    </div>
  )
}

export default SignupPage
