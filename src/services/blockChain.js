import { stringify } from 'qs';
import request from '../utils/request';
import { api } from '../utils/config';

const { blocks, personalTransaction, transaction, ipfs } = api;

export async function blockList(param) {
  return request(`${blocks}?${stringify(param)}`);
}

export async function transactionList(param) {
  return request(`${transaction}?${stringify(param)}`);
}

export async function personalTransactionList(param) {
  return request(`${personalTransaction}?${stringify(param)}`);
}

export async function ipfsHash(param) {
  return request(ipfs, {
    method: 'POST',
    body: {
      ...param,
    },
  });
}
