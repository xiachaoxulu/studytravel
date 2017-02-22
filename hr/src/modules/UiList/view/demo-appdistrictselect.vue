<template>
  <div class="ui-panel">
    <div class="ui-panel-title">行政区域选择</div>
    <div class="ui-panel-content">
      <table class="table table-bordered">
        <thead>
          <td colspan="2">组件说明</td>
        </thead>
        <tr>
          <td>触发元素</td>
          <td>触发下拉的元素需要添加 data-toggle="dropdown" 属性</td>
        </tr>
      </table>
      <div>
        <app-district-select :level="2" :province.sync="province" :city.sync="city" :area.sync="area"></app-district-select>
      </div>
      <div>选择省份：{{province}}</div>
      <div>选择城市：{{city}}</div>
      <div>选择区域：{{area}}</div>
      <div>
        <app-district-select :level="3" :province.sync="province1" :city.sync="city1" :area.sync="area1"></app-district-select>
      </div>
      <div>选择省份：{{province1}}</div>
      <div>选择城市：{{city1}}</div>
      <div>选择区域：{{area1}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      province: null,
      city: null,
      area: null,
      province1: null,
      city1: null,
      area1: null
    };
  }
};
</script>
<style lang="css" scoped>
</style>
