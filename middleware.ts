// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define the login page path and paths to protect
const loginPagePath = '/login';
const protectedPaths = ['/admin', '/candidate', '/']; // Add more protected paths as needed

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // 获取和解析 wagmi.store cookie 的内容
  const wagmiStoreCookie = req.cookies.get('wagmi.store');
  let currentConnection;
  
  if (wagmiStoreCookie) {
    try {
      const wagmiState = JSON.parse(wagmiStoreCookie.value);
      currentConnection = wagmiState.state.current;
    } catch (error) {
      console.error('Error parsing wagmi.store cookie:', error);
    }
  }

  // 如果用户在登录页且已登录，跳转到根目录
  if (pathname === loginPagePath && currentConnection) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  } 
  
  // 如果用户访问受保护路径但未登录，跳转到登录页
  if (!currentConnection && protectedPaths.includes(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = loginPagePath;
    return NextResponse.redirect(url);
  }

  // 允许符合条件的请求继续
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/dashboard', '/profile', '/settings'],
};
