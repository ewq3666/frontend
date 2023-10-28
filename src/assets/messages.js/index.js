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
    className: "success-notification"
  });
}
export const emailNotRegisterd = () => {
  notification.success({
    message: 'Email Not Found',
    description: `We couldn't find an account associated with this email address. Please double-check your email or sign up if you're new to our platform.`,
    icon: <ExclamationCircleOutlined style={{ color: '#FF133D' }} />,
    placement: 'top',
    // duration: 1000,
    className: "success-notification"
  });
} 