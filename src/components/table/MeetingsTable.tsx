import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Badge, Button, Input, Space, Table, Tag } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';

import type {
    GetAllBuildingsRoomsMeetingsQuery,
    Meeting,
} from '../../generated/graphql';
import { useGetAllBuildingsRoomsMeetingsQuery } from '../../generated/graphql';
import graphqlClient from '../../lib/clients/graphqlClient';

type MeetingType = Meeting & {
    buildingName: string;
    roomName: string;
    floor: number;
};

type DataIndex = keyof MeetingType;

const MeetingsTable: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const [meetings, setMeetings] = useState<MeetingType[]>([]);
    const { data: buildingsData } = useGetAllBuildingsRoomsMeetingsQuery<
        GetAllBuildingsRoomsMeetingsQuery,
        Error
    >(graphqlClient);

    useEffect(() => {
        if (!buildingsData) {
            return;
        }
        const meetings: MeetingType[] = [];
        for (const building of buildingsData?.Buildings!) {
            for (const room of building!.meetingRooms!) {
                room!.meetings!.forEach((meeting) => {
                    meetings.push({
                        ...meeting,
                        buildingName: building!.name,
                        floor: room!.floor,
                        roomName: room!.name,
                    } as MeetingType);
                });
            }
        }
        setMeetings(meetings);
    }, [buildingsData]);

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (
        dataIndex: DataIndex
    ): ColumnType<MeetingType> => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(
                            selectedKeys as string[],
                            confirm,
                            dataIndex
                        )
                    }
                    style={{ display: 'block', marginBottom: 8 }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(
                                selectedKeys as string[],
                                confirm,
                                dataIndex
                            )
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() =>
                            clearFilters && handleReset(clearFilters)
                        }
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined
                style={{ color: filtered ? '#1890ff' : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]!.toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns: ColumnsType<MeetingType> = [
        {
            dataIndex: 'title',
            key: 'title',
            title: 'Title/ Agenda',
            width: '30%',
            ...getColumnSearchProps('title'),
        },
        {
            dataIndex: 'date',
            key: 'date',
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.date?.localeCompare(b.date!) || 0,
            title: 'Date',
        },
        {
            dataIndex: 'startTime',
            key: 'startTime',
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.startTime?.localeCompare(b.startTime!) || 0,
            title: 'Start Time',
        },
        {
            dataIndex: 'endTime',
            key: 'endTime',
            title: 'End Time',
        },
        {
            dataIndex: 'roomName',
            key: 'location',
            render: (_, record) =>
                `${record.buildingName} | ${record.roomName} | Floor: ${record.floor}`,
            title: 'Location (Building | Room | Floor)',
        },
        {
            dataIndex: 'roomName',
            filterSearch: true,
            key: 'status',
            render: (_, record) => {
                const { date, startTime, endTime } = record;
                const startDate = moment(`${date} ${startTime}`, 'L HH:mm');
                const endDate = moment(`${date} ${endTime}`, 'L HH:mm');
                const now = moment();
                if (now.isBetween(startDate, endDate)) {
                    return (
                        <span>
                            <Badge status="success" />
                            Active
                        </span>
                    );
                }

                if (now.diff(startDate) < 0) {
                    return <Tag color="blue">Upcoming</Tag>;
                }
                return <Tag color="red">Past</Tag>;
            },
            title: 'Status',
        },
    ];

    return <Table columns={columns} dataSource={meetings} />;
};

export default MeetingsTable;
