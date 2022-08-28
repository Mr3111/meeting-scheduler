import { Switch } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function ModeSwitcher() {
    const navigate = useNavigate();
    function onChange(checked: boolean) {
        if (checked) {
            navigate('/admin');
        } else {
            navigate('/');
        }
    }

    return (
        <Switch
            checkedChildren="Admin"
            unCheckedChildren="Normal"
            onChange={onChange}
        />
    );
}
