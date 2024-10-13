import Cookies from 'js-cookie';

// 设置连接状态
export const setConnectionStatus = (status) => {
  Cookies.set('connectionStatus', status, { expires: 7 });
};

// 获取连接状态
export const getConnectionStatus = () => {
  return Cookies.get('connectionStatus');
};

// 清除连接状态
export const clearConnectionStatus = () => {
  Cookies.remove('connectionStatus');
};
