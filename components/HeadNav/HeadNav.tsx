"use client"
// components/HeadNav/HeadNav.tsx
import React, {useEffect} from 'react';
import { usePathname } from 'next/navigation';
import { Layout, Menu } from 'antd';
import RainbowConnect from '@/components/wallet/connectButton';
import { useRouter } from 'next/navigation'; 
import { useAccount, useAccountEffect  } from 'wagmi';
import { clearConnectionStatus } from '@/config/wagmi/wagmiCookies';
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
  // const {isConnected} = useAccount();
  useAccountEffect({
    onConnect(data) {
      console.log('Connected!', data)
    },
    onDisconnect() {
      console.log('Disconnected!')
      clearConnectionStatus();
      router.push('/login');
    },
  })
  // useEffect(() => {
  //   if (!isConnected) {
  //     // 执行用户断开连接后的操作
  //     console.log('Disconnected from wallet');
  //     clearConnectionStatus();
  //     router.push('/login');
  //   }
  // }, [isConnected]); // 当连接状态变化时触发

const menuItems = [
  {
    key: '1',
    label: <Link href={"/"}>首页</Link>,
  },
  {
    key: '2',
    label: <Link href={"/admin"}>选举</Link>,
  },
  {
    key: '3',
    label: <Link href={"/candidate"}>候选人</Link>,
  },
];



  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <div className="logo" style={{ color: 'white', fontWeight: 'bold', fontSize: '18px', marginRight: '60px' }}>
        DVote
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={menuItems} />
      <div style={{marginLeft: 'auto'}}>
        <RainbowConnect/>
      </div>
    </Header>
  );
};

export default HeadNav;