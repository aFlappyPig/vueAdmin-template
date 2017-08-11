import fetch from '@/utils/fetch';
import axios from 'axios'

export function login (username, password) {
  return fetch({
    url: '/login',
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data: "username=PortfolioManager1&password=admin123"
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

export function getResource () {
  // return fetch({
  //   url: '/api/v1/resourcesDetails',
  //   method: 'get'
  // });
  return axios.get('http://localhost:9002/fitsauth/api/v1/resourcesDetails');
}

export function getCalendarDate () {
  return fetch({
    url: '/api/v1/getCalendarDates',
    method: 'post'
  });
}
