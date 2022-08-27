import { CalendarOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React from 'react';
import './Dashboard.css';
import { Outlet, useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const items = [
    {
        icon: React.createElement(CalendarOutlined),
        key: '/',
        label: 'Schedule',
    },
    {
        icon: React.createElement(VideoCameraOutlined),
        key: 'meetings/new',
        label: 'Meet',
    },
];

const DashboardLayout = () => {
    const navigate = useNavigate();
    return (
        <Layout hasSider>
            <Sider
                style={{
                    bottom: 0,
                    height: '100vh',
                    left: 0,
                    overflow: 'auto',
                    position: 'fixed',
                    top: 0,
                }}
            >
                <div className="logo">Meeter</div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['/']}
                    items={items}
                    onClick={({ key }) => navigate(key)}
                />
            </Sider>
            <Layout
                className="site-layout"
                style={{
                    marginLeft: 200,
                }}
            >
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                    }}
                />
                <Content
                    className="site-layout-content"
                    style={{
                        margin: '24px 16px 0',
                        overflow: 'initial',
                    }}
                >
                    <div
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            textAlign: 'center',
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Design ©2022 Created by Rishab Mishra
                </Footer>
            </Layout>
        </Layout>
    );
};

export default DashboardLayout;
