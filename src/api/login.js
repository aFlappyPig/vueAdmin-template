import fetch from '@/utils/fetch';

export function login (username, password) {
  return fetch({
    url: '/login',
    method: 'post',
    data: {
      username,
      password
    }
  });
}

export function getInfo (userId) {
  return fetch({
    url: '/userInfo',
    method: 'post',
    data: {
      userId
    }
  });
}

export function logout () {
  return fetch({
    url: '/logout',
    method: 'post'
  });
}



