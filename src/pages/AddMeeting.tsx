import {
    CalendarOutlined,
    EditOutlined,
    EnvironmentOutlined,
} from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Select, TimePicker } from 'antd';
import React from 'react';
import './AddMeeting.css';

import type { GetAllBuildingsQuery } from '../generated/graphql';
import { useGetAllBuildingsQuery } from '../generated/graphql';
import graphqlClient from '../lib/clients/graphqlClient';

const { Option } = Select;
const formItemLayout = {
    labelCol: {
        sm: {
            span: 6,
        },
        xs: {
            span: 24,
        },
    },
    wrapperCol: {
        sm: {
            span: 14,
        },
        xs: {
            span: 24,
        },
    },
};

const tailLayout = {
    wrapperCol: {
        sm: {
            span: 16,
        },
        xs: {
            span: 24,
        },
    },
};

const AddMeeting = () => {
    const {
        isLoading,
        error,
        data: buildings,
    } = useGetAllBuildingsQuery<GetAllBuildingsQuery, Error>(graphqlClient, {});
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log(values);
    };
    return (
        <Form {...formItemLayout} form={form} onFinish={onFinish}>
            <Form.Item
                name="title"
                label={<EditOutlined />}
                rules={[{ message: 'Title cannot be empty', required: true }]}
            >
                <Input placeholder="Enter meeting agenda..." />
            </Form.Item>

            <Form.Item
                label={<CalendarOutlined />}
                style={{
                    marginBottom: 0,
                }}
            >
                <Form.Item
                    name="date"
                    style={{
                        display: 'inline-block',
                        width: 'calc(30% - 10px)',
                    }}
                    rules={[
                        { message: 'Please select a date', required: true },
                    ]}
                >
                    <DatePicker
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>
                <span
                    style={{
                        display: 'inline-block',
                        lineHeight: '32px',
                        padding: '0px 8px',
                        textAlign: 'center',
                        width: '12px',
                    }}
                >
                    :
                </span>
                <Form.Item
                    name="time"
                    style={{
                        display: 'inline-block',
                        width: 'calc(70% - 10px)',
                    }}
                    rules={[
                        {
                            message: 'Please select a time slot',
                            required: true,
                        },
                    ]}
                >
                    <TimePicker.RangePicker
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>
            </Form.Item>

            <Form.Item
                label={<EnvironmentOutlined />}
                name="location"
                rules={[
                    { message: 'Location cannot be empty', required: true },
                ]}
            >
                <Select placeholder="Select location" allowClear>
                    <Option value="1">Option 1</Option>
                    <Option value="2">Option 2</Option>
                    <Option value="3">Option 3</Option>
                </Select>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                <Button htmlType="button">Reset</Button>
            </Form.Item>
        </Form>
    );
};

export default AddMeeting;
