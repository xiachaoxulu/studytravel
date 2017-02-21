/**
 * A Picker field that contains a tree panel on its popup, enabling selection of tree nodes.
 */
Ext.define('Web.view.common.ComboGrid', {

    extend: 'Ext.form.field.Picker',
    xtype: 'gridpicker',

    uses: [
        'Ext.grid.Panel',
    ],

    triggerCls: Ext.baseCSSPrefix + 'form-arrow-trigger',

    config: {
        store: null,
        displayField: null,
        columns: null,
    },

    texts: {

        selectItems: '确定',

        closeItems: '关闭'
    },

    editable: false,

    initComponent: function() {
        var me = this;

        me.callParent(arguments);
    },


    createPicker: function() {
        var me = this,
            opts = Ext.apply({
                shrinkWrapDock: 2,
                manageHeight: false,
                store: me.store,
                displayField: me.displayField,
                columns: me.columns,
                columnLines: true,
                rowLines: true,
                forceFit: true,
                layout: 'fit',
                floating: true,
                enableColumnMove: false,
                enableColumnResize: false,
                enableColumnHide: false,
                selType: "checkboxmodel",
                selModel: {
                    injectCheckbox: 0,
                    mode: "SINGLE", //"SINGLE"/"SIMPLE"/"MULTI"
                    checkOnly: true //只能通过checkbox选择
                },
                viewConfig: {
                    stripeRows: true,
                },
                dockedItems: me.getDockedItems()

            }, me.listConfig);

        var picker = me.picker = Ext.create('Ext.grid.Panel', opts);

        return picker;
    },

    getDockedItems: function() {
        var me = this;
        var bar = this.dockedItems = new Ext.toolbar.Toolbar({
            dock: 'bottom',
            items: [
                new Ext.toolbar.Fill(),
                new Ext.Button({
                    text: me.texts.selectItems,
                    handler: me.onGetSelected,
                    scope: me,
                    glyph: 0xf00c,
                }),
                new Ext.Button({
                    text: me.texts.closeItems,
                    handler: me.onClose,
                    scope: me,
                    glyph: 0xf00d
                })
            ]
        });

        return bar;
    },


    onClose: function() {

        this.collapse();
    },

    onSelect: function(view, record) {

    },

    onGetSelected: function(btn, e) {
        var me = this;
        var grid = me.getPicker();
        var selection = grid.getSelectionModel().getSelection();

        if (Ext.isArray(selection)) {

            var data = [];
            Ext.Array.each(selection, function(record) {

                Ext.Array.push(data, record);
                me.fireEvent('select', me, record);
            }, me);

            this._setValue(data);
            this.onClose();
        }

    },
    onExpand: function() {
        var me = this,
            picker = me.getPicker(),
            store = picker.store,
            value = me.value,
            selected = [];
        if (!Ext.isEmpty(value) && value != "") {
            Ext.each(me.value, function(id) {
                var sel;
                for (var i = 0; i < store.getCount(); i++) {
                    if (store.getAt(i).get('ID') == id) {
                        sel = store.getAt(i);
                        break;
                    }
                }
                Ext.Array.push(selected, sel);
            });
        }
        picker.getSelectionModel().select(selected);
    },


    _setValue: function(record) {
        var me = this,
            displays = [],
            values = [];

        if (!Ext.isArray(record) && Ext.isObject(record)) {

            displays.push(record ? record.get(me.displayField) : '');
            values.push(record ? record.get(me.valueField) : '');
        } else {

            Ext.Array.each(record, function(item) {

                Ext.Array.push(displays, (item ? item.get(me.displayField) : ''));
                Ext.Array.push(values, (item ? item.get(me.valueField) : ''));
            }, me);
        }

        me.value = values;
        me.setRawValue(displays);

        return me;
    },

    alignPicker: function() {
        var me = this,
            picker;

        if (me.isExpanded) {
            picker = me.getPicker();
            var w = 30;
            Ext.each(picker.columns, function(u) {
                w += u.cellWidth;
            })
            picker.setWidth(w);
            if (picker.isFloating()) {
                me.doAlign();
            }
        }
    },


});