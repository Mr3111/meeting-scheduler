import { useQueryClient } from '@tanstack/react-query';
import { Form, Input, notification, Select } from 'antd';
import React from 'react';

import type { CreateRoomMutationVariables } from '../../generated/graphql';
import {
    useCreateRoomMutation,
    useGetAllRoomsQuery,
} from '../../generated/graphql';
import graphqlClient from '../../lib/clients/graphqlClient';
import type { BuildingType } from '../statistic/BuildingsList';
import { floors } from '../statistic/RoomsList';

import ModalForm from './ModalForm';

interface AddModalProps {
    visible: boolean;
    onCancel: () => void;
    onComplete?: () => void;
    building: BuildingType;
}

const { Option } = Select;

export default function AddRoomModal({
    visible,
    building,
    onCancel,
    onComplete,
}: AddModalProps) {
    const queryClient = useQueryClient();
    const { mutate } = useCreateRoomMutation(graphqlClient, {
        onError: (error: Error) => {
            notification['error']({
                message: error.message,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['GetAllBuildingsRoomsMeetings']);
            queryClient.invalidateQueries(['GetAllRooms']);
            notification['success']({
                message: 'Room added successfully',
            });
            onComplete ? onComplete() : onCancel();
        },
    });

    const { data: roomsData } = useGetAllRoomsQuery(graphqlClient);

    function onFinish(values: any) {
        const id =
            Math.max(...roomsData?.MeetingRooms!.map(({ id }: any) => id)!) + 1;
        const variables = {
            ...values,
            buildingId: building!.id,
            floor: parseInt(values.floor, 10),
            id,
        } as CreateRoomMutationVariables;
        mutate({ ...variables });
    }

    return (
        <ModalForm
            visible={visible}
            onCancel={onCancel}
            onComplete={onFinish}
            title={`Add room to building: ${building.name}`}
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
                <Input placeholder="Kochi" />
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
                <Select
                    placeholder="Select floor on which the room is"
                    allowClear
                >
                    {floors.map((floor: number) => (
                        <Option key={floor} value={floor}>
                            {floor}
                        </Option>
                    ))}
                </Select>

                {/*<Input type="number" />*/}
            </Form.Item>
        </ModalForm>
    );
}
