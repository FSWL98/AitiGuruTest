import { type FC } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Divider } from 'antd';

const LoginForm: FC = () => {
    const [form] = Form.useForm();

    const onFinish = (values: string | number | boolean) => {
        console.log(values);
      };

    return (
        <Form
            form={form}
            name='login-form'
            onFinish={onFinish}
        >
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
                <Button block type="primary" htmlType="submit">
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