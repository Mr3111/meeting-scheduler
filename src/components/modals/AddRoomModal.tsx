import { Button, Divider, Form, Input, Modal, Space } from 'antd';

import { useCreateRoomMutation } from '../../generated/graphql';
import graphqlClient from '../../lib/clients/graphqlClient';

interface ModalFormProps {
    visible: boolean;
    onCancel: () => void;
}

export default function AddRoomModal({
    visible = true,
    onCancel,
}: ModalFormProps) {
    const { mutate } = useCreateRoomMutation(graphqlClient, {
        onSuccess: () => {},
    });
    const onFinish = (values: any) => {
        mutate({ buildingId: 3, floor: 4, id: 15, name: 'Test123' });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal
            title="Add Meeting Room in Building"
            visible={visible}
            footer={null}
        >
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                autoComplete="off"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            message: 'Room name cannot be empty!',
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Floor"
                    name="floor"
                    rules={[
                        {
                            message: 'Please enter floor number!',
                            required: true,
                        },
                    ]}
                >
                    <Input type="number" />
                </Form.Item>
                <Divider style={{ marginBottom: '8px' }} />
                <Form.Item
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginBottom: 0,
                        width: '100%',
                    }}
                >
                    <Space>
                        <Button onClick={onCancel}>Cancel</Button>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
}
