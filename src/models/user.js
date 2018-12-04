import modelExtend from 'dva-model-extend';
import { pageModel } from './common';
import { authorization } from '../services/user';
import config from '../utils/config';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default modelExtend(pageModel, {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(authorization);
      if (response.error === false) {
        yield put({
          type: 'updateState',
          payload: {
            currentUser: response.result.user,
          },
        });
      } else if (config.openPages && !config.openPages.some(ele => (location.href.includes(ele)))) {
        yield put({
          type: 'userLogout',
        });
        reloadAuthorized();
      }
    },
    *userLogout(_, { put }) {
      yield put({
        type: 'logout',
      });
      yield put({
        type: 'changeLoginStatus',
        payload: {
          currentAuthority: 'admin',
        },
      });
      reloadAuthorized();
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.error,
      };
    },
    logout(state) {
      localStorage.removeItem('jwt');
      localStorage.removeItem('address');
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
      return {
        ...state,
        currentUser: {},
      };
    },
  },
});
