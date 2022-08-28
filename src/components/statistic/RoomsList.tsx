import { Button, Row, Space, Table, Tag, Tooltip, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';

import AddRoomModal from '../modals/AddRoomModal';

import type { BuildingType } from './BuildingsList';

const { Title } = Typography;

export const floors = Array.from(Array(10).keys());

const columns: ColumnsType<RoomType> = [
    {
        dataIndex: 'name',
        key: 'name',
        render: (text) => <p>{text}</p>,
        title: 'Name',
    },

    {
        dataIndex: 'floor',
        key: 'floor',
        render: (_, { floor }) => (
            <Tooltip title={`Floor: ${floor}`}>
                {floors.map((currFloor) => {
                    const color = floor === currFloor ? '#108ee9' : 'blue';
                    return (
                        <Tag color={color} key={currFloor}>
                            {currFloor}
                        </Tag>
                    );
                })}
            </Tooltip>
        ),
        title: 'Floor',
    },
    {
        dataIndex: 'meetingCnt',
        key: 'meetingCnt',
        render: (_, { meetings }) => meetings.length,
        title: 'Meeting Count',
    },
];

export type RoomType = {
    id: string;
    name: string;
    floor: number;
    meetings: object[];
    meetingCnt: number;
};

type RoomsListProps = {
    rooms: RoomType[];
    building?: BuildingType;
};

const RoomsList = ({ rooms, building }: RoomsListProps) => {
    const [visible, setVisible] = useState(false);

    if (!building) {
        return <Typography>No building selected</Typography>;
    }

    return (
        <div>
            <Row justify="space-between">
                <Space>
                    <Typography>{`Rooms in building: `}</Typography>
                    <Title code level={4}>
                        {building.name}
                    </Title>
                </Space>
                <Button
                    type="primary"
                    style={{ marginBottom: '10px' }}
                    onClick={() => setVisible(true)}
                >
                    Add Room
                </Button>
            </Row>
            <AddRoomModal
                visible={visible}
                onCancel={() => setVisible(false)}
                building={building}
            />
            <Table columns={columns} dataSource={rooms} />
        </div>
    );
};

export default RoomsList;
