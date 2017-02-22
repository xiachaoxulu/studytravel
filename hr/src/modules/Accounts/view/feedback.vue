<template>
    <div class="problem-wrap">
        <div class="feedback-textarea">
            <ui-validator>
                <div>
                    <form class="form-horizontal container-fluid" vali-submit="submitBt|submitedCall"
                          vali-reset="resetBt|resetedCall">
                        <div class="form-body">
                            <div class="form-group row">
                                <div class="col-sm-24">
                                    <textarea class="form-control" rows="10" vali="required|maxStr:100|minStr:10"
                                              vali-msg="请输入10-100字" disabled="disabled"></textarea>
                                </div>
                            </div>
                            <div class="form-actions">
                                <div class="row">
                                    <div class="text-center">
                                        <ui-button color="success" disabled class="large" id="submitBt">提交</ui-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </ui-validator>
        </div>
    </div>
</template>
<style>
    .problem-wrap {
        background: #fff;
        padding: 20px;
    }

</style>