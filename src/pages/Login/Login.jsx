import React from 'react';
import { Form, Input, Button } from 'antd';
import './styles.scss';

const Login = () => {
    const onFinish = (values) => {
      console.log('Received values:', values);
    };
  
    return (
      <div className="login-container">
        <div className="login-box">
          <h1>Login</h1>
          <Form name="login-form" onFinish={onFinish}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please enter your username' }]}
            >
              <Input placeholder="Username" />
            </Form.Item>
  
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please enter your password' }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
  
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                Login
              </Button>
            </Form.Item>
            <Form.Item style={{ textAlign: 'right' }}>
              <a href="#">Forgot password?</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
};
  
export default Login;
  