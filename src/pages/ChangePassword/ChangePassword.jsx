import React from 'react';
import { Form, Input, Button, Space } from 'antd';
import { ArrowLeftOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { RiLockPasswordFill } from 'react-icons/ri';
import './styles.scss';

const ChangePassword = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  const goBack = () => {
    navigate('/setting');
  };

  return (
    <div className="change-password-container">
      <div className="change-password-content">
         <div className="edit-profile-title">
          <div className='left-section' onClick={() => goBack()}> <BiArrowBack /></div>
          <h1>Change Password</h1>
          <div className='right-section'> <RiLockPasswordFill /></div>
        </div>
        <div className="change-password-form">
          <Form name="change-password-form" onFinish={onFinish}>
            <Form.Item
              name="oldPassword"
              rules={[{ required: true, message: 'Please enter your old password' }]}
              className='common-input'
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
              className='common-input'
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
              className='common-input'
            >
              <Input
                prefix={<LockOutlined className="input-icon" />}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Item>

            <div className="button-box">
              <Button htmlType="submit" className='common-blue-button'>
                <RiLockPasswordFill /> Change Password
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
