import { Spin } from 'antd';
import './loadingIndicator.scss';

function LoadingIndicator() {
  return (
    <div className="loadingIndicator">
      <Spin size="large" />
    </div>
  );
}

export default LoadingIndicator;
