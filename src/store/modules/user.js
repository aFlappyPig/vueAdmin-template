import {login, logout, getInfo} from '@/api/login';
import {setToken, getToken, removeToken} from "../../utils/auth";

const user = {
  state: {
    userId: '',
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_USERID: (state, userId) => {
      state.userId = userId;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    }
  },

  actions: {
    // 登录
    Login ({commit}, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data;
          setToken(data.userId);
          commit('SET_USERID', data.userId);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },


    // 获取用户信息
    GetInfo ({commit, state}) {
      return new Promise((resolve, reject) => {
        if (getToken()) commit('SET_USERID', getToken());
        getInfo(state.userId).then(response => {
          const data = response.data;
          commit('SET_ROLES', data.role);
          commit('SET_NAME', data.name);
          commit('SET_AVATAR', data.avatar);
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 登出
    LogOut ({commit, state}) {
      return new Promise((resolve, reject) => {
        logout(state.userId).then(() => {
          commit('SET_USERID', '');
          commit('SET_ROLES', []);
          removeToken();
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 前端 登出
    FedLogOut ({commit}) {
      return new Promise(resolve => {
        commit('SET_USERID', '');
        removeToken();
        resolve();
      });
    }
  }
};

export default user;
