/**
 * Created by jiannan.niu on 2017/8/9.
 */

import fetch from '@/utils/fetch'

/**
 * 投资组合
 * @returns {AxiosPromise}
 */
export function getPortfolioTypes () {
  return fetch({
    url: '/api/v1/option/portfolio_types',
    method: 'get'
  });
}

/**
 * 会计分类
 * @returns {AxiosPromise}
 */
export function getAccountingTypes (value) {
  return fetch({
    url: '/api/v1/option/accounting_types',
    method: 'post',
    data: value
  });
}

/**
 * 交易员
 * @returns {AxiosPromise}
 */
export function getfExecutors (value) {
  return fetch({
    url: '/api/v1/option/quote_executor',
    method: 'post',
    data: value
  });
}

/**
 * 交易对手
 * @returns {AxiosPromise}
 */
export function getFCounterpartyId () {
  return fetch({
    url: '/api/v1/option/counter_parties',
    method: 'get'
  });
}

/**
 * 报价类型
 * @returns {AxiosPromise}
 */
export function getFQuoteType () {
  return fetch({
    url: '/api/v1/option/quote_types',
    method: 'get'
  });
}

/**
 * 执行市场
 * @returns {AxiosPromise}
 */
export function getExecution () {
  return fetch({
    url: '/api/v1/option/exec_markets',
    method: 'get'
  });
}

/**
 * 交易方向
 * @returns {AxiosPromise}
 */
export function getFTradeDirection () {
  return fetch({
    url: '/api/v1/option/trade_directions',
    method: 'get'
  });
}

/**
 * 对手交易员
 * @returns {AxiosPromise}
 */
export function getFCpTrader (entId) {
  return fetch({
    url: '/api/v1/option/entTraderNames',
    method: 'post',
    data: {
      entId
    }
  });
}

/**
 * 资金账户
 * @returns {AxiosPromise}
 */
export function getFCpCashacc (value) {
  return fetch({
    url: '/api/v1/option/fund_accounts',
    method: 'post',
    data: value
  });
}

/**
 * 查询债券
 * @returns {AxiosPromise}
 */
export function getBondInfo (execution, keyWord) {
  return fetch({
    url: '/api/v1/option/bonds_markets',
    method: 'post',
    data: {
      execution,
      keyWord
    }
  });
}

/**
 * 计算应计利息
 * @returns {AxiosPromise}
 */
export function calcBAi (data) {
  return fetch({
    url: '/api/v1/option/getBondRate',
    method: 'post',
    data: data
  });
}

/**
 * 计算接口，分四种情况
 * @returns {AxiosPromise}
 */
export function calcValue (data) {
  return fetch({
    url: '/api/v1/calculate/getCalculateValue',
    method: 'post',
    data: data
  });
}

/**
 * 提交数据，分两种情况
 * @returns {AxiosPromise}
 */
export function submitData (data) {
  return fetch({
    url: '/api/v1/order',
    method: 'post',
    data: data
  });
}
