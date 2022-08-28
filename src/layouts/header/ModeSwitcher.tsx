import { Switch } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ModeSwitcher() {
    let location = useLocation();
    const navigate = useNavigate();
    const [mode, setMode] = useState(false);

    useEffect(() => {
        if (location.pathname === '/configure') {
            setMode(true);
        } else {
            setMode(false);
        }
    }, [location]);

    function onChange(checked: boolean) {
        if (checked) {
            navigate('/configure');
        } else {
            navigate('/');
        }
    }

    return (
        <Switch
            checked={mode}
            checkedChildren="Admin"
            unCheckedChildren="Normal"
            onChange={onChange}
        />
    );
}
