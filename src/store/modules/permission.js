import {asyncRouterMap, constantRouterMap} from '@/router/index'
import {getResource, getCalendarDate} from '@/api/login'

const permission = {
  state: {
    routers: constantRouterMap,
    resources: undefined,
    calendar: undefined,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    },
    SET_RESOURCES: (state, resources) => {
      state.resources = resources;
    },
    SET_CALENDARDATE: (state, calendar) => {
      state.calendar = calendar;
    }
  },
  actions: {
    GenerateRoutes ({commit}, data) {
      return new Promise(resolve => {
        const {auth} = data

        let accessedRouters = asyncRouterMap.filter(router => {
          return auth.find(item => {
            return item.resourceCnName === router.name
          })
        });

        accessedRouters.forEach(router => {
          if (router.children && router.children.length !== 0) {
            router.children = router.children.filter(child => {
              return auth.find(au => {
                return au.resourceCnName === router.name;
              }).nextData.find(b => {
                return b.resourceCnName === child.name;
              })
            })
          }
        });

        accessedRouters.forEach(router => {
          if (router.children && router.children.length !== 0) {
            let trd = router.children.find(child => {
              return child.children && child.children.length !== 0;
            })
            if (trd) {
              trd.children = trd.children.filter(child => {
                return auth.find(au => {
                  return au.resourceCnName === router.name;
                }).nextData.find(b => {
                  return b.resourceCnName === trd.name;
                }).nextData.find(c => {
                  return c.resourceCnName === child.name;
                })
              })
            }
          }
        });

        commit('SET_ROUTERS', accessedRouters);
        resolve();
      })
    },
    GetResources ({commit}) {
      return new Promise(resolve => {
        getResource().then(res => {
          const data = res.data;
          commit('SET_RESOURCES', data);
          resolve(data);
        })
      })
    },
    GetCalendarDates ({commit}) {
      return new Promise(resolve => {
        getCalendarDate().then(res => {
          const data = res.data;
          commit('SET_CALENDARDATE', data);
          resolve();
        })
      })
    }
  }
};

export default permission;
