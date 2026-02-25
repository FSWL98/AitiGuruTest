import { type FC } from 'react';
import { Form, Input, Select, type FormInstance } from 'antd';
import { type ProductCategory } from '../../types/products';

type ProductFormProps = {
    onSubmit: () => void;
    form: FormInstance;
    categories: ProductCategory[];
}

const ProductForm: FC<ProductFormProps> = ({ onSubmit, form, categories }) => {
    return (
        <Form
            form={form}
            onFinish={onSubmit}
        >
            <Form.Item
                layout='vertical'
                name="title"
                label="Название товара"
                rules={[
                    { required: true, message: 'Введите название товара' },
                    { min: 3, message: 'Минимум 3 символа' }
                ]}
            >
                <Input placeholder="Введите название" />
            </Form.Item>
            <Form.Item
                layout='vertical'
                name='category'
                label='Категория'
                rules={[
                    { required: true, message: 'Выберите категорию товара' }
                ]}
            >
                <Select 
                    options={categories}
                    fieldNames={{
                        label: 'name',
                        value: 'slug'
                    }}
                    showSearch
                    placeholder='Выберите категорию'
                />
            </Form.Item>
            <Form.Item
                layout='vertical'
                name='sku'
                label='Артикул'
                rules={[
                    { required: true, message: 'Укажите артикул товара' },
                    { min: 10, message: 'Минимум 10 символов' }
                ]}
            >
                <Input placeholder='Введите артикул' />
            </Form.Item>
            <Form.Item
                layout='vertical'
                name="price"
                label="Цена"
                rules={[
                    { required: true, message: 'Введите цену' },
                    () => ({
                        validator(_, value) {
                            if (parseFloat(value) > 0) return Promise.resolve();
                            return Promise.reject(new Error('Цена должна быть положительной'))
                        }
                    })
                ]}
            >
                <Input type="number" placeholder="Введите цену" />
            </Form.Item>
            <Form.Item
                layout='vertical'
                name='brand'
                label='Вендор'
            >
                <Input placeholder='Введите вендора' />
            </Form.Item>
        </Form>
    )
}

export default ProductForm;