//@charset UTF-8
/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Web.view.main.container.ContainerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main-container',

    control: {
        "#mainnav": {
            navSelect: function(appMainNav, record) {
                var maintabpanel = this.lookupReference('maintabpanel');
                maintabpanel.fireEvent("openTab", record);
            }
        }
    }
});
