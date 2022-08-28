import { Card, Descriptions, PageHeader } from 'antd';
import moment from 'moment';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import ModeSwitcher from './ModeSwitcher';
import TokenSetter from './TokenSetter';

export default function Header() {
    const navigate = useNavigate();
    return (
        <Card>
            <PageHeader
                className="site-page-header"
                onBack={() => navigate(-1)}
                title="Meeter"
                subTitle="The best meeting app for your team"
                extra={[<TokenSetter />, <ModeSwitcher />]}
            >
                <Descriptions size="small" column={3}>
                    <Descriptions.Item label="Date">
                        {moment().format(' Do MMMM YYYY')}
                    </Descriptions.Item>
                </Descriptions>
            </PageHeader>
        </Card>
    );
}
