import { PlusOutlined } from '@ant-design/icons';
import { Button, Row, Space, Tooltip } from 'antd';
import React from 'react';
import './AddMeeting.css';

import { Link } from 'react-router-dom';

import BuildingsList from '../components/statistic/BuildingsList';

const AddMeeting = () => {
    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Row justify="end">
                <Link to="meetings/new">
                    <Tooltip title="Schedule Meeting">
                        <Button
                            type="primary"
                            size="large"
                            icon={<PlusOutlined />}
                        >
                            New Meeting
                        </Button>
                    </Tooltip>
                </Link>
            </Row>
            <BuildingsList />
        </Space>
    );
};

export default AddMeeting;
