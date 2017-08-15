/**
 * Created by jiannan.niu on 2017/8/14.
 */

import fetch from '@/utils/fetch'

/**
 * 指令信息
 * @returns {AxiosPromise}
 */
export function instructionQuery (data) {
  return fetch({
    url: '/api/v1/queryApprovalList',
    method: 'post',
    data: data
  });
}
