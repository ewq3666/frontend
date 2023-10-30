import { UserOutlined, MailOutlined, MobileOutlined, LockOutlined } from '@ant-design/icons';

// Login form fields
export const loginFormField = [
    {
        name: "user_email",
        optional: false,
        type: 'email',
        rules: [
            {
                required: true,
                message: 'Please enter your email.'
            },
            {
                type: 'email',
                message: 'Invalid email address.'
            }
        ],
        placeholder: "Enter your Email",
        fullInput: true,
        icon: MailOutlined
    },
    {
        name: "password",
        optional: false,
        type: 'password',
        rules: [
            {
                required: true,
                message: 'Please enter your password'
            }
        ],
        placeholder: "Enter your password",
        fullInput: true,
        icon: LockOutlined
    }
]