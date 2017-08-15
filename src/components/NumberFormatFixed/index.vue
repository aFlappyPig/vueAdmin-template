<template>
  <div class="el-input">
    <input
      class="el-input__inner"
      ref="input"
      v-bind:value="value"
      v-on:input="updateValue($event.target.value)">
  </div>
</template>

<script>
  /**
   * Created by jiannan.niu on 2017/8/15.
   */
  import accounting from 'accounting'

  export default {
    name: 'number-format-fixed',
    props: ['value', 'fixed'],
    methods: {
      updateValue: function (value) {
        let fixed = this.fixed || 0;
        if (value) {
          let pos = this.$refs.input.selectionStart;
          let formattedValue = accounting.formatNumber(value, fixed);
          if (formattedValue !== value) {
            this.$refs.input.value = formattedValue;
            let newPos = +pos + formattedValue.length - value.length;
            this.$refs.input.setSelectionRange(newPos, newPos);
          }
          this.$emit('input', formattedValue);
        } else {
          this.$refs.input.value = undefined;
          this.$emit('input', undefined);
        }
      }
    }
  }
</script>

<style>

</style>
