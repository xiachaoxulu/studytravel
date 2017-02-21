<!--
* @Created Date       : 2016-11-11T15:54:05+08:00
* @Last Modified time : 2016-12-01T10:07:00+08:00
 -->



{{#.}}
<div class="{{className}}">
    {{#list}}
          <div class="{{className}}" data-key="{{index}}">
            <h2>{{cnName}}</h2>
            {{#listp}}
              <p>{{.}}</p>
            {{/listp}}
              <div  class="click-module" data-key="{{index}}">
               <h1>{{cnName}}</h1>
               <p>{{clickText}}</p>
               <div class="bottom"><a href="javascript:void(0)" date-value="{{cnName}}">查看详情></a></div>
              </div>
          </div>
    {{/list}}
</div>
{{/.}}
