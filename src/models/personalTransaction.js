import modelExtend from 'dva-model-extend';
import { pageModel } from './common';
import { personalTransactionList } from '../services/blockChain';

export default modelExtend(pageModel, {
  namespace: 'personalTransaction',

  state: {
    loading: false,
  },

  effects: {
    *fetchBasic({ payload }, { call, put }) {
      const response = yield call(personalTransactionList, payload);
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      if (response.error === false) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: response.result.list,
            pagination: response.result.pagination,
          },
        });
        yield put({
          type: 'changeLoading',
          payload: false,
        });
      }
    },
  },

  reducers: {
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
});
