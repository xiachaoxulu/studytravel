(function() {

  Raphael.fn.fireModalDialog=function(cpb,registerDomSelectors,message,buttons)
  {
    var paper2 = this;
    var modal = paper.set();
    /*middleYRap is 480 (Code window) + 90 (half the panel size height) */
    var middleYRap=570;
    cpb.attr({ opacity:0.5 });
    modal.push(cpb);
    /*Mini-modal lies on top of promoted control panel*/

    cpc=paper2.ellipse(320,90,135,90).attr({fill: "#000", stroke: "#FA980A","stroke-width":5});
   
    modal.push(cpc);

    this.showModalFace=function(message,buttons,onClickAction,fontSize)
    {
      this.showMessageDiv(message,fontSize);
      for(var i=0;i<modal.length;i++) { modal.toFront(); }
      for(var i=0;i<registerDomSelectors.length;i++)
      {
        document.getElementById(registerDomSelectors[i]).style.zIndex="-1";
      }
      setButtonConfig(buttons,modal[2],modal[3]);
      if(buttons==1 || buttons==2){ modal[2].unclick(modal[2].onClickok);modal[2].click(onClickAction[0]); }
      if(buttons==2){ modal[3].unclick(modal[3].onClicknotok);modal[3].click(onClickAction[1]);}
      modal[0].attr({ opacity:0.5 });
      
    }
    this.shutModal=function()
    {
      for(var i=modal.length-1;i>=0;i--)  { modal.toBack(); }
      for(var i=0;i<registerDomSelectors.length;i++)
      {
        document.getElementById(registerDomSelectors[i]).style.zIndex="1";
      }
      modal[0].attr({ opacity:1 });
      $('#modaltextdiv').css('visibility',"hidden");
    }
    this.showMessageDiv=function(message,fontSize)
    {
      $('#modaltextdiv').css('visibility','visible');
      //101
      message=message.replace(/\(br\)/gi,'<br>');
      $('#modaltextdiv').html(message);
      var modaltextdivheight=document.getElementById('modaltextdiv').offsetHeight;
      /*Change the top of the Modal div*/
      topYModalText=middleYRap-(modaltextdivheight/2);
      $('#modaltextdiv').css('top', topYModalText+'px');
      if(fontSize)$('#modaltextdiv').css('font-size', fontSize);
    }

    setButtonConfig=function(buttons,okModalB,notOkModalB)
    {
      switch(buttons)
      {
        case 0: okModalB.hide();notOkModalB.hide();break;
        case 1: okModalB.show();notOkModalB.hide();break;
        case 2: okModalB.show();notOkModalB.show();
          
        }
        return {okModalB:okModalB,notOkModalB:notOkModalB};
    }
    getButtonDynamics=function(textForObject, buttonCharacter, yHeight)
    {
      var Stroke="#fff";
      var Fill="#000";
      RapTextObject=paper2.text(320, yHeight, textForObject).attr(buttonCharacter);
      var bbox=RapTextObject.getBBox();
      cx=bbox.x+(bbox.width/2);
      cy=bbox.y+(bbox.height/2);
      cx2=(cx-bbox.x)*(cx-bbox.x);cy2=(cy-bbox.y)*(cy-bbox.y);
      r=Math.sqrt(cx2+cy2);

      Bton=paper2.circle(320,yHeight,r)
        .attr({fill:Fill,stroke:Stroke,"fill-opacity":0.3,"stroke-width":5});

      //Bton.click(onClickAction);  
      Bton.mouseover(
      function (e){
              this.animate({ fill: Stroke, stroke: Fill }, 1000);RapTextObject.animate({ fill: Fill }, 1000);
            }
      );  
      Bton.mouseout(
      function (e) {
              this.animate({ fill: Fill, stroke: Stroke }, 1000);RapTextObject.animate({ fill: Stroke }, 1000);
            }
      );
      return paper.set(RapTextObject,Bton); 
    }
  //this.onClickok=onClickAction[0];
  //this.onClicknotok=onClickAction[1];
  /*modal:-Contains order and affected/relevant Raphael/SVG objects(Existing) used to cover other Raphael existing objects*/
  /*loops to layer objects*/


  modal.push(getButtonDynamics("OK",   { "font-size":24,fill:"#000","stroke-width":5,stroke:"#fff" },150));
  
  modal.push(getButtonDynamics("Not",  { "font-size":16,fill:"#000","stroke-width":2,stroke:"#fff" },30));


  modals=setButtonConfig(buttons,modal[2],modal[3]);
  modal[2]=modals.okModalB;modal[3]=modals.notOkModalB;
  this.okModal=modal[2];
  this.notOkModal=modal[3];
  for(var i=0;i<modal.length;i++) { modal.toFront(); }
  for(var i=0;i<registerDomSelectors.length;i++)
  {
    document.getElementById(registerDomSelectors[i]).style.zIndex="-1";
  }

  /*Show html DOM div*/ 
  this.showMessageDiv(message);
  return this;
  }
})();
