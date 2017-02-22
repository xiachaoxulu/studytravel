<template>
                <div class="ui-panel">

                    <div class="ui-panel-title">Upload 上传     </div>
                    <div class="ui-panel-content">
                        <div class="api"><a href="" target="_blank">组件说明</a></div>

                        <ui-upload submiturl="url" filetypelimit="" :filecountlimit="5" :callback="okcb"></ui-upload>

                    </div>
                </div>
</template>