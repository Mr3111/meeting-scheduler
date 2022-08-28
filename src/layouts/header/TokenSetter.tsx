import { Input, Space } from 'antd';
import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';

import { localStorageGetItem, localStorageSetItem } from '../../utils';

export default function TokenSetter() {
    const DEFAULT_TOKEN = 'test1234';
    const [token, setToken] = useState(
        localStorageGetItem('token') || DEFAULT_TOKEN
    );
    useEffect(() => {
        localStorageSetItem('token', token);
    }, [token]);

    function handleChange(e: FormEvent<HTMLInputElement>) {
        let token = e.currentTarget.value || DEFAULT_TOKEN;
        setToken(token);
    }

    return (
        <Space>
            Current token:
            <Input value={token} onChange={handleChange} />
        </Space>
    );
}
