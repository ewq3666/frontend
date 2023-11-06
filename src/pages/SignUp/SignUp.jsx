import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { END_POINTS } from '../../api/domain';
import { useNavigate } from 'react-router-dom';
import { HiOutlineUserCircle } from 'react-icons/hi2';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Button, notification, Drawer } from 'antd';
import { signupFormFields } from '../../assets/commonData/commonData';
import CommonInput from '../../Components/CommonInput/CommonInput';
import * as Notifications from "../../assets/messages.js";
import "../../Components/CommonInput/styles.scss";
import OtpInput from 'react-otp-input';
import emailjs from '@emailjs/browser';
import "../Login/styles.scss";
import axios from "axios";
import './styles.scss';

const SignUp = () => {
  const [signUpForm] = Form.useForm();
  const navigate = useNavigate();
  const form = useRef();

  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [data, setdata] = useState()
  const [emailSent, setemailSent] = useState(false)
  // const [emailVerified, setemailVerified] = useState(false)
  const [otp, setotp] = useState()
  const [userOtp, setUserOtp] = useState()
  const formref = useRef()
  function generateRandomSixDigitNumber() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  // Check duplicate Email and send OTP
  const sendEmail = async (e) => {
    try {
      const userEmail = signUpForm.getFieldValue('user_email');
      // API call for check is email exist or not 
      let res = await axios.post(END_POINTS.handleDuplicateEmail, { "email": userEmail })
      if (!res.data?.registered) {
        if (userEmail) {
          console.log("fff")
          // Send OTP
          let cotp = generateRandomSixDigitNumber()
          document.getElementById('message').innerHTML = cotp
          setotp(cotp)
          console.log("hhhhh")
          emailjs.sendForm('service_acukyoj', 'template_221j0y3', form.current, 'ZUVtc9uMSFENFge48')
            .then((result) => {
              console.log("ggg",result)
              setemailSent(true)
              Notifications.otpSendSuccessfully();
            }, (error) => {console.log("error",error)});
        }
        else {
          // notification.error({ message: 'please enter email' })
        }
      } else {
        Notifications.emailAlreadyExist();
      }
    } catch (error) {}
  };

  // Set data
  const onFinish = async (values) => {
    setdata(values)
    console.log('Received values:', values);
  };

  // Signup function called
  useEffect(() => {
    console.log("emailSent", emailSent, userOtp, otp);
    if (userOtp == otp && emailSent) {
      console.log("true condition")
      Notifications.otpMatched();
      registerUser()
      setemailSent(false);
    } else {
      if(userOtp?.length > 5 && emailSent) {
        Notifications.incorrectOtp();
      }
      console.log("false condition",otp)
    }
  }, [emailSent, sendEmail])

  // Sign up function
  const registerUser = async () => {
    try {
      const payload = {
        name: signUpForm.getFieldValue('name'),
        user_email: signUpForm.getFieldValue('user_email'),
        upi: signUpForm.getFieldValue('upi'),
        mobile: signUpForm.getFieldValue('phone'),
        password: signUpForm.getFieldValue('password'),
        refaral: signUpForm.getFieldValue('referal') ? signUpForm.getFieldValue('referal') : "",
        yourstate: signUpForm.getFieldValue('state'),
        district: signUpForm.getFieldValue('district') ? signUpForm.getFieldValue('district') : ""
      }
      let res = await axios.post(END_POINTS.signup, payload)
      if (res) {
        Notifications.signUpSuccess();
        setIsBtnLoading(false);
        navigate('/login');
      }
    } catch (error) {
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
    <div className="login-container">
      <div className="login-container__box signup-box">
        <div className="login-container__box-user-icon">
          <HiOutlineUserCircle />
        </div>
        <h1>Sign Up</h1>
        <Form name="registration-form" onFinish={onFinish} className='login-container__box__form-wrapper' form={signUpForm}>
          {signupFormFields.map((data, index) => {
            return (
              <>
                {
                  data.type == "email" ?
                    (
                      <Form.Item
                        name="user_email"
                        rules={[
                          { required: true, message: 'Please enter your email' },
                          { type: 'email', message: 'Invalid email address' },
                        ]}
                        className="loginInput"
                      >
                        <Input
                          ref={formref} prefix={<MailOutlined className="loginInput__input-icon" />}
                          placeholder="Email"
                          className='loginInput__input'
                        />
                      </Form.Item>
                    )
                  : data.type == "confirmPassword" ?
                    (
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
                        className="loginInput"
                      >
                        <Input.Password
                          prefix={<LockOutlined className="loginInput__input-icon" />}
                          placeholder="Confirm Password"
                          className='loginInput__input'
                        />
                      </Form.Item>
                    )
                  :
                    <CommonInput props={data} index={index} />
                }
              </>
            )
          })}

          <div className="login-container__box__form-wrapper-btn">
            <Button onClick={sendEmail} loading={isBtnLoading} >
              Sign Up
            </Button>
          </div>
        </Form>
        <form onSubmit={sendEmail} ref={form} className='hide-form'>
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

        <div className="login-container__box-signup-option">
          <h3>You have an account ? <NavLink to="/login">Login Now!</NavLink></h3>
        </div>

        {/* Enter OTP drawer */}
        <Drawer
          title="Verify Your Account"
          placement="bottom"
          width={500}
          open={emailSent}
          // open={true}
          className="Otp-drawer"
        >
          <OtpInput
            containerStyle="otp-box"
            value={userOtp}
            onChange={setUserOtp}
            numInputs={6}
            renderInput={(props) => <input {...props} />}
          />
          <div className="button-box">
            <Button loading={isBtnLoading} className='common-blue-button' onClick={() => signUpForm.submit()}>
              Verify email
            </Button>
          </div>

          <div className="button-box">
            <Button className='common-empty-button' onClick={() => setemailSent(false)}>
              Cancel
            </Button>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default SignUp;