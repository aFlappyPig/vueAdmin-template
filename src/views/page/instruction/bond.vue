<template>
  <el-form :inline="true" ref="form" :model="form" :rules="rules" label-width="120px">
    账户信息
    <hr>
    <el-row type="flex" justify="space-around">
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="投资组合" prop="portfolioSecu">
          <el-select v-model="form.portfolioSecu" placeholder="请选择" @change="portfolioChange">
            <el-option
              v-for="item in select.portfolioSecu"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="会计分类" prop="fAccountingType">
          <el-select v-model="form.fAccountingType" placeholder="请选择" :disabled="!form.portfolioSecu">
            <el-option
              v-for="item in select.fAccountingType"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="交易员" prop="fExecutor">
          <el-select v-model="form.fExecutor" placeholder="请选择" :disabled="!form.portfolioSecu" clearable>
            <el-option
              v-for="item in select.fExecutor"
              :key="item.id"
              :label="item.firstName + item.lastName"
              :value="item.userName">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    交易对手
    <hr>
    <el-row type="flex" justify="space-around">
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="交易对手" prop="fCounterpartyId">
          <el-select v-model="form.fCounterpartyId" placeholder="请选择" @change="fCounterpartyIdChange">
            <el-option
              v-for="item in select.fCounterpartyId"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="对手交易员" prop="fCpTrader">
          <el-select v-model="form.fCpTrader" placeholder="请选择" :disabled="!form.fCounterpartyId" clearable>
            <el-option
              v-for="item in select.fCpTrader"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="资金账户" prop="fCpCashacc">
          <el-select v-model="form.fCpCashacc" placeholder="请选择" :disabled="!form.fCounterpartyId" clearable>
            <el-option
              v-for="item in select.fCpCashacc"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    基本要素
    <hr>
    <el-row type="flex" justify="space-around">
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="执行市场" prop="execution">
          <el-select v-model="form.execution" placeholder="请选择" @change="executionChange">
            <el-option
              v-for="item in select.execution"
              :key="item.value"
              :label="item.value"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="报价类型" prop="fQuoteType">
          <el-select v-model="form.fQuoteType" placeholder="请选择">
            <el-option
              v-for="item in select.fQuoteType"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="交易日期" prop="fTradeDate">
          <el-col :span="24">
            <el-date-picker
              v-model="form.fTradeDate"
              format="yyyy-MM-dd"
              type="date"
              @change="fSettleDateChange"
              :picker-options="pickerOptions"
              placeholder="选择日期">
            </el-date-picker>
          </el-col>
        </el-form-item>
      </el-col>
    </el-row>
    交易要素
    <hr>
    <el-row type="flex" justify="space-around">
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="标的债券" prop="bond">
          <el-select
            v-model="form.bond"
            :disabled="!form.execution"
            filterable
            remote
            placeholder="请输入关键词"
            @change="bAiChange"
            :remote-method="remoteMethod"
            :loading="loading">
            <el-option
              v-for="item in bondInfo"
              :key="item.bId"
              :label="item.bCode + ' ' + item.bName"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="交易方向" prop="fTradeDirection">
          <el-select v-model="form.fTradeDirection" placeholder="请选择">
            <el-option
              v-for="item in select.fTradeDirection"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="债券面额(万元)" prop="trdParValue">
          <el-input
            placeholder="请输入内容"
            v-model="form.trdParValue"
            :disabled="false">
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="清算速度" prop="fSettleSpeed">
          <el-radio-group v-model="form.fSettleSpeed" @change="fSettleDateChange">
            <el-radio label="0">T+0</el-radio>
            <el-radio label="1">T+1</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="结算日期" prop="fSettleDate">
          <el-date-picker
            v-model="form.fSettleDate"
            type="date"
            @change="bAiChange"
            :disabled="true"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="到期收益率(%)" prop="trdYtm">
          <el-input
            :disabled="!bond || !form.trdParValue"
            placeholder="请输入内容"
            @blur="calcByBond(1)"
            v-model="form.trdYtm">
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="净价(元)" prop="trdNetPrice">
          <el-input
            placeholder="请输入内容"
            v-model="form.trdNetPrice"
            @blur="calcByBond(2)"
            :disabled="!bond || !form.trdParValue">
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="应计利息(元)" prop="trdAi">
          <el-input
            placeholder="请输入内容"
            v-model="form.trdAi"
            :disabled="true">
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="全价(元)" prop="trdFullPrice">
          <el-input
            placeholder="请输入内容"
            v-model="form.trdFullPrice"
            @blur="calcByBond(3)"
            :disabled="!bond || !form.trdParValue">
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="总应计利息(元)" prop="trdTotolAi">
          <el-input
            placeholder="请输入内容"
            v-model="form.trdTotolAi"
            @blur="calcByBond(4)"
            :disabled="!bond || !form.trdParValue">
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="结算金额(元)" prop="trdSettleAmount">
          <el-input
            placeholder="请输入内容"
            v-model="form.trdSettleAmount"
            :disabled="true">
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="行权收益率(%)" prop="trdExerciseYield">
          <el-input
            placeholder="请输入内容"
            v-model="form.trdExerciseYield">
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-form-item label="备注" class="textarea-last" prop="fRemarks">
        <el-input
          placeholder="请输入内容"
          v-model="form.fRemarks"
          :disabled="form.false">
        </el-input>
      </el-form-item>
    </el-row>
    <hr>
    <el-row type="flex" justify="space-around">
      <el-form-item>
        <el-button type="primary" @click="resetForm('form')">重置</el-button>
        <el-button type="primary" @click="submit(1)" :disabled="isSubmit">保存</el-button>
        <el-button type="primary" @click="submit(2)" :disabled="isSubmit">保存并提交</el-button>
      </el-form-item>
    </el-row>
  </el-form>
</template>
<script>
  /**
   * Created by jiannan.niu on 2017/8/8.
   */

  import * as api from '@/api/query'
  import store from '@/store/index'
  import {validatNumberLength} from '@/utils/validate'
  import {disabledDate} from '@/utils/datepicker'

  export default {
    name: 'bond',
    data () {
      return {
        loading: false,
        isSubmit: false,
        bondInfo: undefined,
        false: false,
        true: true,
        bond: undefined,
        pickerOptions: {
          disabledDate
        },
        form: {
          portfolioSecu: undefined,
          fAccountingType: undefined,
          fCounterpartyId: undefined,
          fCpCashacc: undefined,
          execution: undefined,
          fQuoteType: undefined,
          instrument: undefined,
          fTradeDirection: undefined,
          fExecutor: undefined,
          fCpTrader: undefined,
          trdParValue: undefined,
          trdYtm: undefined,
          trdNetPrice: undefined,
          trdAi: undefined,
          trdFullPrice: undefined,
          trdTotolAi: undefined,
          trdSettleAmount: undefined,
          trdExerciseYield: undefined,
          fRemarks: undefined,
          fSettleSpeed: '0',
          bond: undefined,
          fTradeDate: this.$$moment().format('YYYY-MM-DD'),
          fSettleDate: this.$$moment().format('YYYY-MM-DD'),
          fStatus: undefined
        },
        select: {
          portfolioSecu: undefined,
          fAccountingType: undefined,
          fExecutor: undefined,
          fCounterpartyId: undefined,
          fCpTrader: undefined,
          fCpCashacc: undefined,
          execution: undefined,
          fQuoteType: undefined,
          fTradeDirection: undefined
        },
        rules: {
          portfolioSecu: [
            {required: true, message: '请选择投资组合'}
          ],
          fAccountingType: [
            {required: true, message: '请选择会计分类'}
          ],
          fCounterpartyId: [
            {required: true, message: '请选择交易对手'}
          ],
          execution: [
            {required: true, message: '请选择执行市场'}
          ],
          fQuoteType: [
            {required: true, message: '请选择报价类型'}
          ],
          fTradeDate: [
            {required: true, message: '请选择交易日期'}
          ],
          bond: [
            {required: true, message: '请选择标的债券(填写无效)'}
          ],
          fTradeDirection: [
            {required: true, message: '请选择交易方向'}
          ],
          trdParValue: [
            {required: true, message: '请填写债券面额'},
            {type: 'number', message: '必须为数字'},
            {validator: validatNumberLength}
          ],
          fSettleSpeed: [
            {required: true, message: '请选择清算速度'}
          ],
          fSettleDate: [
            {required: true, message: '请选择结算日期'}
          ],
          trdYtm: [
            {required: true, message: '请填写到期收益率'},
            {type: 'number', message: '必须为数字'},
            {validator: validatNumberLength}
          ],
          trdNetPrice: [
            {required: true, message: '请填写净价'},
            {type: 'number', message: '必须为数字'},
            {validator: validatNumberLength}
          ],
          trdAi: [
            {required: true, message: '请填写应计利息'},
            {type: 'number', message: '必须为数字'},
            {validator: validatNumberLength}
          ],
          trdFullPrice: [
            {required: true, message: '请填写全价'},
            {type: 'number', message: '必须为数字'},
            {validator: validatNumberLength}
          ],
          trdTotolAi: [
            {required: true, message: '请通过净价、全价或到期收益率计算总应计利息'},
            {type: 'number', message: '必须为数字'},
            {validator: validatNumberLength}
          ],
          trdSettleAmount: [
            {required: true, message: '请通过净价、全价或到期收益率计算结算金额'},
            {type: 'number', message: '必须为数字'},
            {validator: validatNumberLength}
          ],
          trdExerciseYield: [
            {validator: validatNumberLength}
          ]
        }
      }
    },
    methods: {
      init () {
        this.$$axios.all([
          api.getPortfolioTypes(),
          api.getFCounterpartyId(),
          api.getExecution(),
          api.getFTradeDirection(),
          api.getFQuoteType()
        ]).then(this.$$axios.spread((portfolioSecu, fCounterpartyId, execution, fTradeDirection, fQuoteType) => {
          this.select.portfolioSecu = portfolioSecu.data;
          this.select.fCounterpartyId = fCounterpartyId.data;
          this.select.execution = execution.data;
          this.select.fTradeDirection = fTradeDirection.data;
          this.select.fQuoteType = fQuoteType.data;
        }))
      },
      //投资组合更改
      portfolioChange () {
        if (!this.form.portfolioSecu) return;
        this.form.fAccountingType = undefined;
        this.form.fExecutor = undefined;
        this.$$axios.all([
          api.getAccountingTypes(this.form.portfolioSecu),
          api.getfExecutors(this.form.portfolioSecu)
        ]).then(this.$$axios.spread((fAccountingType, fExecutor) => {
          this.select.fAccountingType = fAccountingType.data;
          this.select.fExecutor = fExecutor.data;
        }))
      },
      //交易对手更改
      fCounterpartyIdChange () {
        if (!this.form.fCounterpartyId) return;
        this.form.fCpTrader = undefined;
        this.form.fCpCashacc = undefined;
        this.$$axios.all([
          api.getFCpTrader(this.form.fCounterpartyId),
          api.getFCpCashacc(this.form.fCounterpartyId)
        ]).then(this.$$axios.spread((fCpTrader, fCpCashacc) => {
          this.select.fCpTrader = fCpTrader.data;
          this.select.fCpCashacc = fCpCashacc.data;
        }))
      },
      //执行市场更改
      executionChange () {
        this.form.bond = undefined;
        this.bondInfo = undefined;
      },
      //远程获取和查询数据
      remoteMethod (query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            api.getBondInfo(this.form.execution.name, query).then(res => {
              this.loading = false;
              this.bondInfo = res.data;
            })
          }, 350);
        } else {
          this.loading = false;
          this.bondInfo = undefined;
          this.form.bond = undefined;
        }
      },
      //结算日期变动，与交易日期和清算速度有关
      fSettleDateChange () {
        if (+this.form.fSettleSpeed === 1) {
          let date = this.$$moment(this.form.fTradeDate);
          do {
            date = date.add(1, 'days');
            console.log(date.format('YYYY/M/D'))
            console.log(store.getters.calendar[date.format('YYYY/M/D')])
          } while (store.getters.calendar[date.format('YYYY/M/D')] !== 'Y');
          this.form.fSettleDate = date.format('YYYY-MM-DD');
        } else {
          this.form.fSettleDate = this.form.fTradeDate;
        }
      },
      //应计利息变动，与所选债券和结算日期有关
      bAiChange () {
        if (!this.form.bond || !this.form.fSettleDate) {
          this.form.trdAi = undefined;
          this.$forceUpdate();
          return;
        }
        let data = {
          bCode: this.form.bond.bCode,
          startDate: this.form.bond.startDate.trim(),
          maturityDate: this.form.bond.maturityDate.trim(),
          paymentFrequency: this.form.bond.paymentFrequency,
          bPutoffCoupontype: this.form.bond.bPutoffCoupontype,
          bIssueParvalue: this.form.bond.bIssueParvalue,
          rate: this.form.bond.rate,
          dayCount: this.form.bond.dayCount,
          valueDate: this.$$moment(this.form.fSettleDate).format('YYYY-MM-DD')
        };
        api.calcBAi(data).then(res => {
          this.form.trdAi = res.data;
          this.$forceUpdate();
        })
      },
      //计算
      calcByBond (value) {
        if (!this.form.bond || !value) return;
        if ((value === 1 && !this.form.trdYtm) || (value === 3 && !this.form.trdFullPrice) || (value === 2 && !this.form.trdNetPrice)) {
          this.form.trdNetPrice = undefined;
          this.form.trdYtm = undefined;
          this.form.trdFullPrice = undefined;
          this.form.trdTotolAi = undefined;
          this.form.trdSettleAmount = undefined;
          return;
        }
        let data = {
          bCode: this.form.bond.bCode,
          bId: this.form.bond.bId,
          cId: this.form.bond.cId,
          bAi: this.form.trdAi,
          bIssueParValue: this.form.trdParValue,
          calculateType: value,
          valueDate: this.$$moment(this.form.fSettleDate).format('YYYY-MM-DD'),
          yieldToMaturity: this.form.trdYtm,
          cleanPrice: this.form.trdNetPrice,
          allPrice: this.form.trdFullPrice,
          countAi: this.form.trdTotolAi
        }

        api.calcValue(data).then(res => {
          if (value === 4) {
            this.form.trdSettleAmount = res.data || this.form.trdSettleAmount;
          } else {
            this.form.trdNetPrice = res.data.cleanPrice;
            this.form.trdYtm = res.data.yield;
            this.form.trdFullPrice = res.data.allPrice;
            this.form.trdAi = res.data.bAi;
            this.form.trdTotolAi = res.data.countAi;
            this.form.trdSettleAmount = res.data.countAllPrice;
          }
        })
      },

      //保存并且提交
      submit (value) {
        this.$refs.form.validate((valid) => {
          console.log(valid)
          if (valid) {
            console.log('hah')
            return
            this.isSubmit = true;
            let data = Object.assign({}, this.form);

            data.fTradeDate = this.$$moment(data.fTradeDate).format('YYYY-MM-DD');
            data.fSettleDate = this.$$moment(data.fSettleDate).format('YYYY-MM-DD');
            data.execution = data.execution.name;
            data.instrument = this.form.bond.bCode;
            data.fStatus = value;
            console.log(data)

            api.submitData(data).then(res => {
              if (res.data === 1) {
                alert('成功')
                this.resetForm('form');
              }
              this.isSubmit = false;
            }).catch(err => {
              this.isSubmit = false;
            })
          } else {

          }
        })
      },
      //重置按钮
      resetForm (formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted () {
      this.init();
    },
    computed: {}
  }
</script>

<style scoped lang="scss">
  .el-form {
    padding: 20px;
  }

  hr {
    border-color: rgba(131, 145, 165, .2);
  }

  .el-form-item {
    margin-top: 10px;
  }

  .el-date-editor.el-input {
    width: auto;
  }

  .el-input {
    margin-right: 25px;
  }

</style>
<style lang="scss">
  .textarea-last {
    width: 100%;
    .el-form-item__content {
      width: calc(68% + 200px);
    }
  }
</style>
