import { CheckCircleOutlined } from '@ant-design/icons';
import { notification } from 'antd';

export const loginSuccessMessage = () => {
    notification.success({
        message: 'Login successfully!',
        description: 'Congratulations! You have successfully logged in to your account.',
        icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
        placement: 'top',
        duration: 1000,
        className: "success-notification"
      });
} 