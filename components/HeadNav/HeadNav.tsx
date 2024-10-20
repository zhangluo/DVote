"use client"
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Layout } from 'antd';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/navigation'; 
import { useAccountEffect } from 'wagmi';
import { clearConnectionStatus, getIsAdminStatus } from '@/config/wagmi/wagmiCookies';
import AddAmin from '../AddAdmin/page';
// import Link from "next/link";

const { Header } = Layout;

const HeadNav: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null); // 控制管理员状态
  const [isMounted, setIsMounted] = useState(false); // 控制是否在客户端挂载
  // const [selectedKey, setSelectedKey] = useState<string>('1'); // 控制选中的菜单项

  // 定义不需要显示导航的页面路由
  const noNavPaths = ['/login'];

  useEffect(() => {
    setIsMounted(true); // 表示组件已在客户端挂载
    const adminStatus = getIsAdminStatus(); // 获取管理员状态
  
    // 将 adminStatus 转换为 boolean | null
    if (adminStatus !== undefined) {
      setIsAdmin(adminStatus === 'true'); // 假设 'true' 表示管理员
    } else {
      setIsAdmin(null); // 如果未定义，则设置为 null
    }
  }, []);

  // 使用 wagmi 的 useAccountEffect 来监听钱包断开连接事件
  useAccountEffect({
    onDisconnect() {
      console.log('Disconnected!');
      clearConnectionStatus();
      router.push('/login');
    },
  });

  // // 仅当不在不显示导航栏的页面上时才显示
  if (noNavPaths.includes(pathname)) {
    return null;
  }

  // // 防止服务端渲染时显示错误的菜单项
  if (!isMounted || isAdmin === null) {
    return null; // 如果组件还没有在客户端挂载，返回 null 以避免水合错误
  }

  return (
    <Header style={{ 
      display: 'flex', 
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1, }}>
      <img src="../../static/vote_logo.png" alt="DVote Logo" width={64} style={{  marginRight: '20px' }}/>
      <div className="logo" style={{ color: 'white', fontWeight: 'bold', fontSize: '18px', marginRight: '60px' }}>
        DVote System
      </div>
      <div style={{ marginLeft: 'auto', alignItems: 'center' }} className='flex gap-5'>
        <ConnectButton />
        <AddAmin/>
      </div>
    </Header>
  );
};

export default HeadNav;
