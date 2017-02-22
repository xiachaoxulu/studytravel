<template>
<div>
    <combo-tree class="orgtype" style="width:100%;"
        :treedata="treeData"
        :vali="vali"
        :vali-msg="valiMsg"
        :idprop="idprop"
        :textprop="textprop"
        :childrenprop="childrenprop"
        :checkable="checkable"
        :multiple="multiple"
        :rootvisible="rootvisible"
        :nodeclicked="onNodeClick"
        :simplevaluemode = "simplevaluemode"
        :checkstrict="checkstrict"
        :checkonebyone="checkonebyone"
        :enabledrop="enabledrop"
    >
      <div data-toggle="dropdown">
        <div class="choose-input">
          <input type="text" class="form-control" v-model="displaySelectedName" placeholder="{{placeholder}}" readonly>
          <i class="material-icons">search</i>
        </div>
      </div>
    </combo-tree>
</div>
</template>
<script>
export default {
    props:{
        // 树数据
        tree:{
            type:Object,
            default(){
                return {};
            }
        },
        // 已选中的值
        selectedValue:{
            type:Array,
            twoWay:true,
            default(){
                return []
            }
        },
        // 是否点击选中改变 selectedValue，以此区分于 组件外 selectedValue 变化
        clickSelect:false,
        placeholder:{
            type:String,
            default:'请选择'
        },

        /* 代理配置 */
        vali:{
            type:String,
            default:''
        },
        valiMsg:{
            type:String,
            default:''
        },
        nodeclicked:{
            type:Function,
            default(){}
        },
        idprop: { // 树json数据中id属性的名称,默认是"id"
          type: String,
          default: 'ID'
        },
        textprop: { // 树json数据中节点文本显示text属性的名称,默认是"text"
          type: String,
          default: 'text'
        },
        childrenprop: { // 树json数据中子数据数组属性的名称,默认是"children"
          type: String,
          default: 'children'
        },
        checkable: { // 树节点是否显示勾选框,默认不显示
          type: Boolean,
          default: false
        },
        multiple: { // 树节点是否允许多选,默认单选(仅在checkable为true下设置有效)
          type: Boolean,
          default: false
        },
        rootvisible: { // 树根节点是否显示,默认显示
          type: Boolean,
          default: true
        },
        simplevaluemode:{
            type: Boolean,
            default: false
        },
        checkstrict: { // checkable 状态下节点选择完全受控(父子节点选中状态下不再关联)
          type: Boolean,
          default: false
        },
        checkonebyone: { // checkable 状态下，单个挨个儿选择节点
          type: Boolean
      },
      enabledrop: {
        type: Boolean,
        default: true
      },
    },
    computed:{
        displaySelectedName(){
            return this.selectedName.join(',');
        }
    },
    data(){
        return{
            treeData:{}, // 树数据
            selectedName:[], // 选中项文本
        }
    },
    watch:{
        tree(val){
            this.treeData = JSON.parse(JSON.stringify(val));
            this.initData(this.treeData);
        },
        // 以选中
        selectedValue(){
            if(this.clickSelect) return;
            this.initData(this.treeData);
        }
    },
    attached () {
        // this.treeData = Object.assign({},this.tree);
        // this.initData(this.treeData);

        this.treeData = JSON.parse(JSON.stringify(this.tree));
        this.initData(this.treeData);


    },
    methods: {
        // 初始化数据
        initData(treeNode){

            // console.log('初始化数据 initData')

            if (treeNode.children) {
                for (var i = 0; i < treeNode.children.length; i++) {

                    if(this.selectedValue && this.selectedValue.indexOf(treeNode.children[i][this.idprop])>-1){
                        this.selectedName.push(treeNode.children[i][this.textprop]);
                        this.$root.Vue.set(treeNode.children[i],'checked',true);
                    }

                    this.initData(treeNode.children[i]);
                }
            }

        },
        // 点击
        onNodeClick(data){

            this.clickSelect = true;

            if(Array.isArray(data)){
                this.selectedName = data.map((item) => {
                    return item[this.textprop]
                });

                this.selectedValue = data.map((item) => {
                    return item[this.idprop];
                })
            }
            this.nodeclicked(data);

            this.$nextTick(()=>{
                this.clickSelect = false;
            })
        }
    }
}
</script>
<style scoped>
.choose-input {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 100%;
}

.choose-input > input {
  color: #666;
  box-sizing: border-box;
  outline: none;
  padding: 0 30px 0 7px;
  font-size: 13px;
  width: 100%;
  cursor: pointer;
  background: #fff;
}

.choose-input > i {
  display: inline-block;
  position: absolute;
  width: 30px;
  height: 30px;
  top: 8px;
  right: 0;
  color: #999;
}
</style>
