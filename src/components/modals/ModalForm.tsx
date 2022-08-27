import { Button, Divider, Form, Modal, Space } from 'antd';
import type { ReactNode } from 'react';

interface ModalFormProps {
    visible: boolean;
    onCancel: () => void;
    onComplete: (val: any) => any;
    children: ReactNode;
    title?: string;
    submitButtonText?: string;
    cancelButtonText?: string;
}

export default function ModalForm({
    visible,
    onCancel,
    onComplete,
    title,
    submitButtonText,
    cancelButtonText,
    children,
}: ModalFormProps) {
    const onFinish = (values: any) => {
        onComplete(values);
    };

    return (
        <Modal
            title={title}
            visible={visible}
            footer={null}
            onCancel={onCancel}
        >
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                autoComplete="off"
                onFinish={onFinish}
            >
                {children}
                {/*<Form.Item*/}
                {/*    label="Name"*/}
                {/*    name="name"*/}
                {/*    rules={[*/}
                {/*        {*/}
                {/*            message: 'Room name cannot be empty!',*/}
                {/*            required: true,*/}
                {/*        },*/}
                {/*    ]}*/}
                {/*>*/}
                {/*    <Input />*/}
                {/*</Form.Item>*/}

                {/*<Form.Item*/}
                {/*    label="Floor"*/}
                {/*    name="floor"*/}
                {/*    rules={[*/}
                {/*        {*/}
                {/*            message: 'Please enter floor number!',*/}
                {/*            required: true,*/}
                {/*        },*/}
                {/*    ]}*/}
                {/*>*/}
                {/*    <Input type="number" />*/}
                {/*</Form.Item>*/}
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
                        <Button onClick={onCancel}>
                            {cancelButtonText ?? 'Cancel'}
                        </Button>
                        <Button type="primary" htmlType="submit">
                            {submitButtonText ?? 'Submit'}
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
}
