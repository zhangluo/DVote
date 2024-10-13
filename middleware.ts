// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define the login page path and paths to protect
const loginPagePath = '/login';
const protectedPaths = ['/admin', '/candidate', '/admin/candidateList', '/']; // Add more protected paths as needed

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const connectionStatus = req.cookies.get('connectionStatus');


  // 如果用户在登录页且已登录，跳转到根目录
  if (pathname === loginPagePath && connectionStatus) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  } 
  
  // 如果用户访问受保护路径但未登录，跳转到登录页
  if (!connectionStatus && protectedPaths.includes(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = loginPagePath;
    return NextResponse.redirect(url);
  }

  // 允许符合条件的请求继续
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/admin', '/condidate', '/admin/condidateList'],
};
