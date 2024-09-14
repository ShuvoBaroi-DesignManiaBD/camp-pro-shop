import React from 'react';
import { Button, Result } from 'antd';

const NotFound: React.FC = () => (
  <div className='h-[100vh] flex justify-center items-center'>
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button href='/' type="primary">Back Home</Button>}
      className='[&&>div>svg]:w-[400px] [&&>div>svg]:h-[400px]'
    />
  </div>
);

export default NotFound;