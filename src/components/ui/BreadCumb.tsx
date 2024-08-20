import React from 'react';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';

const CustomBreadCumb = ({links}:any) => {
  return <Breadcrumb
    items={links}
    className='font-medium text-sm'
  />
}

export default CustomBreadCumb;