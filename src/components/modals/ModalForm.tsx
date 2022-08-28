import type { FormInstance } from 'antd';
import { Button, Divider, Form, Modal, Space } from 'antd';
import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';

export interface ModalFormProps {
    visible: boolean;
    onCancel: () => void;
    onComplete: (val: any) => any;
    children: ReactNode;
    title?: string;
    submitButtonText?: string;
    cancelButtonText?: string;
}

const useResetFormOnCloseModal = ({
    form,
    visible,
}: {
    form: FormInstance;
    visible: boolean;
}) => {
    const prevVisibleRef = useRef<boolean>();
    useEffect(() => {
        prevVisibleRef.current = visible;
    }, [visible]);
    const prevVisible = prevVisibleRef.current;

    useEffect(() => {
        if (!visible && prevVisible) {
            form.resetFields();
        }
    }, [form, prevVisible, visible]);
};

export default function ModalForm({
    visible,
    onCancel,
    onComplete,
    title,
    submitButtonText,
    cancelButtonText,
    children,
}: ModalFormProps) {
    const [form] = Form.useForm();

    useResetFormOnCloseModal({
        form,
        visible,
    });
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
                form={form}
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 20 }}
                autoComplete="off"
                onFinish={onFinish}
            >
                {children}

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
