import {request} from '@/utils/request';

// 管理后台链接
export const apiAdminUrl = (params) => request('/show/assetIp');

// 获取标题
export const apiTitle = (params) => request('/init/config');
