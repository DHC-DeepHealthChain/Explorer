import modelExtend from 'dva-model-extend';
import { message } from 'antd';
import { pageModel } from './common';
import { getUser, addAccount, getAccount } from '../services/user';

export default modelExtend(pageModel, {
  namespace: 'personalInfo',

  state: {
    info: {},
    accountList: [],
  },

  effects: {
    *fetchBasic({ payload }, { call, put }) {
      const response = yield call(getUser, payload);
      if (response.error === false) {
        yield put({
          type: 'updateState',
          payload: {
            info: response.result,
          },
        });
      } else {
        throw response;
      }
    },
    *updateAccount({ payload }, { call }) {
      const response = yield call(addAccount, payload);
      if (response.error === false) {
        message.success('设置成功');
      } else {
        throw response;
      }
    },
    *accountList({ payload }, { call, put }) {
      const response = yield call(getAccount, payload);
      if (response.error === false) {
        yield put({
          type: 'updateState',
          payload: {
            accountList: response.result,
          },
        });
      } else {
        throw response;
      }
    },
  },

});

