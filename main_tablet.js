/*Element.prototype.leftTopScreen = function () {
                var x = this.offsetLeft;
                var y = this.offsetTop;

                var element = this.offsetParent;

                while (element !== null) {
                    x = parseInt (x) + parseInt (element.offsetLeft);
                    y = parseInt (y) + parseInt (element.offsetTop);

                    element = element.offsetParent;
                }

                return new Array (x, y);
  }
	document.addEventListener ("DOMContentLoaded", function () {
                var getmy_canvas =  $("#draw_here");

                var xy = getmy_canvas.leftTopScreen ();

                var context = getmy_canvas[0].getContext ("2d");

                context.fillStyle = "rgb(255,255,255)";   
                context.fillRect (0, 0, 500, 500);

                getmy_canvas.addEventListener ("mousemove", function (event) {
                    var x = event.clientX;
                    var y = event.clientY;

                    context.fillStyle = "rgb(255, 0, 0)";  
                    context.fillRect (x - xy[0], y - xy[1], 5, 5);
                });
            }); */
$(document).ready(function() { 					
	var getmy_canvas = $("#draw_here");
	var my_canvas = getmy_canvas[0].getContext("2d");
	var clickX = new Array();
	var clickY = new Array();
	var clickDrag = new Array();
	var paint;

	function addClick(x, y, dragging)
	{
		clickX.push(x);
		clickY.push(y);
		clickDrag.push(dragging);
	}
	function redraw(){
		getmy_canvas[0].width = getmy_canvas[0].width; // Clears the canvas

		my_canvas.strokeStyle = "#df4b26";
		my_canvas.lineJoin = "round";
		my_canvas.lineWidth = 5;

		for(var i=0; i < clickX.length; i++)
		{		
			my_canvas.beginPath();
			if(clickDrag[i] && i){
				my_canvas.moveTo(clickX[i-1], clickY[i-1]);
			}else{
				my_canvas.moveTo(clickX[i]-1, clickY[i]);
			}
			my_canvas.lineTo(clickX[i], clickY[i]);
			my_canvas.closePath();
			my_canvas.stroke();
		}
	}
	getmy_canvas[0].addEventListener('touchstart', function(e)
	{
		$('#msg_debug').text('mousedown');
		paint = true;
		addClick(e.pageX-this.offsetLeft, e.pageY-this.offsetTop);
		redraw();
	});
	/*$('#draw_here').mousemove(function(e){
		$('#msg_debug').text('mousemove('+(e.clientX-this.offsetLeft)+','+(e.clientY-this.offsetTop)+')');
		if(paint){
			addClick(e.clientX-this.offsetLeft, e.clientY-this.offsetTop, true);
			redraw();
		}
	});*/
	getmy_canvas[0].addEventListener('touchmove', function(e)
	{
		$('#msg_debug').text('mousemove('+(e.pageX)+','+(e.pageY)+')');
		e.preventDefault();
		if(paint){
			addClick(e.pageX-this.offsetLeft, e.pageY-this.offsetTop, true);
			redraw();
		}
	});
	/*$('#draw_here').mouseup(function(e){
		$('#msg_debug').text('mouseup');
		paint = false;
	});*/
	getmy_canvas[0].addEventListener('touchend', function(e)
	{
		$('#msg_debug').text('mouseup');
		paint = false;
	});
	
	$('#draw_here').mouseleave(function(e){
		$('#msg_debug').text('mouseleave');
		paint = false;
	});
	
	function getQueryXY(){
		var result='';
		for(var i=0; i < clickX.length; i++)
		{	
			result = result + clickX[i] +','+ clickY[i];
		}
		return result;
	}
	
	$('#btSend').bind('click', function(event){
		alert('click');
	});
	
	
});/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


