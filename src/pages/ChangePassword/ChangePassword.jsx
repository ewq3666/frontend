import React from 'react';
import { Form, Button } from 'antd';
import { ArrowLeftOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack, BiEdit } from 'react-icons/bi';
import { useForm } from 'antd/lib/form/Form';
import CommonInput from '../../Components/CommonInput/CommonInput';
import { changePasswordFields } from '../../assets/commonData/commonData';
import './styles.scss';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [form] = useForm();

  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  const goBack = () => {
    navigate('/setting');
  };

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-content">
        <div className="common-title yellow-title">
          <div className='left-section' onClick={() => goBack()}> <BiArrowBack /></div>
          <h1>Change Password</h1>
          <div className='right-section'> <BiEdit /></div>
        </div>
        <div className="edit-profile-form">
          <Form name="edit-profile-form" onFinish={onFinish} form={form}>
            <h1>Change Password :</h1>
            {changePasswordFields.map((data, index) => {
              return (
                <CommonInput
                  props={data}
                  index={index}
                />
              )
            })}
            <div className="login-container__box__form-wrapper-btn">
              <Button htmlType="submit" className='common-blue-button'>
                {/* <BiEdit /> */}
                Save Changes
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
