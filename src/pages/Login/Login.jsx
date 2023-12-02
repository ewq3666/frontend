import React, { useState } from 'react';
import axios from "axios";
import { Form, Button } from 'antd';
import { Helmet } from "react-helmet";
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { END_POINTS } from '../../api/domain';
import { useNavigate } from 'react-router-dom';
import { HiOutlineUserCircle } from 'react-icons/hi2';
import * as Notifications from "../../assets/messages.js";
import { addUsers } from '../../store/actions/reducerActions';
import CommonInput from '../../Components/CommonInput/CommonInput';
import { loginFormField } from '../../assets/commonData/commonData';
import './styles.scss';
import { BiArrowBack } from 'react-icons/bi';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  // Login form submit function
  const onFinish = async (values) => {
    try {
      setIsBtnLoading(true);
      // API call for login
      let res = await axios.post(END_POINTS.login, values)
      if (res) {
        // Set token into localstorage
        localStorage.setItem("token", res?.data.result.token)
        // API call for get user information
        let userInfo = await axios.get(END_POINTS.userInfo, { headers: { authorization: res?.data.result.token } })
        dispatch(addUsers(userInfo.data.result))
        Notifications.loginSuccessMessage();
        setIsBtnLoading(false);
        // Navigate user after logging
        navigate('/')
      }
    } catch (error) {
      if (error?.response?.data.msg) {
        Notifications.passwordNotMatch();
        setIsBtnLoading(false);
      }
      else {
        Notifications.emailNotRegisterd();
        setIsBtnLoading(false);
      }
    }
  };

  return (
    <div className="login-container">
      <Helmet>
        <meta name="robots" content="noindex" />
        <title>Login to Your Account | EWQ </title>
        <meta name="description" content="Explore EWQ, the ultimate destination for paid quizzes and rewarding knowledge seekers. Participate in engaging quizzes, earn rewards, and enrich your learning experience. Join EWQ today!"></meta>
      </Helmet>

      <div className="common-title green-title">
        <div className='left-section' onClick={() => navigate('/')}> <BiArrowBack /></div>
        <h1>Login</h1>
      </div>
      <div className="login-container__box">
        <Form name="login-form" onFinish={onFinish} className='login-container__box__form-wrapper'>
          {loginFormField.map((data, index) => {
            return (
              <CommonInput props={data} index={index} />
            )
          })}
          <div className="button-box">
            <Button htmlType="submit" className='common-blue-btn' loading={isBtnLoading}>
            Login
            </Button>
          </div>
        </Form>
        <div className="login-container__box-signup-option">
          <h3>Don't have an account ?</h3>
          <div className="button-box">
            <Button  className='common-blue-btn' onClick={() => navigate('/signup')}>
            Sign Up Now!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
