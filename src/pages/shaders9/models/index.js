import {
  apiXiaoshan,
  apiXiaoshanSingle
} from '../services/index';
// import {

// } from '@/utils/tool';


export default {
  namespace: 's1',
  state: {
    xiaoshanData: [],

  },
  reducers: { // 跟store相关
    saveXiaoshanData (state, {payload: {xiaoshanData}}) {
      return {...state, xiaoshanData};
    },

  },
  effects: { // 跟server相关
    *Xiaoshan ({payload: {isSingle}}, {call, put}) {
      let data
      if (isSingle) {
        data = yield call(apiXiaoshanSingle)
        yield put({
          type: 'saveXiaoshanData',
          payload: {
            xiaoshanData: data
          }
        });
      } else {
        data = yield call(apiXiaoshan)
        yield put({
          type: 'saveXiaoshanData',
          payload: {
            xiaoshanData: data
            // xiaoshanData: data.slice(0, 2000)
          }
        });
      }
    },
  },
  subscriptions: {
    setup ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/s1') {
          // 部门列表
          dispatch({type: 'Xiaoshan', payload: {isSingle: true}});
        }
      });
    }
  }
};
