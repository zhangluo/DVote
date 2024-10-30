"use client"
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Layout } from 'antd';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/navigation'; 
import { useAccountEffect } from 'wagmi';
import { 
  clearConnectionStatus, 
  getIsAdminStatus,
  getIsSuperAdminStatus, 
  clearAdminStatus, 
  clearCandidateStatus, 
  clearSuperAdminStatus 
} from '@/config/wagmi/wagmiCookies';
import AddAmin from '../AddAdmin/page';
// import Link from "next/link";

const { Header } = Layout;

const HeadNav: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null); // 是否为管理员
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean | null>(null); // 是否为超级管理员

  // 定义不需要显示导航的页面路由
  const noNavPaths = ['/login'];

  useEffect(() => {
    const adminStatus = getIsAdminStatus(); // 获取管理员状态
    const isSuperAdmin = getIsSuperAdminStatus(); // 获取超级管理员状态
    console.log(typeof adminStatus, adminStatus)
    console.log(typeof isSuperAdmin, isSuperAdmin)
    setIsAdmin(adminStatus == 'true');
    setIsSuperAdmin(isSuperAdmin == 'true');
  }, []);

  // 使用 wagmi 的 useAccountEffect 来监听钱包断开连接事件
  useAccountEffect({
    onDisconnect() {
      console.log('Disconnected!');
      clearSuperAdminStatus();
      clearConnectionStatus();
      clearCandidateStatus();
      clearAdminStatus();
      router.push('/login');
    },
  });

  // // 仅当不在不显示导航栏的页面上时才显示
  if (noNavPaths.includes(pathname)) {
    return null;
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
        {(isSuperAdmin || isAdmin) && <AddAmin/>}
      </div>
    </Header>
  );
};

export default HeadNav;
