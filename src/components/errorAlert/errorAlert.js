import { Space, Alert } from 'antd';
import './errorAlert.scss';

function ErrorAlert() {
  return (
    <div className="errorAlert">
      <Space>
        <Alert
          message="Error"
          description="We`ve got some problems with network. Try one more time!"
          type="error"
          showIcon
        />
      </Space>
    </div>
  );
}

export default ErrorAlert;
