/**
 * @class Web.view.common.CascadeTreePanel
 * @extends Ext.tree.panel
 * Description
 */
Ext.define('Web.view.common.CascadeTreePanel', {
	extend: 'Ext.tree.TreePanel',
	xtype: 'cascadetreepanel',
	initComponent: function() {
		this.callParent(arguments);
	},
	listeners: {
		checkchange: function(node, checked, eOpts) {
			for (var i = 0; i < node.childNodes.length; i++) {
				node.childNodes[i].checked = checked;
			}
			console.log(123456);
			console.log(node);
			console.log(checked);
			console.log(eOpts);
		}
	}
});