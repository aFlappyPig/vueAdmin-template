/**
 * Created by jiannan.niu on 2017/8/11.
 */

import store from '@/store/index'

/**datepicker的日期禁用**/
export function disabledDate (time) {
  if (time.format('yyyy') === new Date().format('yyyy')) {
    if (store.getters.calendar[time.format('yyyy/M/d')] === 'Y') {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}
