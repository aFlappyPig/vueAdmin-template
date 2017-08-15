/**
 * Created by jiannan.niu on 2017/8/14.
 */
import moment from 'moment'
import accounting from 'accounting'

export const queryData = [
  {"name": "draw", "value": 1},
  {
    "name": "columns", "value": [
    {
      "data": "trdFormId",
      "name": "",
      "searchable": true,
      "orderable": true,
      "search": {"value": "", "regex": false}
    }, {
      "data": "fInitiator",
      "name": "",
      "searchable": true,
      "orderable": true,
      "search": {"value": "", "regex": false}
    }, {
      "data": "fExecutorName",
      "name": "",
      "searchable": true,
      "orderable": true,
      "search": {"value": "", "regex": false}
    }, {
      "data": "fTradeDate",
      "name": "",
      "searchable": true,
      "orderable": true,
      "search": {"value": "", "regex": false}
    }, {
      "data": "fSettleSpeed",
      "name": "",
      "searchable": true,
      "orderable": true,
      "search": {"value": "", "regex": false}
    }, {
      "data": "fSettleDate",
      "name": "",
      "searchable": true,
      "orderable": true,
      "search": {"value": "", "regex": false}
    }, {
      "data": "psName",
      "name": "",
      "searchable": true,
      "orderable": true,
      "search": {"value": "", "regex": false}
    }, {
      "data": "imCname",
      "name": "",
      "searchable": true,
      "orderable": true,
      "search": {"value": "", "regex": false}
    }, {
      "data": "fStatus",
      "name": "",
      "searchable": true,
      "orderable": true,
      "search": {"value": "", "regex": false}
    }, {
      "data": "fTradeDirection",
      "name": "",
      "searchable": true,
      "orderable": true,
      "search": {"value": "", "regex": false}
    }, {
      "data": "instrument",
      "name": "",
      "searchable": true,
      "orderable": true,
      "search": {"value": "", "regex": false}
    }, {
      "data": "bName",
      "name": "",
      "searchable": true,
      "orderable": true,
      "search": {"value": "", "regex": false}
    }, {
      "data": "trdYtmDisplay",
      "name": "",
      "searchable": true,
      "orderable": true,
      "search": {"value": "", "regex": false}
    }, {
      "data": "trdNetPriceDisplay",
      "name": "",
      "searchable": true,
      "orderable": true,
      "search": {"value": "", "regex": false}
    }, {
      "data": "trdAiDisplay",
      "name": "",
      "searchable": true,
      "orderable": true,
      "search": {"value": "", "regex": false}
    }, {
      "data": "trdFullPriceDisplay",
      "name": "",
      "searchable": true,
      "orderable": true,
      "search": {"value": "", "regex": false}
    }, {
      "data": "trdTotolAiDisplay",
      "name": "",
      "searchable": true,
      "orderable": true,
      "search": {"value": "", "regex": false}
    }, {
      "data": "trdSettleAmountDisplay",
      "name": "",
      "searchable": true,
      "orderable": true,
      "search": {"value": "", "regex": false}
    }, {
      "data": "trdParValueDisplay",
      "name": "",
      "searchable": true,
      "orderable": true,
      "search": {"value": "", "regex": false}
    }, {
      "data": "fAmountBalanceDisplay",
      "name": "",
      "searchable": true,
      "orderable": true,
      "search": {"value": "", "regex": false}
    }
  ]
  },
  {"name": "order", "value": [{"column": 0, "dir": "asc"}]},
  {"name": "start", "value": 0},
  {"name": "length", "value": 10},
  {"name": "search", "value": {"value": "", "regex": false}}
]

export function tableSort (column, queryData) {
  let data = JSON.parse(JSON.stringify(queryData));
  let order = data.find(item => {
    return item.name === 'order';
  })
  order.value[0].column = data[1].value.findIndex(item => {
    return item.data === column.prop;
  });
  order.value[0].dir = column.order === 'descending' ? 'desc' : 'asc';
  return data;
}

export function tableSizeChange (size, queryData) {
  let data = JSON.parse(JSON.stringify(queryData));
  let length = data.find(item => {
    return item.name === 'length';
  });
  length.value = +size;
  return data;
}

export function tableCurrentChange (num, queryData) {
  let data = JSON.parse(JSON.stringify(queryData));
  let start = data.find(item => {
    return item.name === 'start';
  });
  let length = data.find(item => {
    return item.name === 'length';
  });
  start.value = (+num - 1) * length.value;
  return data;
}

export function directionFormat (row, column, cellValue) {
  if (cellValue == null) {
    return "";
  } else if (cellValue == '1') {
    return '买入';
  } else if (cellValue == '2') {
    return '卖出';
  } else {
    return cellValue;
  }
}

export function statusFormat (row, column, cellValue) {
  if (cellValue == null) {
    return "";
  } else if (cellValue == '1') {
    return '新建';
  } else if (cellValue == '2') {
    return '待审批';
  } else if (cellValue == '3') {
    return '审批中';
  } else if (cellValue == '4') {
    return '审批通过';
  } else if (cellValue == '5') {
    return '审批拒绝';
  } else if (cellValue == '6') {
    return '无需审批';
  } else if (cellValue == '7') {
    return '审批打回';
  } else if (cellValue == '8') {
    return '执行中';
  } else if (cellValue == '9') {
    return '已失效';
  } else if (cellValue == '10') {
    return '已修改';
  } else {
    return cellValue;
  }
}

export function dateFormat (row, column, cellValue) {
  if (cellValue == null) {
    return "";
  } else {
    return moment(cellValue).format('YYYY-MM-DD');
  }
}

export function speedFormat (row, column, cellValue) {
  if (cellValue == null) {
    return "";
  } else if (cellValue == '0') {
    return 'T+0';
  } else if (cellValue == '1') {
    return 'T+1';
  } else {
    return cellValue;
  }
}

export function numberFormat (row, column, cellValue) {
  if (cellValue == null) {
    return "";
  } else if (+cellValue == 0) {
    return 0;
  } else if (+cellValue == cellValue) {
    return accounting.formatNumber(cellValue, 4, ',');
  }
}
