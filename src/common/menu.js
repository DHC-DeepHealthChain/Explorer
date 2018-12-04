import { isUrl } from '../utils/utils';

const menuData = [{
  name: '主页',
  icon: 'dashboard',
  path: 'home',
}, {
  name: '个人信息',
  icon: 'form',
  path: 'personalInfo',
  authority: 'user',
}, {
  name: '个人交易',
  icon: 'form',
  path: 'personalTransaction/list/:id',
}, {
  name: '全部交易',
  icon: 'form',
  path: 'transactions/list',
}, {
  name: '上传健康档案',
  icon: 'form',
  path: 'healthyDocument',
}, {
  name: '表单列表',
  icon: 'table',
  path: 'list',
}, {
  name: '结果页',
  icon: 'check-circle-o',
  path: 'result',
  children: [{
    name: '成功',
    path: 'success',
  }, {
    name: '失败',
    path: 'fail',
  }],
}, {
  name: '异常页',
  icon: 'warning',
  path: 'exception',
  children: [{
    name: '403',
    path: '403',
  }, {
    name: '404',
    path: '404',
  }, {
    name: '500',
    path: '500',
  }],
}, {
  name: '账户',
  icon: 'user',
  path: 'user',
  authority: 'guest',
  children: [{
    name: '登录',
    path: 'login',
  }, {
    name: '注册',
    path: 'register',
  }, {
    name: '注册结果',
    path: 'register-result',
  }],
}];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
