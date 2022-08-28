import { PlusOutlined } from '@ant-design/icons';
import { Button, Row, Space, Tooltip } from 'antd';
import React, { useState } from 'react';

import AddMeetingModal from '../components/modals/AddMeetingModal';
import BuildingsList from '../components/statistic/BuildingsList';

const AddMeeting = () => {
    const [visible, setVisible] = useState(false);

    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Row justify="end">
                {/*<Link to="meetings/new">*/}
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
                {/*</Link>*/}
            </Row>
            <BuildingsList />
            <AddMeetingModal
                visible={visible}
                onCancel={() => setVisible(false)}
            />
        </Space>
    );
};

export default AddMeeting;
