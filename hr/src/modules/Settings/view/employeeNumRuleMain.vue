<!--
* @Created Date       : 2016-08-28T15:36:04+08:00
* @Last Modified time : 2016-12-02T17:31:46+08:00
 -->
<template>
	<header class="ui-module-navbar pos-topbar-fixed">
		<!-- <app-modulenavbar :show="showNavbar"> -->
		<div class="pull-left" style="padding-left:20px;padding-top:10px;">
			<h4><strong>组织与员工规则</strong></h4>
		</div>
		<!-- </app-modulenavbar> -->
	</header>
	<section class="ui-module-content ui-panel" style="background: #e8eaef;padding: 0 10px;">
		<div class="ui-module-row">
			<div class="com-col-m1-left ui-panel">
				<div style="margin: 15px;">
					<select  v-model="numRuleON" class="form-control" vali="required" vali-msg='必填项'>
          <!-- <option value="">请选择规则</option> -->
          <template v-for="option in numRuleList">
            <option value="{{option.ID}}" :selected="option.ID==numRuleON">{{option.name}}</option>
          </template>
        </select>
				</div>

				<div class="demi-analy-wrap" v-if='showRuleTitle'>
					<ui-scrollview>
						<ul>
							<li v-for='item in state.ruleList' @click="anaTabFn(item.ID)" data-index="0" :class="{'cur-bg':activeValue === item.ID}"><i class="icon-tool icon-tool-arrowRight"></i><a href="javascript:void(0)">{{item.ruleName}}</a></li>
						</ul>
					</ui-scrollview>
				</div>
				<div class="addEmployeeNumRuleListBtn" @click="addEmployeeNumRuleListBtn">
					<a href="javascript:void(0)">
						<i class="icon-tool icon-tool-add" style="color:#fd6d5a;font-size:12px;display:inline-block;"></i><span>添加</span></a>
				</div>
			</div>
			<div class="com-col-m1-middle ui-panel">
				<components :is="what" :num-rule-id="numRuleID" :type="numRuleType" :display.sync="dymicshow" v-if="dymicshow"></components>
			</div>
		</div>
	</section>
</template>
<script>
import store from '../store';
import addEmployeeNumRule from './addEmployeeNumRule';

export default {
  components: {
    addEmployeeNumRule,
  },
  data() {
    return {
      state: store.state,
      showNavbar: false,
      dymicshow: false,
      what:'',
      empKey: null,
      numRuleList: [{
        name: '员工工号规则',
        ID: 1,
      }],

      numRuleON: '1',
      numRuleID:'',
      numRuleType:'',
      showRuleTitle: true,
      activeValue:'',
    };
  },

  methods: {
    anaTabFn(ID) {
      this.activeValue=ID;
      this.dymicshow = true;
      this.numRuleID = ID.toString();
      this.what='addEmployeeNumRule';
      this.numRuleType='edit';
      this.$nextTick(()=>{
        this.$parent.$parent.$broadcast('loadRuleDetail');
      })
    },
    addEmployeeNumRuleListBtn(){
      this.dymicshow = true;
      this.what='';
      this.numRuleType='add';
      this.numRuleID='';
      this.$nextTick(()=>{
        this.what='addEmployeeNumRule';
      })
    }
  },
  ready() { 
    var self=this;
    store.actions.loadEmployeeNumberRuleList((data)=>{

    },()=>{

    });
  },

  attached() {
    let _this = this;
    setTimeout(function() {
      _this.showNavbar = true;
    }, 500);

    this.hasReady = true;
  },
  detached() {

  },

  watch: {
    'numRuleON' () {
      if (this.numRuleON == '1') {
        this.showRuleTitle = true;
      }
    }
  },

  events: {

  }
};
</script>
<style lang="css" scoped>
	.wrap {
		height: 100%;
		background: #e8eaef;
	}
	
	.emp-center-tab {
		position: absolute;
		right: 50%;
	}
	
	.emp-search-input {
		text-indent: 2.5em;
		height: 30px;
		line-height: 30px;
		width: 190px;
		border-radius: 40px;
		border: 1px solid #ccc;
		background: url(../../../assets/images/search.png) no-repeat 7% center;
		background-color: #d3d6dd;
	}
	
	.emp-search-input:focus {
		outline: none;
	}
	
	.com-col-m1-left {
		width: 260px;
		padding:10px 0 !important;
	}
	
	.com-col-m1-middle {
		left: 267px;
		right: 0;
	}
	
	.demi-analy-wrap {
		position: absolute;
		top: 65px;
		bottom: 80px;
		width: 260px;
	}
	
	.addEmployeeNumRuleListBtn {
		position: absolute;
		bottom: 20px;
		left: 67px;
		width: 136px;
		height: 40px;
		border: 1px solid #fc6552;
		text-align: center;
		line-height: 40px;
		border-radius: 5px;
	}
	
	.addEmployeeNumRuleListBtn a {
		text-decoration: none;
	}
	
	.demi-analy-wrap ul li {
		height: 30px;
		line-height: 30px;
		padding-left: 20px;
		/*margin-left: 20px;*/
		cursor: pointer;
	}
	
	.demi-analy-wrap ul li i {
		float: right;
		color: #fff;
		font-size: 12px;
	}
	
	.demi-analy-wrap ul li a {
		color: #000000;
		display: block;
		outline: none;
		text-decoration: none;
	}
	
	.demi-analy-wrap ul li:hover {
		background: #f3f3f3;
	}
	
	.demi-analy-wrap ul li.cur-bg {
		background: #a9adb9;
	}
	
	.demi-analy-wrap ul li.cur-bg a {
		color: #fff;
	}

</style>