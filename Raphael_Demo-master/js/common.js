$(function(){
	//语法高亮
	
	SyntaxHighlighter.config.clipboardSwf = '../../js/syntaxhighlighter-2.1.382/scripts/clipboard.swf';
	SyntaxHighlighter.all();

})

setInfoContent=function(id,newtext,fontSize,colour)
{
	var divwidthpx=500;
	var color="#f00";
	if(colour)color=colour;
	var leftpx=($(window).width()/2)-(divwidthpx/2)+"px";
	var toppx=0;
	var fontFamily="Trebuchet MS, Verdana, Arial"; 
	if(!fontSize)fontSize="110%";
	var newtext = newtext.replace(/\(br\)/gi,'\<br\>');

	$('#'+id).html(newtext);    
	$('#'+id).css('width', divwidthpx);
	$('#'+id).css('left', leftpx);
	$('#'+id).css('height', "auto");
	$('#'+id).css('font-size', fontSize);
	$('#'+id).css('font-family', fontFamily);
	$('#'+id).css('visibility', 'visible');
	$('#'+id).css('color', color);
	toppx=document.getElementById(id).offsetHeight;
	toppx=480-toppx;
	toppx=toppx+"px";
	$('#'+id).css('top', toppx);
	//if(iever>0 && iever<9) $('#'+id).css('vertical-align','text-top');

	return $('#'+id).offsetHeight;
}

setContent  = function(id,content){
	$('#'+id).html(content);

}