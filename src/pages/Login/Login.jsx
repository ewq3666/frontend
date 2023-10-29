import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { END_POINTS } from '../../api/domain';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, notification } from 'antd';
import { addUsers } from '../../store/actions/reducerActions';
import * as Notifications from "../../assets/messages.js";
import axios from "axios";
import './styles.scss';

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
      <div className="login-box">
        <h1>Login</h1>
        <Form name="login-form" onFinish={onFinish} className='login-form-wrapper'>
          <Form.Item
            name="user_email"
            rules={[
              { required: true, message: 'Please enter your email.' },
              { type: 'email', message: 'Invalid email address.' },
            ]}
          >
            <Input placeholder="Enter your Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          {/* <div className="forgot-password-option">
            <a href="#">Forgot password?</a>
          </div> */}

          <Form.Item>
            <Button htmlType="submit" loading={isBtnLoading}>
              Login
            </Button>
          </Form.Item>
        </Form>
        <div className="signup-option">
          <h3>Don't have an account ? <NavLink to="/signup">Sign-Up Now!</NavLink></h3>
        </div>
      </div>
    </div>
  );
};

export default Login;
