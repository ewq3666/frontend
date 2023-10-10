import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import { Form, Input, Button, Row, Col, notification } from 'antd';
import { UserOutlined, MailOutlined, MobileOutlined, LockOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { END_POINTS } from '../../api/domain';
import { useNavigate } from 'react-router-dom';
import './styles.scss';
import emailjs from '@emailjs/browser';

const SignUp = () => {
  const navigate = useNavigate();
  const form = useRef();

  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [data, setdata] = useState()
  const [emailSent, setemailSent] = useState(false)
  const [emailVerified, setemailVerified] = useState(false)
  const [otp, setotp] = useState()
  const [userOtp, setUserOtp] = useState()
  function generateRandomSixDigitNumber() {
    return Math.floor(100000 + Math.random() * 900000);
  }
  const sendEmail = (e) => {
    console.log(form.current);
    if (data?.user_email) {
      let cotp = generateRandomSixDigitNumber()
      document.getElementById('message').innerHTML = cotp
      setotp(cotp)
      emailjs.sendForm('service_acukyoj', 'template_221j0y3', form.current, 'ZUVtc9uMSFENFge48')
        .then((result) => {
          console.log(result.text);
          setemailSent(true)
          notification.open({ message: 'otp sent' })
        }, (error) => {
          console.log(error.text);
        });
    }
    else{
      notification.error({message:'please enter email'})
    }
  };



  const onFinish = async (values) => {
    setdata(values)
    console.log('Received values:', values);
  };


  useEffect(() => {
    console.log(userOtp,otp);
    if (userOtp == otp && emailSent) {
      registerUser()
    }
  }, [emailSent, sendEmail])

  const registerUser = async () => {
    try {
      let res = await axios.post(END_POINTS.signup, data)
      console.log(res.data);
      if (res) {
        notification.open({
          message: res.data.message
        })
        setIsBtnLoading(false);
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.msg) {
        notification.error({ message: error.response.data.msg })
        setIsBtnLoading(false);
      }
      else {
        notification.error({ message: "something went wrong" })
        setIsBtnLoading(false);
      }
    }
  }


  return (
    <div className="registration-container">
      <div className="registration-box">
        <h1>Sign Up</h1>
        <Form name="registration-form" onFinish={onFinish} className='Signup-form-wrapper'>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input
                  prefix={<UserOutlined className="input-icon" />}
                  placeholder="Name"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                name="user_email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Invalid email address' },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="input-icon" />}
                  placeholder="Email"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                name="upi"
                rules={[{ required: true, message: 'Please enter your UPI ID' }]}
              >
                <Input
                  prefix={<UserOutlined className="input-icon" />}
                  placeholder="Your UPI ID"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                name="phone"
                rules={[
                  { required: true, message: 'Please enter your phone number' },
                  { pattern: /^\d{10}$/, message: 'Invalid phone number' },
                ]}
              >
                <Input
                  prefix={<MobileOutlined className="input-icon" />}
                  placeholder="Phone Number"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="input-icon" />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="input-icon" />}
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Form.Item name="referal">
            <Input
              prefix={<UserOutlined className="input-icon" />}
              placeholder="Referral (Optional)"
            />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                name="state"
                rules={[{ required: true, message: 'Please enter your state' }]}
              >
                <Input
                  prefix={<UserOutlined className="input-icon" />}
                  placeholder="Your State"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="district">
                <Input
                  prefix={<UserOutlined className="input-icon" />}
                  placeholder="District (Optional)"
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>

            <Button type="primary" onClick={sendEmail} htmlType="submit" style={{ width: '100%', margin: '1rem 0' }} loading={isBtnLoading}>
              Verify email
            </Button>
            {
              emailSent &&
              <input type="number" placeholder='enter otp' onChange={(e) => setUserOtp(e.target.value)} />
            }
            <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={isBtnLoading}>
              Sign-Up
            </Button>
          </Form.Item>
        </Form>
        <form onSubmit={sendEmail} ref={form} >
          <div>
            <label htmlFor="user_email">Email:</label>
            <input
              type="email"
              id="user_email"
              name="user_email"
              value={data?.user_email}
              required
            />
          </div>
          <div>
            <label htmlFor="message" >Message:</label>
            <textarea
              id="message"
              name="message"
              value={data?.message}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>

        <div className="signup-option">
          <h3>You have an account ? <NavLink to="/login">Login Now!</NavLink></h3>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
