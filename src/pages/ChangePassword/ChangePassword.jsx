import React from 'react';
import { Form, Input, Button, Space } from 'antd';
import { ArrowLeftOutlined, LockOutlined } from '@ant-design/icons';
import './styles.scss';

const ChangePassword = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  const goBack = () => {
    // history.goBack(); // Use the appropriate navigation function based on your routing library
  };

  return (
    <div className="change-password-container">
      <div className="change-password-content">
        <header className="change-password-header">
          <Space>
            <Button type="primary" icon={<ArrowLeftOutlined />} onClick={() => goBack()} />
            <h1>Change Password</h1>
          </Space>
        </header>
        <div className="change-password-form">
          <Form name="change-password-form" onFinish={onFinish}>
            <Form.Item
              name="oldPassword"
              rules={[{ required: true, message: 'Please enter your old password' }]}
            >
              <Input
                prefix={<LockOutlined className="input-icon" />}
                type="password"
                placeholder="Old Password"
              />
            </Form.Item>

            <Form.Item
              name="newPassword"
              rules={[{ required: true, message: 'Please enter your new password' }]}
            >
              <Input
                prefix={<LockOutlined className="input-icon" />}
                type="password"
                placeholder="New Password"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={['newPassword']}
              hasFeedback
              rules={[
                { required: true, message: 'Please confirm your password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match'));
                  },
                }),
              ]}
            >
              <Input
                prefix={<LockOutlined className="input-icon" />}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Item>

            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Change Password
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
