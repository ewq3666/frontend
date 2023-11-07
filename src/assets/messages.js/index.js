import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { notification } from 'antd';

export const loginSuccessMessage = () => {
  notification.success({
    message: 'Login successfully!',
    description: 'Congratulations! You have successfully logged in to your account.',
    icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
    placement: 'top',
    // duration: 1000,
    className: "success-notification"
  });
}
export const passwordNotMatch = () => {
  notification.success({
    message: 'Incorrect Password',
    description: 'Oops! The passwords you entered do not match. Please double-check and try again.',
    icon: <ExclamationCircleOutlined style={{ color: '#FF133D' }} />,
    placement: 'top',
    // duration: 1000,
    className: "success-notification error-notification"
  });
}
export const emailAlreadyExist = () => {
  notification.success({
    message: 'Email already exist.',
    description: ' This email address already exists, please use a different email address.',
    icon: <ExclamationCircleOutlined style={{ color: '#FF133D' }} />,
    placement: 'top',
    // duration: 1000,
    className: "success-notification error-notification"
  });
}

export const signUpSuccess = () => {
  notification.success({
    message: 'Signup Successful',
    description: 'Congratulations! Your user signup was successful. Welcome to our platform. You can now access all our features and services. Thank you for joining us!',
    icon: <ExclamationCircleOutlined style={{ color: '#52c41a' }} />,
    placement: 'top',
    // duration: 1000,
    className: "success-notification"
  });
}
export const otpSendSuccessfully = () => {
  notification.success({
    message: 'OTP Sent Successfully',
    description: ' our One-Time Password (OTP) has been sent to your email. Please check your inbox and enter the OTP to complete your verification.',
    icon: <ExclamationCircleOutlined style={{ color: '#52c41a' }} />,
    placement: 'top',
    // duration: 1000,
    className: "success-notification"
  });
}
export const otpMatched = () => {
  notification.success({
    message: 'OTP Verification Successful',
    description: 'Congratulations! The OTP you entered matches the one we sent to your registered email. Your verification is now complete. Thank you for using our services.',
    icon: <ExclamationCircleOutlined style={{ color: '#52c41a' }} />,
    placement: 'top',
    // duration: 1000,
    className: "success-notification"
  });
}
export const incorrectOtp = () => {
  notification.success({
    message: 'Incorrect OTP',
    description: 'The OTP you entered is incorrect. Please double-check the OTP and try again. If you continue to experience issues, you can request a new OTP or contact our support team for assistance.',
    icon: <ExclamationCircleOutlined style={{ color: '#FF133D' }} />,
    placement: 'top',
    // duration: 1000,
    className: "success-notification error-notification"
  });
}

export const emailNotRegisterd = () => {
  notification.success({
    message: 'Email Not Found',
    description: `We couldn't find an account associated with this email address. Please double-check your email or sign up if you're new to our platform.`,
    icon: <ExclamationCircleOutlined style={{ color: '#FF133D' }} />,
    placement: 'top',
    // duration: 1000,
    className: "success-notification error-notification"
  });
} 
export const paymentAddSuccessFully = (name, amount) => {
  notification.success({
    message: 'Money Added Successfully',
    description: `Hello ${name}, you've successfully added ${amount}.00 to your account. Your balance is now updated. Enjoy playing quizzes and earning rewards!`,
    icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
    placement: 'top',
    // duration: 1000,
    className: "success-notification"
  });
}