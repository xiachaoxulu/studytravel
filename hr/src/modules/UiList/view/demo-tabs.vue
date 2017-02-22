<template>
            <div class="ui-panel">

                <div class="ui-panel-title">Tab 标签页</div>
                <div class="ui-panel-content">
                    <div class="api"><a href="http://josephuspaye.github.io/Keen-UI/#/ui-tabs-docs" target="_blank">组件说明</a></div>

                            
                    <div class="demo">
                        <h4>文字Tab</h4>

                        <ui-tabs type="text">
                            <ui-tab header="智能物流(ERP)">
                                <p>集团整体议价采购降低风险</p>
                                <p>统一门店业务流程提高效率</p>
                                <p>数据说话提高利用率出成率</p>
                            </ui-tab>

                            <ui-tab header="总部电商(ECO)">
                                <p>所有外卖平台菜品一键上传</p>
                                <p>外卖订单总部汇总审核下发</p>
                                <p>各类营销劵码统一入口验证</p>
                            </ui-tab>

                            <ui-tab header="禁用状态" disabled>
                                <p>数据同步准确管控门店经营</p>
                                <p>多维跨店报表分析优化策略</p>
                                <p>统一品相管理控制经营成本</p>
                            </ui-tab>
                            <ui-tab header="会员管理(CRM)">
                                <p>会员实现连锁储值积分通刷</p>
                                <p>总部营销规则统一管理制定</p>
                                <p>微信会员系统实现精准营销</p>
                            </ui-tab>
                        </ui-tabs>

                        <h4>文字Tab，自适应宽度</h4>

                        <ui-tabs type="text" fullwidth>
                            <ui-tab header="智能物流(ERP)">
                                <p>集团整体议价采购降低风险</p>
                                <p>统一门店业务流程提高效率</p>
                                <p>数据说话提高利用率出成率</p>
                            </ui-tab>

                            <ui-tab header="总部电商(ECO)">
                                <p>所有外卖平台菜品一键上传</p>
                                <p>外卖订单总部汇总审核下发</p>
                                <p>各类营销劵码统一入口验证</p>
                            </ui-tab>

                            <ui-tab header="连锁收银(BOH)">
                                <p>数据同步准确管控门店经营</p>
                                <p>多维跨店报表分析优化策略</p>
                                <p>统一品相管理控制经营成本</p>
                            </ui-tab>
                            <ui-tab header="会员管理(CRM)">
                                <p>会员实现连锁储值积分通刷</p>
                                <p>总部营销规则统一管理制定</p>
                                <p>微信会员系统实现精准营销</p>
                            </ui-tab>
                        </ui-tabs>
                        <h4>图标 tab ，自适应宽度</h4>
                        <ui-tabs type="icon" fullwidth>
                            <ui-tab header="智能物流(ERP)" icon="book">
                                <p>集团整体议价采购降低风险</p>
                                <p>统一门店业务流程提高效率</p>
                                <p>数据说话提高利用率出成率</p>
                            </ui-tab>

                            <ui-tab header="总部电商(ECO)" icon="person">
                                <p>所有外卖平台菜品一键上传</p>
                                <p>外卖订单总部汇总审核下发</p>
                                <p>各类营销劵码统一入口验证</p>
                            </ui-tab>

                            <ui-tab header="连锁收银(BOH)" icon="collections_bookmark">
                                <p>数据同步准确管控门店经营</p>
                                <p>多维跨店报表分析优化策略</p>
                                <p>统一品相管理控制经营成本</p>
                            </ui-tab>
                            <ui-tab header="会员管理(CRM)" icon="favorite">
                                <p>会员实现连锁储值积分通刷</p>
                                <p>总部营销规则统一管理制定</p>
                                <p>微信会员系统实现精准营销</p>
                            </ui-tab>
                        </ui-tabs>

                        <h4>文字+图标+阴影+背景色</h4>
                        <ui-tabs type="icon-and-text" fullwidth raised background-color="primary" text-color="white"
                            text-color-active="white" indicator-color="white">
                            <ui-tab header="智能物流(ERP)" icon="book">
                                <p>集团整体议价采购降低风险</p>
                                <p>统一门店业务流程提高效率</p>
                                <p>数据说话提高利用率出成率</p>
                            </ui-tab>

                            <ui-tab header="总部电商(ECO)" icon="person">
                                <p>所有外卖平台菜品一键上传</p>
                                <p>外卖订单总部汇总审核下发</p>
                                <p>各类营销劵码统一入口验证</p>
                            </ui-tab>

                            <ui-tab header="连锁收银(BOH)" icon="collections_bookmark">
                                <p>数据同步准确管控门店经营</p>
                                <p>多维跨店报表分析优化策略</p>
                                <p>统一品相管理控制经营成本</p>
                            </ui-tab>
                            <ui-tab header="会员管理(CRM)" icon="favorite">
                                <p>会员实现连锁储值积分通刷</p>
                                <p>总部营销规则统一管理制定</p>
                                <p>微信会员系统实现精准营销</p>
                            </ui-tab>
                        </ui-tabs>

                    </div>

                </div>                
            </div>
</template>