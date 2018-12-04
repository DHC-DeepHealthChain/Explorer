import modelExtend from 'dva-model-extend';
import { pageModel } from './common';
import { blockList, personalTransactionList } from '../services/blockChain';

export default modelExtend(pageModel, {
  namespace: 'home',

  state: {
    transaction: [],
    loading: false,
    transactionLoading: false,
    transactionPagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: 0,
      pageSize: 10,
    },
  },

  effects: {
    *getBlock({ payload }, { call, put }) {
      const response = yield call(blockList, payload);
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
    *getTransaction({ payload }, { call, put, select }) {
      const response = yield call(personalTransactionList, payload);
      const transactionPagination = yield select(({ home }) => home.transactionPagination);
      yield put({
        type: 'changeTransactionLoading',
        payload: true,
      });
      if (response.error === false) {
        yield put({
          type: 'updateState',
          payload: {
            transaction: response.result.list,
            transactionPagination: {
              ...transactionPagination,
              ...response.result.pagination,
            },
          },
        });
        yield put({
          type: 'changeTransactionLoading',
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
    changeTransactionLoading(state, action) {
      return {
        ...state,
        transactionLoading: action.payload,
      };
    },
  },
});
