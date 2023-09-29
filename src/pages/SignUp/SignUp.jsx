import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, MailOutlined, MobileOutlined, LockOutlined } from '@ant-design/icons';
import './styles.scss'; // Your SCSS file

const SignUp = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  return (
    <div className="registration-container">
      <div className="registration-box">
        <h1>Registration</h1>
        <Form name="registration-form" onFinish={onFinish}>
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
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
