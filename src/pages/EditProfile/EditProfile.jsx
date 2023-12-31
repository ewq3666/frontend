  import React, { useState, useEffect } from 'react';
  import { Form, Input, Button, Space } from 'antd';
  import { UserOutlined, MailOutlined, MobileOutlined, PhoneOutlined } from '@ant-design/icons';
  import { BiArrowBack, BiEdit } from 'react-icons/bi';
  import { GrLocation } from 'react-icons/gr';
  import { useNavigate } from 'react-router-dom';
  import './styles.scss';
  import { updateProfile } from '../../store/actions/reducerActions';
  import { useSelector, useDispatch } from 'react-redux';
  import { useForm } from 'antd/lib/form/Form';

  const EditProfile = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form] = useForm();
    let userInfo = useSelector((state) => state.ReducerFc?.userData[0]);
    console.log(userInfo, "userinto");

    useEffect(() => {
      form.setFieldsValue(userInfo);
    }, [userInfo]);

    const setFieldValue = () => {
      form.setFieldsValue({
        fieldName: 'New Value',
      });
    };

    const onFinish = (values) => {
      console.log('Received values:', values);
      dispatch(updateProfile(values));

    };
    //   const history = useHistory(); // Initialize the routing hook
    const goBack = () => {
      navigate('/setting');
    };

    return (
      <div className="edit-profile-container">
        <div className="edit-profile-content">
          <div className="edit-profile-title">
            <div className='left-section' onClick={() => goBack()}> <BiArrowBack /></div>
            <h1>Edit Profile</h1>
            <div className='right-section'> <BiEdit /></div>
          </div>
          <div className="edit-profile-form">
            <Form name="edit-profile-form" onFinish={onFinish} form={form}>
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Please enter your name' }]}
                className='common-input'
              >
                <Input
                  prefix={<UserOutlined className="input-icon" />}
                  placeholder="Name"
                />
              </Form.Item>

              <Form.Item
                name="user_email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Invalid email address' },
                ]}
                className='common-input'
                disable={true}
              >
                <Input
                  prefix={<MailOutlined className="input-icon" />}
                  placeholder="Email"
                />
              </Form.Item>

              <Form.Item
                name="upi"
                rules={[{ required: true, message: 'Please enter your UPI ID' }]}
                className='common-input'
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
                className='common-input'
              >
                <Input
                  prefix={<PhoneOutlined className="input-icon" />}
                  placeholder="Phone Number"
                />
              </Form.Item>

              <Form.Item
                name="state"
                rules={[{ required: true, message: 'Please enter your state' }]}
                className='common-input'
              >
                <Input
                  prefix={<GrLocation className="input-icon" />}
                  placeholder="Your State"
                />
              </Form.Item>

              <Form.Item name="district" className='common-input'>
                <Input
                  prefix={<GrLocation className="input-icon" />}
                  placeholder="District (Optional)"
                />
              </Form.Item>

              <div className="button-box">
                <Button htmlType="submit" className='common-blue-button' onClick={setFieldValue}>
                  <BiEdit /> Save Changes
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  };

  export default EditProfile;
