/**
 * @Created Date       : 2016-11-07T10:07:30+08:00
 * @Last Modified time : 2016-11-08T10:41:30+08:00
 */



/* keen ui*/


/* vstrap */
// import vModal           from 'components/vstrap/Modal'
// import vSidebar         from 'components/vstrap/Aside'
// import vAlert           from 'components/vstrap/Alert'
import vDropdown from 'components/vstrap/Dropdown'
import vSelect from 'components/vstrap/Select'
import vOption from 'components/vstrap/option'
import vSpinner from 'components/vstrap/Spinner'

/* app components */
import appFunction from 'components/appFunction'
import appHeader from 'components/appHeader'
import appModulenavbar from 'components/appModulenavbar'
import appSelectEmployee from 'components/appSelectEmployee'
import appEmployeeChoose from 'components/appEmployeeChoose'
import appDistrictSelect from 'components/appDistrictSelect'
import appApprovalTimeline from 'components/appApprovalTimeline'
/* ui components*/
import uiTimepicker from 'components/ui/timePicker'
import uiTree from 'components/ui/tree'
import uiTreeshow from 'components/ui/treeshow'
import uiSidebar from 'components/ui/sidebar'
import uiSideContent from 'components/ui/sideContent'
import uiScrollview from 'components/ui/scrollview'
import uiUpload from 'components/ui/upload'
import uiSimpleupload from 'components/ui/simpleUpload'
import uiTags from 'components/ui/tags'
import uiButtongroup from 'components/ui/buttongroup'
import uiPagination from 'components/ui/pagination'
import uiDragdrop from 'components/ui/dragdrop'
import 'components/ui/datepicker.js'
import uiAvatar from 'components/ui/Avatar'
import uiTable from 'components/ui/table'
import uiGrid from 'components/ui/grid'
import uiReport from 'components/ui/report'
import uiValidator from 'components/ui/validator'
import comboTree from 'components/ui/combotree'
import uiCombotree from 'components/ui/combotrees'
import uiTransfer from 'components/ui/transfer'
import uiCheckboxgroup from 'components/ui/checkboxgroup'
import uiColorpicker from 'components/ui/colorpicker'
import uiSearch from 'components/ui/search'
import uiCollapse from 'components/ui/collapse'
import uiCalendar from 'components/ui/calendar'
import uiMonth from 'components/ui/month'
import uiFullscreen from 'components/ui/fullscreen'
import uiImageView from 'components/ui/imageView'
/* app card list*/

// import cardStore from 'modules/Dashboard/view/cardStore'
// import cardKaoqin from 'modules/Dashboard/view/cardKaoqin'
// import cardWarning from 'modules/Dashboard/view/cardWarning'
// import cardEmployee from 'modules/Dashboard/view/cardEmployee'

const Ui = {
  install(Vue) {

    /********************************UI组件********************************/

    Vue.component('uiTimepicker', uiTimepicker);
    Vue.component('uiTree', uiTree);
    Vue.component('uiTreeshow', uiTreeshow);
    Vue.component('uiUpload', uiUpload);
    Vue.component('uiSimpleupload', uiSimpleupload);
    Vue.component('uiSidebar', uiSidebar);
    Vue.component('uiSidecontent', uiSideContent);
    Vue.component('uiScrollview', uiScrollview);
    Vue.component('uiTags', uiTags);
    Vue.component('uiButtongroup', uiButtongroup);
    Vue.component('uiPagination', uiPagination);
    Vue.component('uiDragdrop', uiDragdrop);
    Vue.component('uiAvatar', uiAvatar);
    Vue.component('uiTable', uiTable);
    Vue.component('uiGrid', uiGrid);
    Vue.component('uiReport', uiReport);
    Vue.component('uiValidator', uiValidator);
    Vue.component('comboTree', comboTree);
    Vue.component('uiCombotree', uiCombotree);
    Vue.component('uiTransfer', uiTransfer);
    Vue.component('uiCheckboxgroup', uiCheckboxgroup);
    Vue.component('uiColorpicker', uiColorpicker);
    Vue.component('uiSearch', uiSearch);
    Vue.component('uiCollapse', uiCollapse);
    Vue.component('uiCalendar', uiCalendar);
    Vue.component('uiMonth', uiMonth);
    Vue.component('uiFullscreen', uiFullscreen);
    Vue.component('uiImageView', uiImageView);
    Vue.component('vDropdown', vDropdown);
    // Vue.component('vAlert',vAlert);    Vue.component('vDropdown', vDropdown);
    Vue.component('vSelect', vSelect);
    Vue.component('vOption', vOption);
    Vue.component('vSpinner', vSpinner);

    /******************************* 业务组件 *******************************/
    //
    Vue.component('appFunction', appFunction);
    Vue.component('appHeader', appHeader);
    Vue.component('appModulenavbar', appModulenavbar);
    // Vue.component('appUserinfo', appUserinfo);


    //新增人员
    Vue.component('appSelectEmployee', appSelectEmployee);
    Vue.component('appEmployeeChoose', appEmployeeChoose);
    Vue.component('appDistrictSelect', appDistrictSelect);
    Vue.component('appApprovalTimeline', appApprovalTimeline);


    // appcard
    // Vue.component('cardStore',cardStore);
    // Vue.component('cardKaoqin',cardKaoqin);
    // Vue.component('cardWarning',cardWarning);
    // Vue.component('cardEmployee',cardEmployee);


  }
};

module.exports = Ui;
