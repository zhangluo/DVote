import Cookies from 'js-cookie';

// 设置连接状态
export const setConnectionStatus = (status) => {
  Cookies.set('connectionStatus', status, { expires: 7 });
};
// 设置超级管理员状态
export const setIsSuperAdminStatus = (status) => {
  Cookies.set('isSuperAdmin', status, { expires: 7 });
};
// 设置管理员状态
export const setIsAdminStatus = (status) => {
  Cookies.set('isAdmin', status, { expires: 7 });
};
// 获取管理员状态
export const getIsAdminStatus = () => {
  return Cookies.get('isAdmin');
};

// 设置候选人员状态
export const setIsCanditdateStatus = (status) => {
  Cookies.set('isCandidate', status, { expires: 7 });
};
// 获取候选人状态
export const getIsCanditdateStatus = () => {
  return Cookies.get('isCandidate');
};
// 获取超级管理员状态
export const getIsSuperAdminStatus = () => {
  return Cookies.get('isSuperAdmin');
};

// 获取连接状态
export const getConnectionStatus = () => {
  return Cookies.get('connectionStatus');
};

// 清除连接状态
export const clearConnectionStatus = () => {
  Cookies.remove('connectionStatus');
};
// 清除管理员状态
export const clearAdminStatus = () => {
  Cookies.remove('isCandidate');
};
// 清除候选人状态
export const clearCandidateStatus = () => {
  Cookies.remove('isAdmin');
};
// 清除超级管理员状态
export const clearSuperAdminStatus = () => {
  Cookies.remove('isSuperAdmin');
};