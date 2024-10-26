// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


// Define the login page path and paths to protect
const loginPagePath = '/login';

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const isAdminStatus = req.cookies.get('isAdmin');
  const isSuperAdminStatus = req.cookies.get('isSuperAdmin');
  const isCandidate = req.cookies.get('isCandidate');
  const connectionStatus = req.cookies.get('connectionStatus');
  
  let  protectedPaths: string | string[] = ['/allCandidates', '/candidateList', '/candidateInfo', '/']

  // 如果用户访问受保护路径但未登录，跳转到登录页
  if (!connectionStatus && protectedPaths.includes(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = loginPagePath;
    return NextResponse.redirect(url);
  }
  // 默认调整路由
  let forwardUrl = '/'
  if (isSuperAdminStatus?.value == 'true' || isAdminStatus?.value == 'true') {
    protectedPaths = ['/allCandidates', '/candidateList', '/candidateInfo', '/']
  } else {
    if (isCandidate?.value == 'true') {
      protectedPaths = ['/candidateInfo']
      forwardUrl = '/candidateInfo'
    } else {
      protectedPaths = ['/allCandidates']
      forwardUrl = '/allCandidates'
    }
  }

  // 如果用户在登录页且已登录，跳转到根目录
  if (pathname === loginPagePath && connectionStatus?.value == 'connected') {
    const url = req.nextUrl.clone();
    url.pathname = forwardUrl;
    return NextResponse.redirect(url);
  } 
  if (connectionStatus && !protectedPaths.includes(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = forwardUrl;
    return NextResponse.redirect(url);
  }

  // 允许符合条件的请求继续
  return NextResponse.next();
}

export const config = {
  matcher: ['/allCandidates', '/candidateList', '/candidateInfo', '/'],
};
