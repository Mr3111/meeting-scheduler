import { Avatar, Button, Card, Col, List, Row, Space, Statistic } from 'antd';
import { useEffect, useState } from 'react';

import type { GetAllBuildingsRoomsMeetingsQuery } from '../../generated/graphql';
import { useGetAllBuildingsRoomsMeetingsQuery } from '../../generated/graphql';
import graphqlClient from '../../lib/clients/graphqlClient';

import type { RoomType } from './RoomsList';
import RoomsList from './RoomsList';

// const data = [
//     {
//         id: 1,
//         name: 'Building 8',
//     },
//     {
//         id: 2,
//         name: 'Building 4',
//     },
//     {
//         id: 3,
//         name: 'Building 6',
//     },
// ];

export type BuildingType = {
    id: number;
    name: string;
};

function BuildingsList() {
    const { data } = useGetAllBuildingsRoomsMeetingsQuery<
        GetAllBuildingsRoomsMeetingsQuery,
        Error
    >(graphqlClient);

    const [currRooms, setCurrRooms] = useState<RoomType[]>([]);
    const [selectedBuilding, setSelectedBuilding] = useState<BuildingType>();

    function handleBuildingClick(buildingId: number) {
        if (!data) {
            return;
        }
        const selectedBuilding = data?.Buildings!.find(
            (b) => b!.id === buildingId
        );
        setCurrRooms(selectedBuilding?.meetingRooms as any);
        const { id, name } = selectedBuilding as BuildingType;
        // console.log(selectedBuilding);
        setSelectedBuilding({ id, name });
    }

    useEffect(() => {
        handleBuildingClick(selectedBuilding?.id ?? 1);
    }, [data]);

    if (!data) {
        return null;
    }

    return (
        <Card
            title="Buildings"
            extra={<Button type="link">Add Building</Button>}
        >
            <Row gutter={10}>
                <Col span={9}>
                    <Space direction="vertical" size="middle">
                        <Space>
                            <Col>
                                <Statistic
                                    title="Total Buildings"
                                    value={data.Buildings?.length}
                                />
                            </Col>
                            <Col>
                                <Statistic
                                    title="Free now"
                                    value={2}
                                    valueStyle={{ color: '#3f8600' }}
                                />
                            </Col>
                        </Space>
                        <List
                            itemLayout="horizontal"
                            dataSource={data.Buildings as any}
                            renderItem={({ id, name, meetingRooms }: any) => (
                                <List.Item key={id}>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                style={{
                                                    backgroundColor: '#fde3cf',
                                                    color: '#f56a00',
                                                }}
                                            >
                                                {id}
                                            </Avatar>
                                        }
                                        title={
                                            <Button
                                                type="link"
                                                onClick={() =>
                                                    handleBuildingClick(id)
                                                }
                                            >
                                                {name}
                                            </Button>
                                        }
                                        description={`${meetingRooms.length} Meeting rooms`}
                                    />
                                </List.Item>
                            )}
                        />
                    </Space>
                </Col>
                <Col span={15}>
                    <RoomsList rooms={currRooms} building={selectedBuilding} />
                </Col>
            </Row>
        </Card>
    );
}
export default BuildingsList;
