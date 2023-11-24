import React, { useState, useEffect } from 'react';
import { Form, Button } from 'antd';
import { useSelector } from 'react-redux';
import { useForm } from 'antd/lib/form/Form';
import { END_POINTS } from '../../api/domain';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack, BiEdit } from 'react-icons/bi';
import CommonInput from '../../Components/CommonInput/CommonInput';
import { userDetailsUpdatedSuccess } from '../../assets/messages.js';
import { editUserFormFields } from '../../assets/commonData/commonData';
import axios from 'axios';
import './styles.scss';

const EditProfile = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [form] = useForm();
  let userInfo = useSelector((state) => state.ReducerFc?.userData[0]);
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  // Set User details into form
  useEffect(() => {
    if (userInfo) {
      form.setFieldsValue({
        name: userInfo.name,
        user_email: userInfo.user_email,
        upi: userInfo.upi,
        phone: userInfo.mobile,
        state: userInfo.yourstate,
        district: userInfo.district
      })
    }
  }, [userInfo]);

  // Edit user form submit
  const onFinish = async (values) => {
    try {
      setIsBtnLoading(true);
      let response = await axios.put(`${END_POINTS.userInfoUpdate}/${userInfo._id}`, values, { headers: { authorization: token } })
      if (response.data) {
        userDetailsUpdatedSuccess();
      }
      setIsBtnLoading(false);
      navigate('/setting');
    } catch (error) {
      setIsBtnLoading(false);
    }
  };

  // Go back
  const goBack = () => {
    navigate('/setting');
  };

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-content">
        <div className="common-title yellow-title">
          <div className='left-section' onClick={() => goBack()}> <BiArrowBack /></div>
          <h1>Setting</h1>
          <div className='right-section'> <BiEdit /></div>
        </div>
        <div className="edit-profile-form">
          <Form name="edit-profile-form" onFinish={onFinish} form={form}>
            {editUserFormFields.map((data, index) => {
              return (
                <CommonInput props={data} index={index} />
              )
            })}
            <div className="login-container__box__form-wrapper-btn">
              <Button htmlType="submit" loading={isBtnLoading} className='common-blue-button'>
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

export default EditProfile;