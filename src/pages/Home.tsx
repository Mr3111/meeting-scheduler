import { PlusOutlined } from '@ant-design/icons';
import { Button, Row, Space, Tooltip } from 'antd';
import React, { useState } from 'react';

import AddMeetingModal from '../components/modals/AddMeetingModal';
import MeetingsTable from '../components/table/MeetingsTable';

const Admin = () => {
    const [visible, setVisible] = useState(false);

    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Row justify="end">
                <Tooltip title="Schedule Meeting">
                    <Button
                        type="primary"
                        size="large"
                        icon={<PlusOutlined />}
                        onClick={() => setVisible(true)}
                    >
                        New Meeting
                    </Button>
                </Tooltip>
            </Row>
            <MeetingsTable />
            <AddMeetingModal
                visible={visible}
                onCancel={() => setVisible(false)}
            />
        </Space>
    );
};

export default Admin;
