import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { ipfsHash } from '../services/blockChain';

export default {
  namespace: 'healthyDocument',

  state: {
    document: [],
  },

  effects: {
    *submitRegularForm({ payload }, { call, put }) {
      const response = yield call(ipfsHash, payload);
      if (response.error === false) {
        message.success('提交成功');
        yield put(routerRedux.push('/home'));
      } else {
        throw response;
      }
    },
  },

  reducers: {
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          ...payload,
        },
      };
    },
  },
};
