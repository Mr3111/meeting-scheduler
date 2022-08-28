import { Layout } from 'antd';
import React from 'react';
import './Dashboard.css';
import { Outlet } from 'react-router-dom';

import Header from '../header/Header';

const { Content, Footer } = Layout;

const DashboardLayout = () => {
    return (
        <Layout>
            <Layout className="site-layout">
                <Header />
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
