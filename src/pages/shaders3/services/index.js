import {request} from '@/utils/request';

// 部门列表
export function apiXiaoshan () {
  return request('/data/xiaoshan.json');
}
export function apiXiaoshanSingle () {
  return request('/data/xiaoshan_single.json');
}
