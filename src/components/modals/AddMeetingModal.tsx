import {
    CalendarOutlined,
    EditOutlined,
    EnvironmentOutlined,
} from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import {
    DatePicker,
    Form,
    Input,
    notification,
    Select,
    TimePicker,
} from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import React from 'react';

import type {
    CreateMeetingMutationVariables,
    GetAllBuildingsRoomsMeetingsQuery,
} from '../../generated/graphql';
import {
    useCreateMeetingMutation,
    useGetAllBuildingsRoomsQuery,
    useGetAllMeetingsQuery,
} from '../../generated/graphql';
import graphqlClient from '../../lib/clients/graphqlClient';

import ModalForm from './ModalForm';

interface AddModalProps {
    visible: boolean;
    onCancel: () => void;
    onComplete?: () => void;
}

const { Option, OptGroup } = Select;

export default function AddMeetingModal({
    visible,
    onCancel,
    onComplete,
}: AddModalProps) {
    const queryClient = useQueryClient();
    const { data } = useGetAllBuildingsRoomsQuery<
        GetAllBuildingsRoomsMeetingsQuery,
        Error
    >(graphqlClient);

    const { data: meetingsData } = useGetAllMeetingsQuery(graphqlClient);

    const { mutate } = useCreateMeetingMutation(graphqlClient, {
        onError: (error: Error) => {
            notification['error']({
                message: error.message,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['GetAllBuildingsRoomsMeetings']);
            queryClient.invalidateQueries(['GetAllMeetings']);
            notification['success']({
                message: 'Meeting created successfully',
            });
            onComplete ? onComplete() : onCancel();
        },
    });

    function onFinish(values: any) {
        const { time, date, location, ...rest } = values;
        const [startTime, endTime] = time.map((t: any) => t.format('HH:mm'));
        const formattedDate = date.format('L');
        const id =
            Math.max(...meetingsData?.Meetings!.map(({ id }: any) => id)!) + 1;
        const variables = {
            ...rest,
            date: formattedDate,
            endTime,
            id,
            meetingRoomId: location,
            startTime,
        } as CreateMeetingMutationVariables;
        mutate({ ...variables });
    }

    function disabledDate(current: Moment) {
        return current && current < moment().subtract(1, 'days');
    }

    return (
        <ModalForm
            visible={visible}
            onCancel={onCancel}
            onComplete={onFinish}
            title={`Meeting details`}
            submitButtonText="Create Meeting"
        >
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
                        width: 'calc(35% - 10px)',
                    }}
                    rules={[{ message: 'Select a date', required: true }]}
                >
                    <DatePicker
                        style={{
                            width: '100%',
                        }}
                        disabledDate={disabledDate}
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
                        width: 'calc(65% - 10px)',
                    }}
                    rules={[
                        {
                            message: 'Please select a time slot',
                            required: true,
                        },
                    ]}
                >
                    <TimePicker.RangePicker
                        use12Hours
                        format="HH:mm"
                        // disabledTime={disabledTime}
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
                    {data?.Buildings!.map(({ name, id, meetingRooms }: any) => (
                        <OptGroup label={name} key={id}>
                            {meetingRooms.length > 0 ? (
                                meetingRooms.map(({ name, id, floor }: any) => (
                                    <Option key={id} value={id}>
                                        {`${name} (Floor: ${floor})`}
                                    </Option>
                                ))
                            ) : (
                                <Option disabled>No rooms found</Option>
                            )}
                        </OptGroup>
                    ))}
                </Select>
            </Form.Item>
        </ModalForm>
    );
}
