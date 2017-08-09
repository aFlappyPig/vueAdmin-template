import {asyncRouterMap, constantRouterMap} from '@/router/index';

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
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
    }
  }
};

export default permission;
