"use client"
// components/HeadNav/HeadNav.tsx
import React, {useEffect} from 'react';
import { usePathname } from 'next/navigation';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import RainbowConnect from '@/components/wallet/connectButton';
import { useRouter } from 'next/navigation'; 
import { useAccount } from 'wagmi';
import Link from "next/link";
const { Header } = Layout;

const HeadNav: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  // 定义不需要显示导航的页面路由
  const noNavPaths = ['/login'];

  // 仅当不在不显示导航栏的页面上时才显示
  if (noNavPaths.includes(pathname)) {
    return null;
  }
  const { address, connector, isConnected } = useAccount();
  useEffect(()=> {
    if (!isConnected) {
      router.push('/login');
    }
  }, [isConnected,])

  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <div className="logo" style={{ color: 'white', fontWeight: 'bold', fontSize: '18px', marginRight: '60px' }}>
        DVote
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1"><Link href={"/"}>首页</Link></Menu.Item>
        <Menu.Item key="2"><Link href={"/admin"}>选举</Link></Menu.Item>
        {/* <Menu.Item key="3"><Link href={"/candidate"}>候选人</Link></Menu.Item> */}
      </Menu>
      <div style={{marginLeft: 'auto'}}>
        <RainbowConnect/>
      </div>
    </Header>
  );
};

export default HeadNav;