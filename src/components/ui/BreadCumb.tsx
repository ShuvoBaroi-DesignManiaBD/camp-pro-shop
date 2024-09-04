import React from 'react';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';

const home = {
  href: "",
  title: (
    <>
      <HomeOutlined />
      <span>Home</span>
    </>
  ),
}

const CustomBreadCumb = ({links}:any) => {
  const updatedLinks = [home,...links];
  return <Breadcrumb
    items={updatedLinks}
    className='font-medium text-sm'
  />
}

export default CustomBreadCumb;