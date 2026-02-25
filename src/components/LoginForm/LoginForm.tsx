import { useEffect, type FC } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Divider, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/index';
import { loginUser } from '../../store/slices/authSlice';

type FormValues = {
    username: string;
    password: string;
    remember: boolean;
}

const LoginForm: FC = () => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, token } = useAppSelector((state) => state.auth);
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        if (token) {
          navigate('/products', { replace: true });
        }
    }, [token, navigate]);

    const onFinish = async (values: FormValues) => {
        const { username, password, remember } = values;
        try {
            await dispatch(loginUser({
              credentials: { username, password },
              rememberMe: remember,
            })).unwrap();
          } catch (err) {
            api.error({
              message: 'Ошибка авторизации',
              description: err as string,
            });
          }
      };

    return (
        <Form
            form={form}
            name='login-form'
            onFinish={onFinish}
        >
            {contextHolder}
            <Form.Item
                name="username"
                label={<strong>Логин</strong>}
                rules={[{ required: true, message: 'Введите имя пользователя!' }]}
                layout='vertical'
            >
                <Input prefix={<UserOutlined />} placeholder="Логин" />
            </Form.Item>   
            <Form.Item
                name="password"
                label={<strong>Пароль</strong>}
                rules={[{ required: true, message: 'Введите пароль!' }]}
                layout='vertical'
            >
                <Input prefix={<LockOutlined />} type="password" placeholder="Пароль" />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Запомнить данные</Checkbox>
                </Form.Item>
            </Form.Item>
            <Form.Item className='lalalal'>
                <Button block type="primary" htmlType="submit" loading={isLoading}>
                    Войти
                </Button>
                <Divider>
                    или
                </Divider>
                Нет аккаунта? <a href="">Создать</a>
            </Form.Item>
        </Form>
    )
}

export default LoginForm;