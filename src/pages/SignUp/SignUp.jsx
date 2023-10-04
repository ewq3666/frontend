import React, { useState } from 'react';
import axios from "axios";
import { Form, Input, Button, Row, Col, notification } from 'antd';
import { UserOutlined, MailOutlined, MobileOutlined, LockOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { END_POINTS } from '../../api/domain';
import { useNavigate } from 'react-router-dom';
import './styles.scss';

const SignUp = () => {
  const navigate = useNavigate();
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const onFinish = async (values) => {
    console.log('Received values:', values);
    setIsBtnLoading(true);
    try {
      let res = await axios.post(END_POINTS.signup, values)
      console.log(res.data);
      if (res) {
        notification.open({
          message: res.data.message
        })
        setIsBtnLoading(false);
        navigate('/login');
      }
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.msg) {
        notification.error({ message: error.response.data.msg })
        setIsBtnLoading(false);
      }
      else {
        notification.error({ message: "something went wrong" })
        setIsBtnLoading(false);
      }
    }
  };

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
                name="email"
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
            <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={isBtnLoading}>
              Sign-Up
            </Button>
          </Form.Item>
        </Form>
        <div className="signup-option">
          <h3>You have an account ? <NavLink to="/login">Login Now!</NavLink></h3>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
