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

// Signup form fields
export const signupFormFields = [
    {
        name: "name",
        optional: false,
        type: '',
        rules: [
            {
                required: true,
                message: 'Please enter your name.'
            }
        ],
        placeholder: "Enter your Email",
        fullInput: true,
        icon: UserOutlined
    },
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
            },
        ],
        placeholder: "Enter your email",
        fullInput: true,
        icon: MailOutlined
    },
    {
        name: "phone",
        optional: false,
        type: '',
        rules: [
            { 
                required: true, 
                message: 'Please enter your phone number.' 
            },
            { 
                pattern: /^\d{10}$/, 
                message: 'Invalid phone number.' 
            },
          ],
        placeholder: "Enter your phone number",
        fullInput: true,
        icon: MobileOutlined
    },
    {
        name: "upi",
        optional: false,
        type: '',
        rules: [
            { 
                required: true, 
                message: 'Please enter your UPI ID.' 
            }
        ],
        placeholder: "Enter your UPI ID",
        fullInput: true,
        icon: UserOutlined
    },
    {
        name: "password",
        optional: false,
        type: 'password',
        rules: [
            { 
                required: true, 
                message: 'Please enter password.' 
            }
        ],
        placeholder: "Enter password",
        fullInput: true,
        icon: LockOutlined
    },
    {
        name: "confirmPassword",
        optional: false,
        type: 'confirmPassword',
        rules: [
            { 
                required: true, 
                message: 'Please enter your confirmPassword.' 
            }
        ],
        placeholder: "Enter your confirmPassword",
        fullInput: true,
        icon: UserOutlined
    },
    {
        name: "state",
        optional: false,
        type: '',
        rules: [
            { 
                required: true, 
                message: 'Please enter your state' 
            }
        ],
        placeholder: "Enter Your State",
        fullInput: true,
        icon: UserOutlined
    },
    {
        name: "district",
        optional: true,
        type: '',
        placeholder: "Enter your district",
        fullInput: true,
        icon: UserOutlined
    },
    {
        name: "referal",
        optional: true,
        type: '',
        placeholder: "Enter your referal",
        fullInput: true,
        icon: UserOutlined
    },
]