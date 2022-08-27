import { useQueryClient } from '@tanstack/react-query';
import {
    Button,
    Form,
    Input,
    Row,
    Space,
    Table,
    Tag,
    Tooltip,
    Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';

import type { CreateRoomMutationVariables } from '../../generated/graphql';
import { useCreateRoomMutation } from '../../generated/graphql';
import graphqlClient from '../../lib/clients/graphqlClient';
import ModalForm from '../modals/ModalForm';

import type { BuildingType } from './BuildingsList';

const { Title } = Typography;

const floors = Array.from(Array(10).keys());

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
    const queryClient = useQueryClient();
    const { mutate } = useCreateRoomMutation(graphqlClient, {
        onSuccess: () => {
            setVisible(false);
            queryClient.invalidateQueries(['GetAllBuildingsRoomsMeetings']);
        },
    });
    const [visible, setVisible] = useState(false);

    if (!building) {
        return <Typography>No building selected</Typography>;
    }

    function onFinish(values: any) {
        const variables = {
            ...values,
            buildingId: building!.id,
            floor: parseInt(values.floor, 10),
            id: 15,
        } as CreateRoomMutationVariables;
        mutate({ ...variables });
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
                    type="ghost"
                    style={{ marginBottom: '10px' }}
                    onClick={() => setVisible(true)}
                >
                    Add Room
                </Button>
            </Row>
            <ModalForm
                visible={visible}
                onCancel={() => setVisible(false)}
                onComplete={onFinish}
                title={`Add room to building ${name}`}
                submitButtonText="Add Room"
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
            </ModalForm>
            <Table columns={columns} dataSource={rooms} />
        </div>
    );
};

export default RoomsList;
