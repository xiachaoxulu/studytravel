<template>
    <div class="wrap mod-workflowSetting">
        <header class="ui-module-navbar pos-topbar-fixed">
            <div class="ui-module-navbar-content">
                <div class="pull-left title">
                    <h4><strong>审批设置</strong></h4>
                </div>
                <!-- <div class="pull-left emp-center-tab">
                    <ui-buttongroup active-class="btn-primary">
                        <button type="button" class="btn btn-primary">&nbsp;自定义&nbsp;</button>
                        <button type="button" class="btn btn-default">共享模版</button>
                    </ui-buttongroup>
                </div> -->
                <div class="pull-right vacation-right">
                    <button __code="config-workflow-edit/修改" type="button " class="ui-tool-button" @click="toChangeWorkflow">
                        <span class="icon icon-tool icon-tool-edit pull-left"></span>
                        <span class="_name pull-left">修改</span>
                    </button>
                    <button __code="config-workflow-save/保存" type="button " class="ui-tool-button" @click="toSaveWorkflow">
                        <span class="icon icon-tool icon-tool-save pull-left"></span>
                        <span class="_name pull-left">保存</span>
                    </button>
                    <button __code="config-workflow-submit/提交" type="button " class="ui-tool-button" @click="toSaveWorkflow('submit')">
                        <span class="icon icon-tool icon-tool-work pull-left"></span>
                        <span class="_name pull-left">提交</span>
                    </button>
                    <v-dropdown class="ui-tool-dropdown" trigger="click">
                        <button type="button" data-toggle="dropdown" class="ui-tool-button">
                            <span class="icon icon-tool icon-tool-more pull-left"></span>
                            <span class="_name pull-left">更多</span>
                        </button>
                        <ul class="dropdown-menu">
                            <li __code="config-workflow-del/删除" @click="toDeleteWorkflow">
                                <a href="javascript:void(0)" name="dropdown-item">删除</a>
                            </li>
                        </ul>
                    </v-dropdown>
                </div>
            </div>
        </header>
        <section class="ui-module-content ui-panel" style="position: relative;">
            <div class="workflowInfo form-body">
                <div class="_name _text pull-left">
                    工作流名称
                </div>
                <div class="_input pull-left">
                    <div class="input-inline input-medium">
                        <input type="text" class="form-control" placeholder="工作流名称" v-model="workflow.workflowName" vali="required" vali-msg="必填项" :disabled="editType==='show'?true:false">
                    </div>
                </div>
                <div class="_text pull-left">
                    选择业务
                </div>
                <div class="_input pull-left">
                    <div class="input-inline input-medium" style="width:200px;">
                        <select v-model="workflow.busCode" class="form-control"  vali="required" vali-msg="必填项" :disabled="busCodeLocked?true:false">
                          <option value="">请选择</option>
                          <template v-for="item in state.commonData.codeBus">
                            <option value="{{item.code}}" :selected="item.code==workflow.busCode">{{item.codeName}}</option>
                          </template>
                        </select>
                    </div>
                </div>
                <div class="_text pull-left">
                    选择组织
                </div>
                <div class="_input pull-left">
                    <ui-combotree
                        :enabledrop="editType==='show'?false:true"
                        :tree="orgTree"
                        :selected-value.sync="workflow.orgId | orgDataFilter"
                        :multiple="true"
                        :checkable="true"
                        :rootvisible="false"
                        vali="required"
                        vali-msg="必填项"
                        placeholder="请选择组织"
                        idprop="organizeID"
                        textprop="text"
                    ></ui-combotree>
                </div>
            </div>
            <!-- 工作流 -->
            <div id="stageBox">
                <div id="nodeMenu" class="hotbox" >
                    <div class="state main">
                        <div class="ring-shape" style="margin-top: -90px; margin-left: -90px; height: 180px; width: 180px;"></div>
                        <div class="center">
                            <div class="tool_eidtNode button enabled">
                                <span class="_label">编辑</span>
                                <span class="_key">F2</span>
                            </div>
                        </div>
                        <div class="ring">
                            <div class="tool_delNode button enabled" style="left: 0px; top: -90px;">
                                <span class="_label">删除</span>
                                <span class="_key">Alt+Up</span>
                            </div>
                            <div class="tool_addNodeChild button enabled" style="left: 90px; top: 0px;">
                                <span class="_label">下级节点</span>
                                <span class="_key">Enter</span>
                            </div>
                            <div class="tool_path button enabled" style="left:0px; top: 90px;">
                                <span class="_label">分支</span>
                                <span class="_key">Alt+Down</span>
                            </div>
                            <div class="tool_addNodeBrother button enabled" style="left: -90px; top: 0px;">
                                <span class="_label">同级节点</span>
                                <span class="_key">Delete</span>
                            </div>
                        </div>
                    </div>
                </div>
                <svg id="stage">
                    <defs>
                        <path id="userSingle" transform="scale(0.025, 0.025) translate(80,80)" d="M926.26863 957.936375l-55.567573 0C859.981924 816.071344 768.64366 697.151907 642.9264 647.223774c-39.952944 19.377326-84.538395 30.569226-131.806955 30.569226-47.273676 0-91.879594-11.192923-131.830491-30.569226-125.716236 49.928133-217.054501 168.847569-227.756237 310.713624l-55.584969 0c9.907651-151.502529 99.44899-280.826943 226.671533-346.280678C251.660158 555.227524 205.943954 467.874013 205.943954 369.606942c0-170.193217 136.641053-308.165592 305.176514-308.165592 168.520111 0 305.160141 137.973398 305.160141 308.165592 0 98.267071-45.716204 185.620581-116.67328 242.049778C826.829873 677.110455 916.358933 806.434869 926.26863 957.936375zM760.786715 369.606942c0-139.254577-111.795179-252.137531-249.666246-252.137531-137.89665 0-249.693876 112.882953-249.693876 252.137531 0 139.248438 111.797225 252.144694 249.693876 252.144694C648.991536 621.751636 760.786715 508.85538 760.786715 369.606942z"></path>

                        <path id="userGroup" transform="scale(0.03, 0.03)" d="M206.401372 878.330316c-15.116279 0-27.414373-12.310374-27.414373-27.443026l0-67.89739c0-67.796082 20.374026-133.061528 58.917878-188.740642 37.632085-54.359049 89.86675-96.012727 151.058414-120.454396l10.538007-4.208858-8.92016-7.014764c-48.123021-37.84084-75.723635-94.354971-75.723635-155.051355 0-108.74982 88.462774-197.22385 197.199291-197.22385 108.74982 0 197.224874 88.474031 197.224874 197.22385 0 60.721967-27.599591 117.237121-75.721589 155.050332l-8.927323 7.014764 10.54517 4.209882c61.200874 24.440645 113.439632 66.093301 151.069671 120.454396 38.538735 55.67502 58.907645 120.94149 58.904575 188.739619l0 67.898413c0 15.132652-12.31242 27.443026-27.446096 27.443026L206.401372 878.330316zM512.110005 504.725316c-153.447834 0-278.287097 124.82903-278.287097 278.265608l0 40.513716 556.499493 0 0-40.513716C790.322401 629.554346 665.515884 504.725316 512.110005 504.725316zM512.05577 165.118642c-78.516238 0-142.392034 63.880913-142.392034 142.401244 0 78.511121 63.87682 142.385894 142.392034 142.385894 78.512145 0 142.385894-63.874773 142.385894-142.385894C654.440641 228.998531 590.566892 165.118642 512.05577 165.118642zM70.529845 776.444834c-15.098883 0-27.384697-12.300141-27.384697-27.41642l0-52.528354c0-99.558483 54.599526-189.701526 142.493342-235.250932l7.546883-3.911076-5.710049-6.296403c-27.353998-30.173207-42.420135-69.073168-42.420135-109.532649 0-75.755358 51.368948-141.043317 124.920104-158.768003 2.039449-0.477884 4.16588-0.724501 6.284123-0.724501 12.783141 0 23.799032 8.622378 26.789133 20.968567 3.538593 14.694677-5.542226 29.550013-20.243043 33.106002-48.832172 11.730159-82.944084 55.080479-82.944084 105.417935 0 42.72508 25.26543 81.601506 64.366983 99.042737 3.365654 1.460258 6.155187 3.40147 8.585539 5.959735l0.157589 0.163729 0.166799 0.153496c0.26606 0.243547 0.520863 0.455371 0.769526 0.661056 0.014326 0.011256 0.027629 0.021489 0.041956 0.032746 1.26276 1.494027 2.39556 3.358491 3.737114 6.139837l0.292666 0.574075c0.562818 1.089821 1.052982 2.036379 1.388627 2.953262 0.24457 0.774643 0.553609 1.399883 0.802272 1.859347-0.00307 0.12382-0.00921 0.255827-0.014326 0.369414-0.028653 0.708128-0.065492 1.590218 0.037862 2.626827l0.031722 0.260943c0.339738 2.422166 0.423649 4.332678 0.267083 6.160303-0.099261 0.604774-0.265036 1.252527-0.453325 1.9934-0.099261 0.38681-0.197498 0.774643-0.291642 1.168616-0.234337 1.041726-0.36532 1.940189-0.481977 2.732228-0.145309 0.986467-0.282433 1.917676-0.512676 2.423189l-0.040932 0.093121c-3.728928 8.524141-11.7056 14.423501-21.339004 15.783475l-0.344854 0.049119-0.338714 0.084934c-93.448322 23.526833-158.714791 107.291608-158.714791 203.702402l0 52.528354C97.973894 764.144694 85.662497 776.444834 70.529845 776.444834zM953.461969 776.438695c-15.134699 0-27.447119-12.299117-27.447119-27.415396l0-52.532447c0-96.40977-65.264423-180.173522-158.714791-203.701378l-0.338714-0.084934-0.345877-0.049119c-9.629311-1.355881-17.605983-7.254218-21.336958-15.776312l-0.041956-0.094144c-0.231267-0.50449-0.366344-1.436722-0.511653-2.423189-0.116657-0.795109-0.248663-1.695618-0.463558-2.65241-0.098237-0.414439-0.181125-0.74906-0.265036-1.081635-0.200568-0.801249-0.373507-1.496074-0.457418-2.12643-0.186242-1.815345-0.11461-3.735068 0.228197-6.211469l0.024559-0.209778c0.11154-1.059122 0.072655-1.9934 0.045025-2.675946-0.004093-0.102331-0.008186-0.218988-0.01228-0.330528 0.275269-0.49221 0.620124-1.175779 0.87902-2.022053 0.176009-0.555655 0.547469-1.287319 0.978281-2.13564 0.196475-0.38681 0.394996-0.778736 0.588401-1.177825 1.075495-2.205225 2.300392-4.505617 3.931542-6.353708 0.197498-0.171915 0.517793-0.454348 0.86981-0.828878 2.480494-2.570545 5.330402-4.54041 8.709359-6.019087 39.116903-17.489326 64.361867-56.353472 64.361867-99.033527 0-49.007157-32.992415-92.085278-80.232322-104.757902-7.074116-1.904373-12.985756-6.444782-16.642029-12.784164-3.65525-6.342452-4.617158-13.735839-2.706645-20.817118 3.212158-11.9471 14.098089-20.288069 26.471908-20.288069 2.39249 0 4.790096 0.318248 7.126304 0.944512 71.133084 19.089777 120.813576 83.942831 120.813576 157.708881 0 40.426735-15.066137 79.326696-42.423205 109.534695l-5.701862 6.296403 7.541767 3.908006c87.880513 45.542242 142.468782 135.681192 142.462642 235.241722l0 52.532447C980.852806 764.140601 968.564945 776.438695 953.461969 776.438695z"></path>

                    </defs>
                </svg>
            </div>
        </div>

        <!-- 弹窗 -->
        <ui-modal :header="modalTitle" :show.sync="modalShow" :backdrop-dismissible="false" type="large" @close="onModalClose">
            <!-- 编辑节点 -->
            <template v-if="modalComponent==='editNode'&&modalShow">
                <ui-validator @successed="editNodeComplate">
                <div validator="form" class="form-horizontal container-fluid" vali-submit="editWorkflowBtn" >
                    <div class="form-body">
                        <div class="row">
                            <div class="col-sm-24">
                                <div class="form-group row">
                                    <label class="col-sm-6 control-label">节点名称</label>
                                    <div class="col-sm-10">
                                        <div class="input-inline input-medium">
                                            <input type="text" class="form-control" placeholder="工作流名称" v-model="nodeData.nodeName" vali="required" vali-msg="必填项">
                                        </div>
                                        <!-- <span class="help-block">必填项</span> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-24">
                                <div class="form-group row">
                                    <label class="col-sm-6 control-label">审批人</label>
                                    <div class="col-sm-10">
                                        <div class="input-inline input-medium">
                                            <ui-combotree
                                                :tree="postTree"
                                                :selected-value.sync="nodeData.examine"
                                                :multiple="true"
                                                :checkable="true"
                                                :rootvisible="false"
                                                vali="required"
                                                vali-msg="必填项"
                                                placeholder="请选择"
                                                idprop="ID"
                                                :checkonebyone="true"
                                                textprop="postName"
                                            ></ui-combotree>
                                        </div>
                                        <!-- <span class="help-block">必填项</span> -->
                                    </div>
                                    <div class="col-sm-8" style="padding-top: 5px;">
                                        <ui-switch class="pull-right" name="s1" :value.sync="nodeData.isexa" checked></ui-switch>
                                        <span class="pull-right" style="margin-top:5px; margin-right:20px;">会签</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-24">
                                <div class="form-group row">
                                    <label class="col-sm-6 control-label">特殊审批人</label>
                                    <div class="col-sm-10">
                                        <div class="input-inline input-medium">
                                            <ui-combotree
                                                :tree="postTree"
                                                :selected-value.sync="nodeData.specialExamine"
                                                :multiple="true"
                                                :checkable="true"
                                                :rootvisible="false"
                                                :checkonebyone="true"
                                                idprop="ID"
                                                textprop="postName"
                                            ></ui-combotree>
                                        </div>
                                        <!-- <span class="help-block">必填项</span> -->
                                    </div>
                                    <div class="col-sm-8" style="padding-top: 5px;">
                                        <ui-switch class="pull-right" name="s1" :value.sync="nodeData.isspecia" checked></ui-switch>
                                        <span class="pull-right" style="margin-top:5px; margin-right:20px;">会签</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="row">
                            <div class="col-sm-24">
                                <div class="form-group row">
                                    <label class="col-sm-6 control-label">特殊提醒人</label>
                                    <div class="col-sm-10">
                                        <div class="input-inline input-medium">
                                            <ui-combotree
                                                :tree="postTree"
                                                :selected-value.sync="nodeData.specialRemind"
                                                :multiple="true"
                                                :checkable="true"
                                                :rootvisible="false"
                                                :checkonebyone="true"
                                                idprop="ID"
                                                textprop="postName"
                                            ></ui-combotree>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                        <div class="row">
                            <div style="width: 95%; margin: 0 auto; border-top: 1px dashed #ccc;margin-bottom: 20px; margin-top: 10px;"></div>
                            <div class="col-sm-24">
                                <div class="form-group row">
                                    <div class="col-sm-6"></div>
                                    <div class="col-sm-18">
                                        <span class="pull-left" style="margin-top:5px; margin-right:20px;">多人审批时任意一人同意即通过审批</span>
                                        <ui-switch :value.sync="nodeData.approval" class="pull-right"></ui-switch>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="row">
                            <div class="col-sm-24">
                                <div class="form-group row">
                                    <div class="col-sm-6"></div>
                                    <div class="col-sm-18">
                                        <span class="pull-left" style="margin-top:5px; margin-right:20px;">多人审批时任意一人驳回即驳回</span>
                                        <ui-switch :value.sync="nodeData.reject" class="pull-right"></ui-switch>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                        <!-- <div class="row">
                            <div class="col-sm-24">
                                <div class="form-group row">
                                    <div class="col-sm-6"></div>
                                    <div class="col-sm-18">
                                        <ui-switch :value.sync="nodeData.allnode" class="pull-left"></ui-switch><span class="pull-left" style="margin-top:5px;">审批完成后各审批节点反馈审批结果</span>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                        <div class="form-actions" style="padding-top: 10px;">
                            <div class="row">
                                <div class="text-center">
                                    <ui-button id="editWorkflowBtn" color="accent">确定</ui-button>
                                    <!-- <ui-button color="default" @click="modalShow=false">取消</ui-button> -->
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                </ui-validator>
            </template>
            <!-- 编辑分支条件 -->
            <template v-if="modalComponent==='editIf'&&modalShow">
                <!-- <ui-validator v-ref:pathvalidator @successed="editPathComplate"> -->
                <div validator="form" vali-submit="editWorkflowPath">
                    <dl class="wk-conditionList" v-for="path in nodeData.conditions" v-if="path.valid">
                        <dt class="_info">
                            <strong class="_node">{{getNodeName(path.from)}}</strong>
                            至
                            <strong class="_node">{{getNodeName(path.to)}}</strong>
                            <button @click="editPath('delPath',path.ID,$index)">删除该分支</button>
                            <button @click="editPath('addField',path.ID,$index)"  style="margin-right:10px;">添加新字段</button>
                        </dt>
                        <dd class="_condition">
                            <ul>
                                <li v-for="field in path.fields">
                                    <div class="form-body">
                                        <div class="row">
                                            <label class="col-sm-3 control-label">字段</label>
                                            <div class="col-sm-6">
                                                 <div class="input-inline input-medium">
                                                    <select v-model="field.code" @change="setInputType(field.code,$parent.$index,$index)" class="form-control"  vali="required" vali-msg="必填项">
                                                      <option value="">请选择</option>
                                                      <template v-for="item in busFields">
                                                        <option value="{{item.fieldCode}}" :selected="item.code==field.code">{{item.fieldName}}</option>
                                                      </template>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                 <div class="input-inline input-medium">
                                                    <select v-model="field.symbol" class="form-control"  vali="required" vali-msg="必填项">
                                                      <option value="">请选择</option>
                                                        <template v-if="getInputFieldType(field.code,'PostTree') || getInputFieldType(field.code,'OrgTree')">
                                                            <option value="in" :selected="'in'==field.symbol">属于</option>
                                                            <option value="notin" :selected="'notin'==field.symbol">不属于</option>
                                                        </template>
                                                        <template v-else>
                                                            <option  v-for="item in symbolList" value="{{item.value}}" :selected="item.code==field.symbol">{{item.name}}</option>
                                                        </template>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="input-inline input-medium" style="width:120px;float: left;">
                                                    <!-- 输入框 -->
                                                    <template v-if="getInputFieldType(field.code,'String')">
                                                        <input :type="text" v-model="field.value" class="form-control" placeholder="输入字符"  vali="required" vali-msg="必填项">
                                                    </template>
                                                    <!-- 输入框 -->
                                                    <template v-if="getInputFieldType(field.code,'Number')">
                                                        <input :type="number" v-model="field.value" class="form-control" placeholder="输入数字"  vali="required" vali-msg="必填项">
                                                    </template>


                                                    <!-- 字典项 -->
                                                    <template v-if="getInputFieldType(field.code,'Code')">
                                                        <select v-model="field.value" class="form-control"  vali="required" vali-msg="必填项">
                                                          <option value="">请选择</option>
                                                          <template v-for="item in getInputFieldData(field.code)">
                                                            <option value="{{item.value}}" :selected="item.code==field.value">{{item.codeName}}</option>
                                                          </template>
                                                        </select>
                                                    </template>
                                                    <!-- 数据项 -->
                                                    <template v-if="getInputFieldType(field.code,'DataList')">
                                                        <select v-model="field.value" class="form-control"  vali="required" vali-msg="必填项">
                                                          <option value="">请选择</option>
                                                          <template v-for="item in getInputFieldData(field.code)">
                                                            <option value="{{item.fieldCode}}" :selected="item.code==field.value">{{item.fieldName}}</option>
                                                          </template>
                                                        </select>
                                                    </template>
                                                    <!-- 日期 -->
                                                    <template v-if="getInputFieldType(field.code,'Date')">
                                                        <ui-datepicker format="yyyy/MM/dd" :time.sync="field.value" width="100%" ></ui-datepicker>
                                                    </template>
                                                    <!-- 时间 -->
                                                    <template v-if="getInputFieldType(field.code,'Time')">

                                                    </template>
                                                    <!-- 岗位树 -->
                                                    <template v-if="getInputFieldType(field.code,'PostTree')">
                                                        <ui-combotree
                                                            :tree="postTree"
                                                            :selected-value.sync="field.value | orgDataFilter"
                                                            :multiple="true"
                                                            :checkable="true"
                                                            :rootvisible="false"
                                                            :checkonebyone="true"
                                                            idprop="ID"
                                                            textprop="postName"
                                                            vali="required" vali-msg="必填项"
                                                        ></ui-combotree>
                                                    </template>
                                                    <!-- 组织树 -->
                                                    <template v-if="getInputFieldType(field.code,'OrgTree')">
                                                        <ui-combotree
                                                            :tree="orgTree"
                                                            :selected-value.sync="field.value | orgDataFilter"
                                                            :multiple="true"
                                                            :checkable="true"
                                                            :rootvisible="false"
                                                            idprop="organizeID"
                                                            textprop="text"
                                                            vali="required" vali-msg="必填项"
                                                        ></ui-combotree>
                                                    </template>
                                                </div>

                                                <div style="float: left; padding-left: 5px; padding-top: 5px;">{{fieldUnit}}</div>

                                            </div>
                                            <div class="col-sm-3 text-right">
                                                <strong class="_delete" @click="editPath('delField',path.ID,$index)">
                                                    <i class="ui-icon material-icons" handletype="delete">delete</i>
                                                    <span>删除</span>
                                                </strong>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </dd>
                    </dl>

                    <div class="form-actions" style="padding-top: 30px;">
                        <div class="row">
                            <div class="text-center">
                                <ui-button color="accent"  id="editWorkflowPath" @click="editPathComplate">确定</ui-button>
                                <!-- <ui-button color="default" @click="editPath('cancel')">取消</ui-button> -->
                            </div>
                        </div>
                    </div>
                </div>
                <!-- </ui-validator> -->
            </template>

            <div slot="footer"></div>
        </ui-modal>
    </div>
</template>
<script>
import store from '../store'
import Snap from 'libs/snap.svg.js'
import Workflow from 'libs/workflow.js'
import uuid from 'libs/utils/uuid'

let _workflow,
    _workflowNodes    = [], // 节点列表
    _oldNodes         = [], // 加载的节点列表，此节点列表被修改,删除后flag需要改成A,D
    _nodesDeleted     = [], // 删除的节点
    _pathShouldDelete = []; // 删除节点时，将连接到本节点的路径添加到待删除列表，在保存的时候统一删除。设置当前节点时，会将这些路径过滤掉

export default {
    data() {
        return {
            state           : store.state,
            hasCreated      : false, // 是否已创建
            editType        : '',    // 操作类型 add,update
            modalShow       : false,  // modal显隐
            modalTitle      : '', // modal标题
            modalComponent  : '', // modal要显示的内容
            showCloseButton : true, // modal 是否显示close
            orgTree         : store.state.commonData.orgWithTeam, // 组织树
            postTree        : store.state.commonData.postTree,//岗位树

            // 工作流数据
            workflow   : {
                ID:"",    // 工作流id
                orgId: "[]", // 组织 ids
                workflowName: "", // 名称
                busCode: "", // 业务类型 字典项
                changeTime:"", // 修改时间
                createTime:"", // 创建时间
                valid: 0, // 0禁用工作流 1启用
                status:0,// 0保存-提交1
                flag:'A' //A添加 D删除 M修改
            },

            //
            // 当前编辑的节点，格式化及转化后数据
            nodeData:{
                // x: 0, // x 坐标
                // y: 0,// y 坐标
                // workflowId: 1, // 工作流id TODO
                // nodeId: '', // 节点id 开始节点-1 结束节点-2 其他new Date()
                // nodeName: 新节点, // 节点名
                // order:[0,0],//层级排序
                // conditions:[
                //     {
                //         ID:'',
                //         from:'',
                //         to:'',
                //         fields:[
                //             {
                //                 code   : '', // 字段code
                //                 symbol : '', // 符号
                //                 value  : ''  // 赋值
                //             }
                //         ],
                //         valid:true
                //     }
                // ], // 判断条件
                // examine:[], // 审批人 岗位ids
                // isexa:0,//是否勾选直属上级 1,是  0，否
                // specialExamine: [], // 特殊审批人 岗位ids
                // isspecia:0,//特殊审批人 是否直属上级
                // exaPhoto: 0, // 是否显示审批人照片
                // remind:[],//提醒人
                // specialRemind: [], // 特殊提醒人 岗位ids
                // remPhoto: 0, // 特殊提醒人是否显示照片
                // approval: 0, // 一人审批通过就通过
                // reject: 0, // 任意一人驳回就驳回
                // allnode: 1, // 审批通知开关
                // valid: 1, //数据状态（1：开，0：关）
                // flag : 'A' //A添加 D删除 M修改
            },
            // 分支条件备份，用于取消编辑时的恢复
            conditionsBackup:'[]',
            // 锁定业务类型选择
            busCodeLocked:false,
            // 重选业务类型
            busCodeReselect:false,
            // 是否已选择并加载业务类型相应的字段
            busFieldsLoaded:false,
            // 业务可选字段列表
            busFields:{
                // reason:{
                //     fieldName:"请假原因",
                //     fieldCode:"reason",
                //     fieldType:"String", // String,Number,Date,Time,Code,PostTree,OrgTree,
                //     fieldData:[],
                // }
            },

            // 符号列表
            symbolList:[
                {
                    name:'等于',
                    value:'='
                },
                {
                    name:'不等于',
                    value:'!='
                },
                {
                    name:'大于',
                    value:'>'
                },
                {
                    name:'大于等于',
                    value:'>='
                },
                {
                    name:'小于',
                    value:'<'
                },
                {
                    name:'小于等于',
                    value:'<='
                },
            ],

            fieldUnit:'', //字段单位

        }
    },
    filters:{
        // 组织类型数据转换
        orgDataFilter:{
            read(val){
                console.log('orgID',val)
                let data = [];
                try{
                    data = JSON.parse(val) || [];
                }
                catch(e){
                    // this.$root.showTip({
                    //     type:'error',
                    //     msg:'工作流组织数据格式错误'
                    // })
                    console.warn('工作流组织数据格式错误')
                }

                console.info('组织：',data)

                return data;
            },
            write(val){
                return JSON.stringify(val)
            }
        },
        reverseBoolean:{
            read(val){
                return !val;
            },
            write(val){
                return !val;
            }
        }
    },
    watch:{
        // 新增工作流，选择业务时
        'workflow.busCode'(val){
            // 新增且未选择业务时开启，选中后锁定
            if(this.editType==='add' && !this.busCodeLocked && !this.busCodeReselect){

                this.$root.showConfirm({
                    msg:'业务类型选择后不能修改，是否确定？',
                    textOK:'确认',
                    textCancel:'重选',
                    ok:()=>{
                        this.busCodeLocked = true;
                        console.log('选中业务',val)
                        this.loadBusFields(val);
                    },
                    cancel:()=>{
                        this.busCodeLocked = false;
                        this.busCodeReselect = true;
                        this.workflow.busCode = '';
                        this.$nextTick(()=>{
                            this.busCodeReselect = false;
                        })
                    }
                })

            }
        },
        "nodeData.examine"(val) {console.log(val);}
    },
    attached(){

        if(this.hasCreated){
            return;
        }else{
            this.hasCreated = true;
        }

    },
    ready(){
        this.$root._event.$off('settings_workflowDetached');
        this.$root._event.$on('settings_workflowDetached',()=>{
            console.log('remove _workflow')
            _workflow = null;
        })
    },
    detached(){
        _workflow = null;
        this.$emit('back')
    },
    methods:{
        // TODO: 1. 数据保存自动刷新后，分支条件不展示
        // TODO: 2. 删除flag
        // TODO: 3. 更改node order 后，提交数据时，需要从node中获取最新的order
        // TODO: 4. 数据传输优化，去除无更新的节点数据
        // BUG:  1. 有几率反复切换界面后，svg 尺寸出错 。 切换时间问题？

        // 切换分之条件字段时
        setInputType(code,pathIndex,fieldIndex){

            console.log(code,pathIndex,fieldIndex)

            this.inputFieldType = this.busFields[code].fieldType;
            this.inputFieldData = this.busFields[code].fieldData;

            if(this.inputFieldType==='Date'){
                this.nodeData.conditions[pathIndex].fields[fieldIndex].value = this.$root.Tool.iDate(new Date(),'yy/mm/dd').string;
            }
            else if(this.inputFieldType==='PostTree' || this.inputFieldType==='OrgTree'){
                this.nodeData.conditions[pathIndex].fields[fieldIndex].value = []
            }
            else{
                this.nodeData.conditions[pathIndex].fields[fieldIndex].value = ''

                if(this.busFields[code].fieldName==='时长'){
                    this.fieldUnit = '小时';
                }
                else{
                    this.fieldUnit = '';
                }
            }
        },

        // 获取分支条件的字段类型
        getInputFieldType(fieldCode,fieldType){

            // 默认显示输入框
            if(!this.busFields[fieldCode] && fieldType==='String'){
                return true;
            }
            return this.busFields[fieldCode] && this.busFields[fieldCode].fieldType === fieldType;
        },
        // 获取字段可选数据
        getInputFieldData(fieldCode){

            if(this.busFields[fieldCode]){
                return this.busFields[fieldCode].fieldData;
            }
            return [];

        },

        // 创建新节点数据模板
        createNodeData(data){

            let tplData = {
                    "x": 0, // x 坐标
                    "y": 0,// y 坐标
                    "workflowId": 1, // 工作流id TODO
                    "nodeId": "", // 节点id 开始节点-1 结束节点-2 其他new Date()
                    "nodeName": "新节点", // 节点名
                    "conditions":"[]", // 判断条件
                    "examine":"[]", // 审批人 岗位ids
                    "isexa":1,//是否勾选直属上级 1,是  0，否
                    "specialExamine": "[]", // 特殊审批人 岗位ids
                    "isspecia":1,//特殊审批人 是否直属上级
                    "exaPhoto": 0, // 是否显示审批人照片
                    "remind":"[]",//提醒人
                    "specialRemind": "[]", // 特殊提醒人 岗位ids
                    "remPhoto": 0, // 特殊提醒人是否显示照片
                    "approval": 1, // 多人审批时任意一人同意即通过审批
                    "reject": 1, // 多人审批时任意一人驳回即驳回
                    "order":"[0,0]",//层级排序
                    "allnode": 1, // 审批通知开关
                    "valid": 1, //数据状态（1：开，0：关）
                    "flag" : "A" //A添加 D删除 M修改
                },
                nodeData = Object.assign({},tplData);

            for(let key in nodeData){
                if(data.hasOwnProperty(key)){
                    nodeData[key] = data[key];
                }
            }

            return nodeData;
        },

        // 筛选workflow使用的节点数据，及格式化
        nodeListFilter(data){
            let nodes = data.map(node=>{
                return {
                    nodeName:node.nodeName,
                    nodeId:node.nodeId,
                    x:node.x,
                    y:node.y,
                    order:node.order ? JSON.parse(node.order)||[] : [],
                    conditions:Array.isArray(node.conditions) ? node.conditions : JSON.parse(node.conditions) //||[] : []
                }
            })
            return [...nodes];
        },

        // 节点数据类型转换
        nodeDataConverter(data,type){

            let parser = {
                    objectParser(val){

                        if(type==='toObj' && typeof val ==='string'){
                            return val ? JSON.parse(val)||[] : [];
                        }
                        else if(type==='toStr' && typeof val ==='object'){
                            return JSON.stringify(val)
                        }
                        else {
                            return val;
                        }

                    },
                    booleanParser(val){

                        if(type==='toObj' && typeof(val-0) ==='number'){
                            return val ? true : false;
                        }
                        else if(type==='toStr' && typeof val ==='boolean'){
                            return val ? 1 : 0;
                        }
                        else {
                            return val;
                        }
                    }
                },
                fields={
                    conditions:parser.objectParser,
                    // 审批人 岗位ids
                    examine:parser.objectParser,
                    //  特殊审批人 岗位ids
                    specialExamine:parser.objectParser,
                    // 特殊提醒人 岗位ids
                    specialRemind:parser.objectParser,
                    //
                    isexa:parser.booleanParser,
                    isspecia:parser.booleanParser,
                    approval:parser.booleanParser,
                    reject:parser.booleanParser,
                    allnode:parser.booleanParser,
                },
                parseData={}
            ;

            for(let key in data){

                if(fields[key]){
                    parseData[key] = fields[key](data[key]);
                }
                else{
                    parseData[key] = data[key];
                }
            }
            // console.log(parseData)
            return parseData;
        },

        // 节点分支条件数据格式化
        nodePathDataFormat(node){

            try {
                node.conditions = JSON.parse(node.conditions) || [];
            }
            catch(e){
                node.conditions = [];
            }

            console.log(node.conditions)
            node.conditions = node.conditions.map(c=>{

                let fields = c.if.split(';') || [];
                fields = fields.map(f=>{
                    let a = f.split('#');
                    return {
                        code   : a[0] || '', // 字段code
                        symbol : a[1] || '', // 符号
                        value  : a[2] || ''  // 赋值
                    }
                });

                return {
                    ID:uuid.short(),
                    from:node.nodeId,
                    to:c.to,
                    fields:fields,
                    valid:true
                }
            })

            return node;

        },

        /* 设置当前编辑的节点 */
        setCurrentNodeData(nodeId){

            this.nodeData = {};
            _workflowNodes.forEach(node=>{
                if(node.nodeId===nodeId){
                    // console.info('当前编辑的节点',this.nodeDataConverter(node,'toObj'))
                    this.nodeData = this.nodeDataConverter(node,'toObj');
                    console.log(this.nodeData)

                    // 验证是否所有分支都存在
                    this.nodeData.conditions = this.nodeData.conditions.filter(path=>{
                        console.log('验证是否所有path都存在',path.ID)
                        // 路径存在，且不在待删除列表
                        if(_workflow.getPathByFromTo(path.from,path.to) && _pathShouldDelete.indexOf(path.ID)<0){
                            console.log(path.ID,'存在')
                            return true;
                        }
                        // if(_workflow.pathList[path.ID]){
                        //     console.log(path.ID,'存在')
                        //     return true;
                        // }
                    });

                }
            })
            console.info('当前编辑的节点',this.nodeData)
        },

        /* 从节点获取姓名 */
        getNodeName(nodeID){
            let name = '';

            if(nodeID==='end'){
                return '结束'
            }
            _workflowNodes.forEach(node=>{

                if(node.nodeId==nodeID){
                    // console.log(node.nodeId,nodeID,node.nodeName)
                    name = node.nodeName;
                }
            })
            return name;
        },

        // 加载业务字段
        loadBusFields(busCode){

            this.busFields = {};
            store.actions.loadConditionsFieldsByBus(busCode,data=>{
                data.forEach(item=>{
                    item.fieldData = '';
                    this.busFields[item.fieldCode] = item;
                    // 加载字段相应的数据
                    // if(item.fieldType==='Code' || item.fieldType==='PostTree' || item.fieldType==='OrgTree'){
                    if(['Code','DataList'].includes(item.fieldType)){
                        this.loadBusFieldsData(item.fieldCode,item.fieldType,item.parentId);
                    }
                });
                console.info('this.busFields',this.busFields)
            },()=>{
                console.error('加载业务字段失败')
            });

            this.busFieldsLoaded = true; //TODO 是否要添加到加载回调中，需考虑加载失败的情况

        },

        // 加载业务字段数据
        loadBusFieldsData(label,type,codeID){
            store.actions.loadConditionsFieldData(label,type,codeID,data=>{
                console.info('业务字段',label,codeID,data)
                this.busFields[label].fieldData = data;
            },()=>{
                console.error('加载业务字段数据失败')
            });
        },

        // 添加工作流
        addWorkflow(){
            // return;
            // this.modalTitle = '添加工作流';
            // this.modalShow = true;
            // this.modalComponent = 'addWorkflow'

            _workflowNodes = [];
            _nodesDeleted  = [];
            _pathShouldDelete = [];

            this.editNode('add','',this.createNodeData({
                'nodeId'         : 'start',
                'x'              : 0,
                'y'              : 0,
                'order'          : '[1,0]',
                'nodeName'       : '申请人',
                'workflowId'     : this.workflow.ID
            }));

            this.initWorkflow(this.nodeListFilter(_workflowNodes));

        },

        // 加载，编辑工作流
        loadWorkflow(workflowID,type){

            this.busCodeLocked = true;
            this.workflow.ID = workflowID;

            // 加载指定工作流数据
            store.actions.getWorkflowByID(this.workflow.ID,data=>{


                // 整理数据格式
                // this.workflow = data.workflow;
                for(let key in this.workflow){
                    this.workflow[key]=data.workflow[key];
                }
                // 显示赋值，触发data刷新
                this.workflow.orgId = data.workflow.orgId;
                // console.log('加载指定工作流数据',this.workflow)

                this.workflow.flag = "M";
                // console.log('设置workflow.flag',this.workflow.flag)

                // 格式化所有节点数据
                _workflowNodes = data.deployments.map(node=>{
                    return this.nodePathDataFormat(node)
                })

                console.info('load _workflowNodes',_workflowNodes)

                // 将加载到的节点添加到已有节点列表，用来标记最终的flag状态。
                _oldNodes = _workflowNodes.map(node=>{
                    return node.nodeId;
                })

                // console.info('_workflowNodes',_workflowNodes)

                _nodesDeleted  = data.delDeps || []; // TODO parse to array
                // console.log(_workflowNodes)


                if(type!=='reload'){
                    // 初始化工作流
                    this.initWorkflow(this.nodeListFilter(_workflowNodes));
                    // 加载字段
                    this.loadBusFields(this.workflow.busCode);
                }

            },()=>{
                console.log('加载指定工作流数据失败')
            });


        },

        // 更新工作流数据,用于保存后刷新最新数据
        updateWorkflow(workflowID){
            // 清空数据
            _workflowNodes = [];
            _oldNodes      = [];
            _nodesDeleted  = [];
            _pathShouldDelete = [];
            // 更新操作状态
            this.editType='update';
            // this.workflow.ID = workflowID;
            // this.workflow.flag = "M";
            //
            // _workflowNodes.forEach(node=>{
            //     node.flag = "M";
            //     _oldNodes.push()
            // })
            this.loadWorkflow(workflowID,'reload');
        },

        /* 关闭modal回调 用于判断是否撤销编辑*/
        onModalClose(){
            // 取消编辑节点
            if(this.modalComponent==='editNode'){
                this.editNode('cancel');
            }
            // 取消编辑分支
            else if(this.modalComponent==='editIf'){
                this.editPath('cancel');
            }

            console.log('onModalClose')
        },

        /* 编辑节点 */
        editNode(type,nodeId,data){

            if(type=='show'){
                this.modalTitle = '编辑节点';
                this.modalShow = true;
                this.modalComponent = 'editNode'
            }
            // 添加节点
            else if(type==='add'){
                data.flag="A";
                // 添加前将node格式化，主要针对conditions
                _workflowNodes.push(this.nodePathDataFormat(data));
            }
            // 修改节点
            else if(type==='update'){

                _workflowNodes.forEach((node,index)=>{
                    if(node.nodeId===nodeId){
                        let nodeData = this.nodeData;//this.nodeDataConverter(this.nodeData,'toStr');

                        if(_oldNodes.indexOf(nodeData.nodeId)>-1){
                            nodeData.flag="M"
                        }
                        _workflowNodes[index] = nodeData;
                    }
                })

            }
            // 删除节点，同时需要删除与本节点关联的其他节点的分支条件
            else if(type==='delete'){

                _workflowNodes.forEach((node,index)=>{
                    if(node.nodeId===nodeId){

                        // delete _workflowNodes[index];
                        _workflowNodes.splice(index,1);
                        _nodesDeleted.push(node.ID,);
                    }
                })

                console.warn(_workflowNodes)
            }
            // 删除相连路径节点的相连路径数据，将要删除的路径数据添加到待删除列表，在保存的时候统一剔除。且在编辑相关节点时，不显示待删除的路径。
            else if(type==='delLinkPath'){
                let pathID = data;
                _pathShouldDelete.push(pathID);
                console.log('删除相关路径',_pathShouldDelete,pathID)

            }
            // 取消编辑
            else if(type==='cancel'){
                // 啥都不用做
            }

        },
        // 编辑节点结束
        editNodeComplate(){

            let _this = this;

            let nodeId = _this.nodeData.nodeId;

            _this.editNode('update',nodeId);

            // 更新节点
            _workflow.nodeList[_this.nodeData.nodeId].update({
                name:_this.nodeData.nodeName
            });

            _this.modalShow = false;

        },

        /* 编辑分支 */
        editPath(type,pathID,fieldIndex,pathData){
            // 显示分支
            if(type==='showPath'){

                if(!this.busFieldsLoaded){
                    this.$root.showTip({
                        type:'warning',
                        msg:'请先选择业务类型'
                    })
                    return;
                }
                this.modalTitle = '节点分支';
                this.modalShow = true;
                this.modalComponent = 'editIf'

                // 备份当前节点分支数据，用于取消编辑时恢复
                this.conditionsBackup = JSON.stringify(this.nodeData.conditions);
                console.log('this.conditionsBackup',this.nodeData,this.conditionsBackup);

            }
            // 添加分支
            else if(type==='addPath'){

                let pathObj = {
                    ID     : pathID,
                    from   : pathData.from,//
                    to     : pathData.to, // 指向的nodeID
                    // 字段列表
                    fields : [
                        // {
                        //     code   : '', // 字段code
                        //     symbol : '', // 符号
                        //     value  : ''  // 赋值
                        // }
                    ],
                    valid:true
                }

                this.nodeData && this.nodeData.conditions.push(pathObj);


                console.log('添加path',this.nodeData)
            }
            // 删除分支
            else if(type==='delPath'){

                this.nodeData.conditions.forEach(path=>{
                    if(path.ID===pathID){
                        path.valid = false;
                    }
                });

            }
            // 添加字段
            else if(type==='addField'){

                if(this.busFields.length===0){
                    this.$root.showTip({
                        type:'warning',
                        msg:'请先选择业务类型'
                    })
                    return;
                }

                this.nodeData.conditions.forEach(path=>{
                    if(path.ID===pathID){
                        path.fields.push({
                            code   : '', // 字段code
                            symbol : '', // 符号
                            value  : ''  // 赋值
                        })
                    }
                });

                // this.$nextTick(()=>{
                //     this.$refs.pathvalidator.refresh();
                // })
            }
            // 删除字段
            else if(type==='delField'){
                this.nodeData.conditions.forEach(path=>{
                    if(path.ID===pathID){
                        path.fields.splice(fieldIndex,1)
                    }
                });

                // this.$nextTick(()=>{
                //     this.$refs.pathvalidator.refresh();
                // })

            }
            // 编辑完成，更新到真实数据
            else if(type==='update'){

                // 同步数据
                _workflowNodes.forEach((node,index)=>{
                    if(node.nodeId===this.nodeData.nodeId){

                        this.nodeData.conditions = this.nodeData.conditions.filter(path=>{
                            if(!path.valid){
                                _workflow.delPath(path.ID);
                                return false;
                            }
                            return true;
                        });

                        let dataStr = JSON.stringify(this.nodeData)
                        _workflowNodes[index] = JSON.parse(dataStr);
                        // console.log('updateNode',node)
                    }
                })

                console.log('_workflowNodes',_workflowNodes)


                this.modalShow = false;

            }
            // 取消编辑
            else if(type==='cancel'){

                // 恢复数据
                _workflowNodes.forEach((node,index)=>{
                    if(node.nodeId===this.nodeData.nodeId){
                        console.log('this.conditionsBackup',this.conditionsBackup);
                        // this.nodeData.conditions = JSON.parse(this.conditionsBackup);
                        this.$set('nodeData.conditions',JSON.parse(this.conditionsBackup));
                        _workflowNodes[index].conditions
                    }
                })
                this.modalShow = false;
            }

        },

        /* 编辑分支完成 */
        editPathComplate(){
            this.editPath('update');
        },

        // 开始修改
        toChangeWorkflow(){
            this.editType = 'update';
            this.$root.showTip({
                type:'success',
                msg:'您现在可以编辑该工作流了'
            })

        },
        // 保存，添加工作流
        toSaveWorkflow(type){

            if(this.editType==='show'){
                this.$root.showTip({
                    type:'warning',
                    msg:'请先点击修改按钮，编辑工作流后再保存'
                })
                return;
            }

            let msg=''
            if(!this.workflow.workflowName){
                msg+='工作流名称';
            }
            else if(!this.workflow.orgId){
                msg+='所属组织';
            }
            else if(!this.workflow.busCode){
                msg+='业务类型';
            }

            if(msg){
                this.$root.showTip({
                    type:'warning',
                    msg:msg+'不能为空'
                })
                return;
            }


            if(this.editType==='add'){
                this.workflow.flag="A"
            }
            else if(this.editType==='update'){
                this.workflow.flag="M"
            }

            /* 提交前整理数据 */

            let nodesData = JSON.parse(JSON.stringify(_workflowNodes)),
                nodeEnd;

            nodesData.forEach((node,index)=>{

                if(node.nodeId==='end'){
                    nodeEnd = node;
                }

                /* 将node order 更新到数据中  */
                node.order = _workflow.nodeList[node.nodeId].order;

                console.log(node.order)

                console.log('node.conditions.map',typeof node.conditions,node.conditions,node)

                // 过滤分支条件，将待删除的分支条件删除
                node.conditions = node.conditions.filter(path=>{
                    // 不在待删除列表且有对应的pathObj，则通过
                    if(_pathShouldDelete.indexOf(path.ID)<0 && _workflow.getPathByFromTo(path.from,path.to)){
                        return true;
                    }else{
                        console.log('待删除列表',_pathShouldDelete)
                        // 如果存在待删除分支，则将改分支置为修改状态。
                        // TODO: 因为待删除分支可能是新添加的，所以删除后实际上节点数据与数据库中并没有不同，此时置为M是否妥当。
                        node.flag = "M";
                        return false;
                    }
                })

                // 将分支条件格式化为字符串 {to:"",if:"a#=#1;b#>#2"}
                node.conditions = node.conditions.map(path=>{

                    let ifList = path.fields.map(f=>{
                        if(f.code==='' || f.symbol==='' || f.value===''){
                            console.log('path.fields>>>>',f.code,f.symbol,f.value)
                            return '';
                        }
                        return `${f.code}#${f.symbol}#${f.value}`;
                    })
                    return {
                        to:path.to,
                        if:ifList.join(';')
                    }

                })
                node.conditions = JSON.stringify(node.conditions);
                console.log(node.conditions)

                nodesData[index] = this.nodeDataConverter(node,'toStr');
            })
            // 如果数据中没有结束节点，添加结束节点
            if(!nodeEnd){
                nodesData.push({
                    nodeId:"end",
                    x:_workflow.endNode.x,
                    y:_workflow.endNode.y,
                    nodeName:_workflow.endNode.name,
                    order:JSON.stringify(_workflow.endNode.order),
                    conditions:"[]",
                    flag:'A',
                    valid:1,
                })
            }else{
                nodeEnd.x = _workflow.endNode.x;
                nodeEnd.y = _workflow.endNode.y;
                nodeEnd.order = JSON.stringify(_workflow.endNode.order);
            }

            if(type==='submit'){
                this.workflow.status = 1;
            }else{
                this.workflow.status = 0;
            }

            let data = {
                // 工作流信息
                wkworkflow:JSON.stringify(this.workflow),
                // 工作流节点
                wkredeployments:JSON.stringify(nodesData),
                // 删除的节点id
                delDeps:JSON.stringify(_nodesDeleted)
            }

            store.actions.updateWorkflowByID(data,(workflowID)=>{

                this.updateWorkflow(workflowID);

                this.$root.showTip({
                    type:'success',
                    msg:'操作成功'
                })
            },msg=>{

            })
        },

        // 删除工作流
        toDeleteWorkflow(){

            // console.log(this.workflow.ID)

            if(!this.workflow.ID){
                this.$root.showTip({
                    type:'warning',
                    msg:'新增操作不能删除'
                })
                return;
            }
            if(!!this.workflow.valid){
                this.$root.showTip({
                    type:'warning',
                    msg:'已经启用的操作流不能删除，请先停用该工作流'
                })
                return;
            }
            this.$root.showConfirm({
                msg:'是否确定删除该工作流？删除后不能恢复，请谨慎操作。',
                textOK:'确定',
                textCancel:'取消',
                ok:()=>{
                    store.actions.deleteWorkflowByID(this.workflow.ID,()=>{
                        this.$root.showTip({
                            type:'success',
                            msg:'删除成功'
                        })

                        this.$emit('back');

                    },msg=>{

                    })
                }
            })



        },

        // 初始化工作流
        initWorkflow(nodeData){

            if(!Array.isArray(nodeData)) return;

            // 创建流程图实例
            console.info('_workflow1',_workflow)
            if(!_workflow){
                this.initSvg();
                console.info('_workflow2',_workflow)
            }

            // 初始化流程图
            _workflow.init(nodeData);

        },
        // 显隐节点菜单
        togglenodeMenu(show,x,y){

            if(!window.nodeMenu){
                window.nodeMenu = document.getElementById('nodeMenu');
            }

            if(!show){

                window.nodeMenu.classList.remove('animateIn');
                window.nodeMenu.classList.add('animateOut');

                window.timerHide = setTimeout(()=>{
                    window.nodeMenu.style.display = 'none';
                },300)
            }else{
                clearTimeout(window.timerHide)
                window.nodeMenu.style.display = 'none';
                window.nodeMenu.classList.remove('animateIn');
                window.nodeMenu.classList.remove('animateOut');
                window.nodeMenu.style.left = x+'px';
                window.nodeMenu.style.top = y+'px';
                setTimeout(()=>{
                    window.nodeMenu.classList.add('animateIn');
                    window.nodeMenu.style.display = 'block';
                },50)
            }
            // console.log(nodeMenu.style,x,y)

        },

        // 实例化工作流
        initSvg(){

            let _this = this;

            let stageBox = document.getElementById('stageBox');

            // 布局规则
            let config = {
                stageWrap   : stageBox,
                stage       : Snap('#stage'),   // 画布
                width       : stageBox.offsetWidth,             // 宽度
                height      : stageBox.offsetHeight,              // 高度
                layOutType  : 'up',             // 布局方向
                nodeSize    : [100,40],         // 尺寸
                nodeGrid    : [100,90],        // 间距
                nodeMargin  : [10,20,30,20],    // 路径端点与节点间距 上右下左
                nodeDataMap : [
                    "name/nodeName",
                ],

                /* node 方法 */

                // 创建节点
                nodeCreate(paper){
                    let node = paper.super.stage.paper.rect(0,0,0,0,10),
                        pathStrokes = {}// 暂存path描边颜色
                    ;

                    // 创建文字
                    paper.text = paper.super.stage.paper.text(0,0,paper.name);

                    paper.handler = paper.super.stage.paper.rect(0,0,0,0).attr({
                        fill:'transparent'
                    });

                    // 渲染 icon
                    if(paper.nodeId!=='end' && paper.nodeId!=='-1'){
                        let iconSingle = paper.super.stage.select('#userSingle'),
                        iconGroup  = paper.super.stage.select('#userGroup');

                        if(paper.data.group){
                            paper.icon = iconGroup.use();
                        }
                        else{
                            paper.icon = iconSingle.use();
                        }
                        paper.handler.before(paper.icon);
                    }
                    paper.handler.click((e)=>{
                        paper.super.clickedNode = paper;
                        paper.config.nodeClick(paper,e);
                    }).mousedown(()=>{

                        // if(paper.super.nodeClickDown){
                            // console.log('paper a start')
                            paper.super.dragStartNode = paper;
                        // }

                    }).mouseup(()=>{

                        // console.log('paper.super.nodeClickMove',paper.super.nodeClickMove)

                        if(paper.super.nodeClickMove){
                            // console.log('paper a end')
                            paper.super.dragEndNode = paper;
                        }

                    }).hover(()=>{

                        paper.element.animate({
                            transform:"s0.9,0.9"
                        },500,mina.bounce)

                        // // console.log(paper.pathList)
                        paper.pathList.forEach(pathID=>{
                            let path = paper.super.pathList[pathID];

                            if(path && path.element){
                                path.element.attr({
                                    stroke: 'red',
                                })
                                paper.super.baseNode.after(path.element);
                            }

                        })

                    },()=>{

                        paper.element.animate({
                            transform:"s1,1"
                        },500,mina.bounce)

                        paper.pathList.forEach(pathID=>{
                            let path = paper.super.pathList[pathID];

                            if(path && path.element){
                                path.element.attr({
                                    stroke: '#666'//pathStrokes[pathID]
                                })
                                paper.super.baseNode.before(path.element);
                            }

                        })

                    })

                    // 元素列表，便于批量操作
                    paper.elementList = [node,paper.text,paper.handler];
                    if(paper.icon){
                        paper.elementList.push(paper.icon);
                    }

                    return node;
                },
                // 渲染节点
                nodeRender(paper,node){
                    console.log(paper.name)
                    let baseAttr = {
                            x:paper.x,
                            y:paper.y,
                            width:paper.width,
                            height:paper.height,
                            text:paper.name
                        },
                        styleAttr = {
                            fill: "#fff",
                            stroke: "#ccc",
                            strokeWidth: 2
                        },
                        fontStyle = {
                            textAnchor:'middle',
                            fontSize:16
                        }
                        ;
                    // start node
                    if(node.nodeId==='-1'){
                        styleAttr = {
                            fill: "#0ed185",
                            stroke: "rgb(9, 179, 156)",
                            strokeWidth: 0
                        }

                    }
                    // 提交人
                    if(node.nodeId==='start'){
                        styleAttr = {
                            fill: "#fff",
                            stroke: "#fc782d",
                            strokeWidth: 2
                        }
                    }
                    // end node
                    else if(node.nodeId==='end'){
                        styleAttr = {
                            fill: "#fd6550",
                            stroke: "red",
                            strokeWidth: 0
                        }
                    }
                    else{


                    }



                    let elAttr = Object.assign(styleAttr,baseAttr);
                    paper.element.attr(elAttr);
                    paper.handler.attr(baseAttr);




                    if(node.nodeId==='-1' || node.nodeId==='end'){
                        paper.text.attr(Object.assign(fontStyle,{
                            text:paper.name,
                            x:paper.x+paper.width/2,
                            y:paper.y+paper.height/2+5,
                            fill:'#fff'
                        }));
                    }else{
                        paper.text.attr(Object.assign(fontStyle,{
                            text:paper.name,
                            x:paper.x+paper.width/2,
                            y:paper.y+paper.height+20,
                            fill:'#666'
                        }));
                    }


                    if(node.nodeId!=='-1' && node.nodeId!=='end'){
                        paper.icon.attr({
                            x:paper.x+paper.width/2-15,
                            y:paper.y+5,
                            fill:'#666',
                        })

                        if(node.nodeId==='start'){

                            paper.icon.attr({
                                fill:'#fc782d',
                            })

                        }

                    }


                },
                // 更新节点
                nodeUpdate(paper){
                },

                /* 路径方法 */

                // 创建路径
                pathCreate(paper){
                    let path = paper.super.stage.paper.polyline([0,0,0,0]);
                    paper.super.baseNode.before(path);
                    return path;
                },
                // 渲染路径
                pathRender(paper,el){
                    let stage = paper.super.stage;

                    let style = {
                        // strokeDasharray: paper.type==='X' ? '--.' : '-',
                        stroke: paper.type==='1X' ? 'blue' : '#999',//"#ccc",
                        fill:"#ccc"
                    }

                    // marker 标记
                    if(!stage.markerS){
                        // 路径开始符号
                        stage.markerStartPoint = stage.paper.circle(10, 10, 3).attr({
                            // stroke: "#666",
                            // strokeWidth: 0,
                            fill: style.fill
                        });
                        // 路径方向
                        stage.markerEnd = stage.paper.path("M10,10 L10,18 L18,18").attr({
                            stroke: style.stroke,
                            strokeWidth: 0,
                            fill: style.fill,
                            strokeMiterlimit: 2,
                            strokeLinecap: 'round',
                            transform:'r-135'
                        });
                        // 标记
                        stage.markerS = stage.markerStartPoint.marker(0, 0, 18, 18, 10, 10);
                        stage.markerE = stage.markerEnd.marker(0, 0, 30, 30, 15, 14);
                    }

                    // 简单直连
                    /*let from = el.super.nodeList[el.from],
                        to = el.super.nodeList[el.to],
                        x = from.x+from.width/2,
                        y = from.y+from.height+20;

                    paper.element.attr({
                        points:`${x},${y} ${to.x+to.width/2},${to.y - 20} `,
                    })*/

                    // 复杂连接
                    let pathStr = '';
                    if(Array.isArray(paper.points)){
                        paper.points.forEach((p,index)=>{
                            pathStr+=`${p.x},${p.y} `;
                        });
                    }
                    else{
                        pathStr=`${paper.points.M.x},${paper.points.M.y} `;
                        paper.points.L.forEach((p,index)=>{
                            pathStr+=`${p.x},${p.y} `;
                        });
                        pathStr+=`${paper.points.E.x},${paper.points.E.y}`;
                    }

                    paper.element.attr({
                        points:pathStr
                    });


                    //
                    paper.element.attr({
                        stroke: style.stroke,
                        strokeWidth: 1,
                        // strokeDasharray:style.strokeDasharray,
                        fill: "none",
                        // markerStart: stage.markerS,
                        // markerMid: stage.markerS,
                        markerEnd: stage.markerE,
                        // strokeDasharray: paper.element.getTotalLength() + " 1200",
                        strokeDashoffset: 0
                    });

                    //
                    paper.element.hover(function(){
                        paper.element.attr({
                            stroke:'#666'
                        })
                    },function(){
                        paper.element.attr({
                            stroke:'#ccc'
                        })
                    })
                },
                // 更新路径
                pathUpdate(el){
                },
                /* workflow 方法 */

                // 初始化回调
                initCallback(paper){

                    // 添加工具按钮
                    paper.toolbar.tool_eidtNode = document.querySelector('div.tool_eidtNode');
                    paper.toolbar.tool_delNode = document.querySelector('div.tool_delNode');
                    paper.toolbar.tool_addNodeChild = document.querySelector('div.tool_addNodeChild');
                    paper.toolbar.tool_addNodeBrother = document.querySelector('div.tool_addNodeBrother');
                    paper.toolbar.tool_path = document.querySelector('div.tool_path');

                    paper.toolbar.tool_delNode && paper.toolbar.tool_delNode.addEventListener('click',e=>{
                        // // console.log('tool_delNode')
                        paper.config.deleteNode(paper,e);
                        paper.config.onAfterDeleteNode(paper);
                    },false)
                    paper.toolbar.tool_addNodeChild && paper.toolbar.tool_addNodeChild.addEventListener('click',e=>{
                        paper.config.addNodeChild(paper,e);
                        // // console.log('tool_addNodeChild')
                    },false)
                    paper.toolbar.tool_addNodeBrother && paper.toolbar.tool_addNodeBrother.addEventListener('click',e=>{
                        paper.config.addNodeBrother(paper,e);
                        // // console.log('tool_addNodeBrother')
                    },false)
                    paper.toolbar.tool_eidtNode && paper.toolbar.tool_eidtNode.addEventListener('click',e=>{
                        paper.config.clickEditNode(paper,e);
                        // // console.log('tool_eidtNode')
                    },false)
                    paper.toolbar.tool_path && paper.toolbar.tool_path.addEventListener('click',e=>{
                        paper.config.showPath(paper,e);
                        // // console.log('tool_path')
                    },false)

                },

                // 点击节点
                nodeClick(paper,e){

                    e.stopPropagation();

                    if(_this.editType==='show') return;

                    if(paper.nodeId==='-1'||paper.nodeId==='end'){
                        return;
                    }

                    console.log(paper.order)

                    // 弹出菜单
                    _this.togglenodeMenu(true,paper.x+paper.width/2,paper.y+paper.height/2);

                },
                // 拖动节点-start
                nodeDragStart(paper,e,pos){
                    if(_this.editType==='show') return;
                    paper.addPathHandler();
                },
                // 拖动节点-move
                nodeDragMove(paper,e,nowPos,startPos){
                    if(_this.editType==='show') return;
                    paper.renderPathHandler([{x:startPos.x,y:startPos.y},{x:nowPos.x,y:nowPos.y}]);
                },
                // 拖动节点-end
                nodeDragEnd(paper,e){
                    if(_this.editType==='show') return;
                    // console.log('nodeDragEnd')
                    paper.removePathHandler();
                    // console.log(paper.dragStartNode,paper.dragEndNode)
                    // 如果存在拖动的开始节点和结束节点，则在两个节点之间添加路径
                    if(paper.dragStartNode&&paper.dragEndNode && (paper.dragStartNode.nodeId!=paper.dragEndNode.nodeId)){

                        // 判断 开始节点不能作为路径终点，结束节点不能作为路径起点
                        // console.log(paper.dragStartNode.nodeId,paper.dragEndNode.nodeId)
                        if(paper.dragStartNode.nodeId==='end' || paper.dragEndNode.nodeId === 'start'){
                        _this.$root.showTip({
                                type:'warning',
                                msg:'工作流分支方向错误'
                            })
                            return;
                        };
                        // 判断 开始节点不能直连结束节点

                        if(paper.dragStartNode.nodeId==='start' && paper.dragEndNode.nodeId === 'end'){
                            _this.$root.showTip({
                                type:'warning',
                                msg:'开始节点不能直连结束节点'
                            })
                            return;
                        };

                        paper.addPath(paper.dragStartNode,paper.dragEndNode)
                    }
                },

                // 点击画布
                stageClick(paper,e){
                    // close nodeMenu
                    if(window.nodeMenu && !window.nodeMenu.contains(e.target)){
                        _this.togglenodeMenu();
                    }
                },
                // 删除节点
                deleteNode(paper,e){
                    // console.log('删除节点'+this.clickedNode.nodeId)

                    if(paper.clickedNode.nodeId==='start'){
                        _this.$root.showTip({
                            type:'warning',
                            msg:'申请人节点禁止删除'
                        })

                        _this.togglenodeMenu();
                        return;
                    }

                    // 删除节点相关路径
                    for(let key in paper.pathList){
                        let path = paper.pathList[key];

                        if(path.to === paper.clickedNode.nodeId){
                            // 删除相关节点中的相关路径数据
                            _this.editNode('delLinkPath',path.from,path.ID)

                        }
                        if(path.from === paper.clickedNode.nodeId || path.to === paper.clickedNode.nodeId){


                            // remove path element
                            path.element.remove();
                            // remove path object
                            delete paper.pathList[key];


                        }
                    }

                    // 删除节点
                    paper.nodeList[paper.clickedNode.nodeId].elementList.forEach(el=>{
                        // // console.log(el)
                        el.remove();
                    })

                    delete paper.nodeList[paper.clickedNode.nodeId];


                    // 整理 nodeMap
                    let nodeMapStr = JSON.stringify(paper.nodeMap),
                        replaceReg = new RegExp(`,?"${paper.clickedNode.nodeId}",?`,'ig')
                    ;
                    console.log(nodeMapStr)
                    nodeMapStr = nodeMapStr.replace(`${paper.clickedNode.nodeId}`,'');
                    console.log(nodeMapStr)
                    paper.nodeMap = JSON.parse(nodeMapStr) || [];
                    paper.nodeMap.forEach((level,index)=>{
                        paper.nodeMap[index] = level.filter(nodeID=>{
                            return !!nodeID;
                        })
                    })

                    // 重新布局

                    paper.layout();

                    // 隐藏menu
                    _this.togglenodeMenu();
                },
                // 添加下级节点
                addNodeChild(paper,e){

                    let nodeCurrent = paper.clickedNode,
                        levelOrder = paper.nodeMap[nodeCurrent.order[0]-0+1],
                        orderNow = [nodeCurrent.order[0]-0+1,levelOrder ? levelOrder.length : 0]

                    console.log(nodeCurrent,orderNow)

                    paper.addNode({
                        'x'              : 0,
                        'y'              : 0,
                        'order'          : orderNow,
                        'conditions'     : [], // 判断条件
                    })

                    // 隐藏menu
                    _this.togglenodeMenu();

                },
                // 添加同级节点
                addNodeBrother(paper){

                    let nodeCurrent = paper.clickedNode,
                        level = paper.nodeMap[nodeCurrent.data.order[0]],
                        orderNow = [nodeCurrent.data.order[0]-0,level.length]

                    // 申请人节点不能添加同级节点
                    if(nodeCurrent.nodeId==='start'){
                        _this.togglenodeMenu();
                        return
                    };

                    paper.addNode({
                        'x'              : 0,
                        'y'              : 0,
                        'order'            : orderNow,
                        'conditions'      : [], // 判断条件
                    })

                    // 隐藏menu
                    _this.togglenodeMenu();

                },
                // 编辑当前节点
                clickEditNode(paper){

                    if(paper.clickedNode.nodeId==='start'){

                        _this.$root.showTip({
                            type:'warning',
                            msg:'申请人节点不允许编辑'
                        })
                        return;
                    }

                    _this.editNode('show');

                    _this.setCurrentNodeData(paper.clickedNode.nodeId);



                    // 隐藏menu
                    _this.togglenodeMenu();

                },
                // 添加节点后
                onAfterAddNode(paper,nodeData){

                    // console.log(_this.createNodeData(nodeData))
                    // console.log(JSON.stringify(_this.createNodeData(nodeData)))

                    _workflowNodes.push(_this.createNodeData(nodeData))
                },
                // 删除节点后
                onAfterDeleteNode(paper){
                    if(paper.clickedNode.nodeId==='start'){
                        return;
                    }
                    // 删除节点数据
                    _this.editNode('delete',paper.clickedNode.nodeId);
                },
                // 编辑当前结点分支条件
                showPath(paper,e){

                    _this.setCurrentNodeData(paper.clickedNode.nodeId);

                    _this.editPath('showPath')


                    // 隐藏menu
                    _this.togglenodeMenu();

                },
                // 创建路径
                onCreatePath(paper,pathObj){
                    _this.setCurrentNodeData(pathObj.from);
                    _this.editPath('addPath',pathObj.ID,'',pathObj)
                    _this.editPath('update',pathObj.ID)
                },
                // 删除路径回调
                onBeforeDelPath(paper,delPathID){
                },
                onAfterDelPath(paper,delPathID){
                }
            }

            _workflow = new Workflow(config);

        }
    }
}
</script>
<style lang="scss" scoped>
.wk-conditionList{
    margin-bottom: 20px;
    ._info{
        padding: 13px 10px 13px 0px;
        background: #eee;
        font-weight: 100;

        ._node{
            padding: 5px 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-weight: bold;
            background: #fff;
            margin: 0 10px;
        }

        button{
            float: right;
        }
    }
    ._condition{
        padding: 10px;
        border:  1px solid #eee;

        ul{
            margin-bottom: 20px;
        }
        li{
            border-bottom: 1px solid #ddd;
            padding: 10px;
            line-height: 30px;
        }

        ._delete{
            font-weight: normal;
            cursor: pointer;
            color: #666;
        }
        ._delete:hover{
            color: #fd6551;
        }
        ._delete i{
            position: relative;
            top: 5px;
        }
    }
}
</style>
<style lang="css" scoped>
    .vacation-right {
        margin-right: 40px!important;
    }
    .title {
        margin-right: 20px;
    }
    .wrap,
    .wrap-content {
        height: 100%;
        background: #fff;
    }
    .wrap-content {
        position: relative;
    }

    .workflowInfo ._text{
        line-height: 40px;
        font-size: 14px;
        margin-right: 20px;
    }
    .workflowInfo ._input{
        margin-right: 30px;
    }

    /* 工作流 */

    #stageBox{
        position: absolute;
        top: 60px;
        bottom: 10px;
        left: 10px;
        right: 10px;
        border: 1px solid #ccc;
        background: #fff;
        overflow: auto;

        -webkit-user-select: none;
           -moz-user-select: none;
                user-select: none;

    }
    #stage {
        position: relative;
    }
    /* 工作流菜单 */
    .hotbox {
        z-index: 100;
        position: absolute;
        left: 0;
        top: 0;
        overflow: visible;
        display: none;
    }

    .hotbox.animateIn{
        animation:zoomIn .3s;
    }
    .hotbox.animateOut{
        animation:fadeOut .4s;
    }
    /*.hotbox.animate .ring{
        animation:bounceIn .5s .1s;
    }
    @-webkit-keyframes zoomRotateIn{
        from {
            opacity: 0;
            -webkit-transform: scale(.3) rotate(-270deg);
            transform: scale(.3) rotate(-270deg);
        }
        100%{
            opacity: 1;
            -webkit-transform: scale(1) rotate(0deg);
            transform: scale(1) rotate(0deg);
        }
    }
    @keyframes zoomRotateIn{
        from {
            opacity: 0;
            -webkit-transform: scale(.3) rotate(180deg);
            transform: scale(.3) rotate(180deg);
        }
        100%{
            opacity: 1;
            -webkit-transform: scale(1) rotate(0deg);
            transform: scale(1) rotate(0deg);
        }
    }*/

    .hotbox .state {
        position: absolute;
        overflow: visible;
        /*display: none*/
        z-index: 1000;
        transform: scale(0.8);
    }
    .hotbox .statebg{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
        background: #000;
        opacity: 0.2;
    }

    .hotbox .state .center .button,.hotbox .state .ring .button {
        position: absolute;
        width: 70px;
        height: 70px;
        margin-left: -35px;
        margin-top: -35px;
        border-radius: 100%;
        box-shadow: 0 0 30px rgba(0,0,0,.3)
    }

    .hotbox .state .center ._key,.hotbox .state .center ._label,.hotbox .state .ring ._key,.hotbox .state .ring ._label {
        display: block;
        text-align: center;
        line-height: 1.4em;
        vertical-align: middle
    }

    .hotbox .state .center ._label,.hotbox .state .ring ._label {
        font-size: 16px;
        margin-top: 17px;
        margin-top: 28px;
        color: #000;
        font-weight: 400;
        line-height: 1em
    }

    .hotbox .state .center ._key,.hotbox .state .ring ._key {
        display: none;
        font-size: 12px;
        color: #999
    }

    .hotbox .state .ring-shape {
        position: absolute;
        left: -25px;
        top: -25px;
        border: 25px solid rgba(0,0,0,.3);
        background: rgba(0,0,0,.3);
        border-radius: 100%;
        box-sizing: content-box;
        box-shadow: 0 0 20px rgba(0,0,0,.3);
    }

    .hotbox .state .bottom,.hotbox .state .top {
        position: absolute;
        white-space: nowrap
    }

    .hotbox .state .bottom .button,.hotbox .state .top .button {
        display: inline-block;
        padding: 8px 15px;
        margin: 0 10px;
        border-radius: 15px;
        box-shadow: 0 0 30px rgba(0,0,0,.3);
        position: relative
    }

    .hotbox .state .bottom .button ._label,.hotbox .state .top .button ._label {
        font-size: 14px;
        vertical-align: middle;
        color: #000;
        line-height: 1em
    }

    .hotbox .state .bottom .button ._key,.hotbox .state .top .button ._key {
        font-size: 12px;
        line-height: 12px;
        vertical-align: middle;
        color: #999;
        margin-left: 3px
    }

    .hotbox .state .bottom .button ._key:before,.hotbox .state .top .button ._key:before {
        content: '('
    }

    .hotbox .state .bottom .button ._key:after,.hotbox .state .top .button ._key:after {
        content: ')'
    }

    .hotbox .state .button {
        background: #F9F9F9;
        overflow: hidden;
        cursor: default
    }

    .hotbox .state .button ._key,.hotbox .state .button ._label {
        opacity: .3
    }

    .hotbox .state .button.enabled {
        background: #fff
    }

    .hotbox .state .button.enabled ._key,.hotbox .state .button.enabled ._label {
        opacity: 1
    }

    .hotbox .state .button.enabled:hover {
        background: #e87372;
        cursor: pointer;
    }

    .hotbox .state .button.enabled:hover ._label {
        color: #fff
    }

    .hotbox .state .button.enabled:hover ._key {
        color: #fadfdf
    }

    .hotbox .state .button.enabled.selected {
        -webkit-animation: selected .1s ease;
        background: #e45d5c
    }

    .hotbox .state .button.enabled.selected ._label {
        color: #fff
    }

    .hotbox .state .button.enabled.selected ._key {
        color: #fadfdf
    }

    .hotbox .state .button.enabled.pressed,.hotbox .state .button.enabled:active {
        background: #FF974D
    }

    .hotbox .state .button.enabled.pressed ._label,.hotbox .state .button.enabled:active ._label {
        color: #fff
    }

    .hotbox .state .button.enabled.pressed ._key,.hotbox .state .button.enabled:active ._key {
        color: #fff0e6
    }

    .hotbox .state.active {
        display: block
    }
</style>
