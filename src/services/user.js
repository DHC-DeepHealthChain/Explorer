import request from '../utils/request';
import { api } from '../utils/config';

const { userLogin, user, auth, account, accountList } = api;


export async function getUser(param) {
  return request(user.replace(':id', param.id));
}

export async function authorization() {
  return request(auth);
}

export async function getAccount(param) {
  return request(`${accountList}?username=${param.username}`);
}

export async function login(param) {
  return request(userLogin, {
    method: 'POST',
    body: {
      ...param,
    },
  });
}

export async function register(param) {
  return request(user.replace('/:id', ''), {
    method: 'POST',
    body: {
      ...param,
    },
  });
}

export async function addAccount(param) {
  return request(account, {
    method: 'POST',
    body: {
      ...param,
    },
  });
}
