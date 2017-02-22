<template>
            <div class="ui-panel">

                <div class="ui-panel-title">Dropdown 下拉</div>
                <div class="ui-panel-content">
                    <table class="table table-bordered">
                        <thead>
                            <td colspan="2">组件说明</td>
                        </thead>
                        <tr>
                            <td>触发元素</td>
                            <td>触发下拉的元素需要添加 data-toggle="dropdown" 属性</td>
                        </tr>
                        <tr>
                            <td>下拉菜单</td>
                            <td>下拉菜单需要添加 slot="dropdown-menu" 属性</td>
                        </tr>
                        <tr>
                            <td>触发事件 trigger</td>
                            <td>click,hover</td>
                        </tr>
                        <tr>
                            <td>点击菜单子元素隐藏下拉菜单</td>
                            <td>菜单子元素的末级元素需要添加 name="dropdown-item" 属性</td>
                        </tr>
                        <tr>
                            <td>placement</td>
                            <td>默认向下向右，placement="dropup-dropleft":上右， dropup:上， dropleft:左 ，dropright:右</td>
                        </tr>
                    </table>

                    <div>

                    <v-dropdown>
                      <div data-toggle="dropdown">下拉选择 <i class="material-icons _icon_more">expand_more</i></div>
                      <ul slot="dropdown-menu" class="dropdown-menu">
                          <li>
                              <a name="dropdown-item" href="javascript:;">选项1</a>
                          </li>
                          <li>
                              <a name="dropdown-item" href="javascript:;">选项2</a>
                          </li>
                          <li>
                              <a name="dropdown-item" href="javascript:;">选项3</a>
                          </li>

                          <li role="separator" class="divider"></li>
                          <li>
                              <a name="dropdown-item" href="javascript:;">选项4</a>
                          </li>
                      </ul>
                    </v-dropdown>
                    </div>

                    <div>
                    <v-dropdown placement="dropup">
                      <div data-toggle="dropdown">上拉选择</div>
                      <ul slot="dropdown-menu" class="dropdown-menu">
                          <li>
                              <a name="dropdown-item" href="javascript:;">选项1</a>
                          </li>
                          <li>
                              <a name="dropdown-item" href="javascript:;">选项2</a>
                          </li>
                          <li>
                              <a name="dropdown-item" href="javascript:;">选项3</a>
                          </li>

                          <li role="separator" class="divider"></li>
                          <li>
                              <a name="dropdown-item" href="javascript:;">选项4</a>
                          </li>
                      </ul>
                    </v-dropdown>
                    </div>

                    <div>



                            <v-dropdown class="btn-group">
                          <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Action <span class="caret"></span>
                          </button>
                          <ul slot="dropdown-menu" class="dropdown-menu">
                            <li><a name="dropdown-item" href="#">Action</a></li>
                            <li><a name="dropdown-item" href="#">Another action</a></li>
                            <li><a name="dropdown-item" href="#">Something else here</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a name="dropdown-item" href="#">Separated link</a></li>
                          </ul>
                          </v-dropdown>


                    </div>


                    <div>
                        <!-- Split button -->

                        <v-dropdown class="btn-group" placement="dropup" >
                          <button type="button" class="btn btn-default">Action</button>
                          <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="caret"></span>
                            <span class="sr-only">Toggle Dropdown</span>
                          </button>
                          <ul slot="dropdown-menu" class="dropdown-menu">
                            <li><a name="dropdown-item" href="#">Action</a></li>
                            <li><a name="dropdown-item" href="#">Another action</a></li>
                            <li><a name="dropdown-item" href="#">Something else here</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a name="dropdown-item" href="#">Separated link</a></li>
                          </ul>
                          </v-dropdown>


                        <v-dropdown class="btn-group" :dropdownvalue.sync="dropvalue" :dropdownname.sync="dropname" placement="dropup">
                          <button type="button" class="btn btn-primary">{{dropname}}</button>
                          <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="caret"></span>
                            <span class="sr-only">Toggle Dropdown</span>
                          </button>
                          <ul slot="dropdown-menu" class="dropdown-menu">
                            <li><a name="dropdown-item" href="#">Action</a></li>
                            <li><a name="dropdown-item" href="#">Another action</a></li>
                            <li><a name="dropdown-item" href="#">Something else here</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a name="dropdown-item" href="#">Separated link</a></li>
                          </ul>
                          </v-dropdown>
                    </div>

                    <div>



                        <v-dropdown>
                          <input data-toggle="dropdown" type="text" class="form-control" placeholder="请选择组织" readonly="" _v-1ab85871="">
                          <ul slot="dropdown-menu" class="dropdown-menu">
                            <li><a name="dropdown-item" href="#">Action</a></li>
                            <li><a name="dropdown-item" href="#">Another action</a></li>
                            <li><a name="dropdown-item" href="#">Something else here</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a name="dropdown-item" href="#">Separated link</a></li>
                          </ul>
                          </v-dropdown>
                        <v-dropdown>
                          <input data-toggle="dropdown" type="text" class="form-control" placeholder="请选择组织" readonly="" _v-1ab85871="">
                          <ul slot="dropdown-menu" class="dropdown-menu">
                            <li><a name="dropdown-item" href="#">Action</a></li>
                            <li><a name="dropdown-item" href="#">Another action</a></li>
                            <li><a name="dropdown-item" href="#">Something else here</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a name="dropdown-item" href="#">Separated link</a></li>
                          </ul>
                          </v-dropdown>
                    </div>
                </div>
            </div>
</template>
<script type="text/javascript">
export default{
  data(){
    return {
      dropvalue:'',
      dropname:'下拉菜单',
    }
  }

}
</script>
