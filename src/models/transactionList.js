import modelExtend from 'dva-model-extend';
import { pageModel } from './common';
import { transactionList } from '../services/blockChain';

export default modelExtend(pageModel, {
  namespace: 'transactionList',

  state: {
    transactionList: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(transactionList, payload);
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
      } else {
        throw response;
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
