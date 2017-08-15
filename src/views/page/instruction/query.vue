<template>
  <div class="container">
    指令查询
    <hr>
    <el-form :inline="true" :model="form" label-width="80px">
      <el-form-item label="交易日期" prop="fTradeDate">
        <el-col :span="24">
          <el-date-picker
            v-model="form.fTradeDate"
            format="yyyy-MM-dd"
            type="daterange"
            range-separator=" 至 "
            :clearable="false"
            :picker-options="pickerOptions"
            placeholder="选择日期">
          </el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="投资组合" prop="portfolioSecu">
        <el-select v-model="form.portfolioSecu" placeholder="请选择">
          <el-option
            v-for="item in select.portfolioSecu"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query()">查询</el-button>
      </el-form-item>
    </el-form>
    查询结果
    <hr>
    <el-table :data="tableData" border stripe fit :default-sort="{prop: 'trdFormId', order: 'ascending'}"
              @sort-change="tableSort" :highlight-current-row="true" tooltip-effect="dark" v-loading="loading">
      <el-table-column
        prop="trdFormId"
        label="指令编号"
        sortable="custom"
        :show-overflow-tooltip="true"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="fInitiator"
        label="指令发起人"
        :show-overflow-tooltip="true"
        sortable="custom"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="fExecutorName"
        label="执行人"
        sortable="custom"
        :show-overflow-tooltip="true"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="fTradeDate"
        label="交易日期"
        sortable="custom"
        :show-overflow-tooltip="true"
        :formatter="dateFormat"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="fSettleSpeed"
        label="清算速度"
        sortable="custom"
        :formatter="speedFormat"
        :show-overflow-tooltip="true"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="fSettleDate"
        label="结算日期"
        sortable="custom"
        :formatter="dateFormat"
        :show-overflow-tooltip="true"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="psName"
        label="投资组合"
        sortable="custom"
        :show-overflow-tooltip="true"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="imCname"
        label="执行市场"
        sortable="custom"
        :show-overflow-tooltip="true"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="fStatus"
        label="指令状态"
        sortable="custom"
        :formatter="statusFormat"
        :show-overflow-tooltip="true"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="fTradeDirection"
        label="交易方向"
        sortable="custom"
        :formatter="directionFormat"
        :show-overflow-tooltip="true"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="instrument"
        label="债券代码"
        sortable="custom"
        :show-overflow-tooltip="true"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="bName"
        label="债券名称"
        sortable="custom"
        :show-overflow-tooltip="true"
        min-width="200">
      </el-table-column>
      <el-table-column
        prop="trdYtm"
        label="到期收益率(%)"
        sortable="custom"
        align="right"
        :formatter="numberFormat"
        :show-overflow-tooltip="true"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="trdNetPrice"
        label="净价(元)"
        sortable="custom"
        align="right"
        :formatter="numberFormat"
        :show-overflow-tooltip="true"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="trdAi"
        label="应计利息(元)"
        sortable="custom"
        align="right"
        :formatter="numberFormat"
        :show-overflow-tooltip="true"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="trdFullPrice"
        label="全价(元)"
        sortable="custom"
        align="right"
        :formatter="numberFormat"
        :show-overflow-tooltip="true"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="trdTotolAi"
        label="总应计利息(元)"
        sortable="custom"
        align="right"
        :formatter="numberFormat"
        :show-overflow-tooltip="true"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="trdSettleAmount"
        label="结算金额(元)"
        sortable="custom"
        align="right"
        :formatter="numberFormat"
        :show-overflow-tooltip="true"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="trdParValue"
        label="指令总额度(万元)"
        sortable="custom"
        align="right"
        :formatter="numberFormat"
        :show-overflow-tooltip="true"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="fAmountBalance"
        label="指令剩余额度(万元)"
        sortable="custom"
        align="right"
        :formatter="numberFormat"
        :show-overflow-tooltip="true"
        min-width="150">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 25, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, ->, prev, pager, next, jumper"
      :total="dataTotal">
    </el-pagination>
  </div>
</template>

<script>
  /**
   * Created by jiannan.niu on 2017/8/14.
   */
  import {disabledDate} from '@/utils/datepicker'
  import {getPortfolioTypes} from '@/api/instruction/bond'
  import * as api from '@/api/instruction/query'
  import * as utils from '@/utils/table'

  export default {
    data () {
      return {
        form: {
          fTradeDate: [this.$$moment().format('YYYY-MM-DD'), this.$$moment().format('YYYY-MM-DD')],
          portfolioSecu: undefined
        },
        select: {
          portfolioSecu: undefined
        },
        pickerOptions: {
          disabledDate,
          shortcuts: [
            {
              text: '昨天',
              onClick (picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
                end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '今天',
              onClick (picker) {
                const end = new Date();
                const start = new Date();
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '最近一周',
              onClick (picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近一个月',
              onClick (picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近三个月',
              onClick (picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }
          ]
        },
        tableData: undefined,
        queryData: utils.queryData,
        currentPage: 1,
        dataTotal: undefined,
        pageSize: 10,
        loading: false
      }
    },
    methods: {
      init () {
        getPortfolioTypes().then(res => {
          this.select.portfolioSecu = [{name: '全部', value: ''}].concat(res.data);
          this.form.portfolioSecu = '';
        })
      },
      dateFormat (row, column, cellValue) {
        return utils.dateFormat(row, column, cellValue);
      },
      speedFormat (row, column, cellValue) {
        return utils.speedFormat(row, column, cellValue);
      },
      statusFormat (row, column, cellValue) {
        return utils.statusFormat(row, column, cellValue);
      },
      directionFormat (row, column, cellValue) {
        return utils.directionFormat(row, column, cellValue);
      },
      numberFormat (row, column, cellValue) {
        return utils.numberFormat(row, column, cellValue);
      },
      query () {
        this.loading = true;
//        let startDate = this.$$moment(this.form.fTradeDate[0]).format('YYYY-MM-DD');
        let startDate = this.$$moment(new Date().getTime() - 3600 * 1000 * 24 * 30).format('YYYY-MM-DD');
        let endDate = this.$$moment(this.form.fTradeDate[1]).format('YYYY-MM-DD');
        let portfolioSecu = this.form.portfolioSecu;

        let queryData = JSON.parse(JSON.stringify(this.queryData));
        let data = queryData.concat([
          {"name": "startDate", "value": startDate},
          {"name": "endDate", "value": endDate},
          {"name": "portfolioSecu", "value": portfolioSecu || ''},
          {"name": "isSingle", "value": true}
        ]);
        api.instructionQuery(data).then(res => {
          this.tableData = res.data.data;
          this.dataTotal = res.data.recordsFiltered;
          this.loading = false;
        })
      },
      tableSort (column) {
        if (!column.column || !column.prop || !column.order) return;
        this.queryData = utils.tableSort(column, this.queryData);
        this.query();
      },
      handleSizeChange (size) {
        if (!size) return;
        this.pageSize = size;
        this.queryData = utils.tableSizeChange(size, this.queryData);
        this.query();
      },
      handleCurrentChange (num) {
        if (!num) return;
        this.currentPage = num;
        this.queryData = utils.tableCurrentChange(num, this.queryData);
        this.query();
      }
    },
    mounted () {
      this.init();
    }
  }
</script>

<style scoped lang="scss">
  .container {
    padding: 20px;
  }

  .cell {
    white-space: nowrap;
  }

</style>
