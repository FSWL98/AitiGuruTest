import { type FC } from 'react';
import { Typography } from 'antd';
import logo from '../../assets/logo.svg';
import LoginForm from '../../components/LoginForm/LoginForm.tsx';
import './styles.css';

const LoginPage: FC = () => {
    return (
        <div className='login-page'>
            <div className='login-page__container'>
                <div className='login-page__logo'>
                    <img src={logo} alt='logo' />
                </div>
                <Typography>
                    <Typography.Title>Добро пожаловать!</Typography.Title>
                    <Typography.Paragraph type='secondary'>
                        Пожалуйста, авторизуйтесь
                    </Typography.Paragraph>
                </Typography> 
                <LoginForm />
            </div>
        </div>
    )
}

export default LoginPage;