import { Spin } from 'antd';

const LoadingSpin = () => {
    return (
      <div className='h-[60vh] flex justify-center items-center'>
        <Spin size="large" tip="Loading" />
      </div>
    );
};

export default LoadingSpin;