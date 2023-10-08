import React from 'react';
import { Form, Input, Button, Space } from 'antd';
import { ArrowLeftOutlined, UserOutlined, MailOutlined, MobileOutlined } from '@ant-design/icons';
import './styles.scss';
// import { useHistory } from 'react-router-dom'; // Import the routing hook if you're using React Router

const EditProfile = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
  };

//   const history = useHistory(); // Initialize the routing hook

  const goBack = () => {
    // history.goBack(); // Use the appropriate navigation function based on your routing library
  };

  
    return (
      <div className="edit-profile-container">
        <div className="edit-profile-content">
          <header className="edit-profile-header">
            <Space>
              <Button type="primary" icon={<ArrowLeftOutlined />} onClick={() => goBack()} />
              <h1>Edit Profile</h1>
            </Space>
          </header>
          <div className="edit-profile-form">
            <Form name="edit-profile-form" onFinish={onFinish}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input
              prefix={<UserOutlined className="input-icon" />}
              placeholder="Name"
            />
          </Form.Item>

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

          <Form.Item
            name="upi"
            rules={[{ required: true, message: 'Please enter your UPI ID' }]}
          >
            <Input
              prefix={<MobileOutlined className="input-icon" />}
              placeholder="Your UPI ID"
            />
          </Form.Item>

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

          <Form.Item
            name="state"
            rules={[{ required: true, message: 'Please enter your state' }]}
          >
            <Input
              prefix={<UserOutlined className="input-icon" />}
              placeholder="Your State"
            />
          </Form.Item>

          <Form.Item name="district">
            <Input
              prefix={<UserOutlined className="input-icon" />}
              placeholder="District (Optional)"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Save Changes
            </Button>
          </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
