import React, { useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { END_POINTS } from '../../api/domain';
import { Helmet } from "react-helmet";
import { useNavigate } from 'react-router-dom';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { addUsers } from '../../store/actions/reducerActions';
import { Form, Input, Button, notification } from 'antd';
import * as Notifications from "../../assets/messages.js";
import axios from "axios";
import './styles.scss';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const onFinish = async (values) => {
    console.log('Received values:', values);
    try {
      setIsBtnLoading(true);
      let res = await axios.post(END_POINTS.login, values)
      console.log(res?.data.result.token);
      if (res) {
        localStorage.setItem("token", res?.data.result.token)
        let userInfo = await axios.get(END_POINTS.userInfo,{headers:{authorization: res?.data.result.token}})
        dispatch(addUsers(userInfo.data.result))
        Notifications.loginSuccessMessage();
        setIsBtnLoading(false);
        // userInfo.data.result
        navigate('/')
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data.msg) {
        notification.error({ message: error.response.data.msg })
        setIsBtnLoading(false);
      }
      else {
        notification.error({ message: "something went wrong" })
        setIsBtnLoading(false);
      }
    }
  };

  // const setUserData = async () => {
  //   try {
  //     const res = await axios.get('https://backendupdated.vercel.app/api/user');
  //     dispatch(res.data.result);
  //   }
  //   catch (error) {
  //     console.log(error, "failed to get data")
  //   }
  // }
  // useEffect(() => {
  //   setUserData()
  // }, []);
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

          {/* <Form.Item style={{ textAlign: 'right' }}> */}
          <div className="forgot-password-option">
            <a href="#">Forgot password?</a>
          </div>
          {/* </Form.Item> */}

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
