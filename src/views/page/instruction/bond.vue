<template>
  <el-form :inline="true" ref="form" :model="form" label-width="110px">
    账户信息
    <hr>
    <el-row type="flex" justify="space-around">
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="投资组合">
          <el-select v-model="form.por" placeholder="请选择">
            <el-option
              v-for="item in form.options"
              :key="item.id"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="会计分类">
          <el-select v-model="form.exe" placeholder="请选择">
            <el-option
              v-for="item in form.options"
              :key="item.id"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="交易员">
          <el-select v-model="form.trader" placeholder="请选择">
            <el-option
              v-for="item in form.options"
              :key="item.id"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    交易对手
    <hr>
    <el-row type="flex" justify="space-around">
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="交易对手">
          <el-select v-model="form.por" placeholder="请选择">
            <el-option
              v-for="item in form.options"
              :key="item.id"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="对手交易员">
          <el-select v-model="form.exe" placeholder="请选择">
            <el-option
              v-for="item in form.options"
              :key="item.id"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="资金账户">
          <el-select v-model="form.trader" placeholder="请选择">
            <el-option
              v-for="item in form.options"
              :key="item.id"
              :label="item.label"
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
        <el-form-item label="执行市场">
          <el-select v-model="form.por" placeholder="请选择">
            <el-option
              v-for="item in form.options"
              :key="item.id"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="报价类型">
          <el-select v-model="form.exe" placeholder="请选择">
            <el-option
              v-for="item in form.options"
              :key="item.id"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="交易日期">
          <el-col :span="24">
            <el-date-picker
              v-model="form.date"
              type="date"
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
        <el-form-item label="标的债券">
          <el-select
            v-model="form.bCode"
            multiple
            filterable
            remote
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="loading">
            <el-option
              v-for="item in searchResult"
              :key="item.id"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="交易方向">
          <el-select v-model="form.exe" placeholder="请选择">
            <el-option
              v-for="item in form.options"
              :key="item.id"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="债券面额(万元)">
          <el-input
            placeholder="请输入内容"
            v-model="form.input"
            :disabled="false">
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="清算速度">
          <el-radio-group v-model="form.speed">
            <el-radio label="0">T+0</el-radio>
            <el-radio label="1">T+1</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="结算日期">
          <el-date-picker
            v-model="form.date"
            type="date"
            :disabled="form.true"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="到期收益率(%)">
          <el-input
            placeholder="请输入内容"
            v-model="form.input"
            :disabled="form.false">
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="净价(元)">
          <el-input
            placeholder="请输入内容"
            v-model="form.input"
            :disabled="form.false">
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="应计利息(元)">
          <el-input
            placeholder="请输入内容"
            v-model="form.input"
            :disabled="form.false">
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="全价(元)">
          <el-input
            placeholder="请输入内容"
            v-model="form.input"
            :disabled="form.false">
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="总应计利息(元)">
          <el-input
            placeholder="请输入内容"
            v-model="form.input"
            :disabled="form.false">
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="结算金额(元)">
          <el-input
            placeholder="请输入内容"
            v-model="form.input"
            :disabled="form.false">
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :lg="8" :md="6" :sm="6" :xs="6">
        <el-form-item label="行权收益率(%)">
          <el-input
            placeholder="请输入内容"
            v-model="form.input"
            :disabled="form.false">
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-form-item label="备注" class="textarea-last">
        <el-input
          placeholder="请输入内容"
          v-model="form.input"
          :disabled="form.false">
        </el-input>
      </el-form-item>
    </el-row>
    <hr>
    <el-row type="flex" justify="space-around">
      <el-form-item>
        <el-button type="primary" @click="">重置</el-button>
        <el-button type="primary" @click="">保存</el-button>
        <el-button type="primary" @click="">保存并提交</el-button>
      </el-form-item>
    </el-row>
  </el-form>
</template>
<script>
  /**
   * Created by jiannan.niu on 2017/8/8.
   */
  export default {
    name: 'bond',
    data () {
      return {
        searchResult: [],
        loading: true,
        form: {
          options: [
            {id: 1, value: 1, label: '区域一二三四五六七八九十'},
            {id: 2, value: 2, label: '区域二'},
          ],
          trader: '',
          exe: '',
          por: '',
          date: new Date(),
          bCode: '',
          input: '',
          speed: '0',
          false: false,
          true: true
        }
      }
    },
    methods: {
      remoteMethod (query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;

          }, 200);
        } else {

        }
      }
    }
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
