var socket;
var debug = false  ;
var messageDiv;
var statusDiv;
var button;
var textField;
// Shake sensitivity (a lower number is more)
var sensitivity = 20;
// Position variables
var x1 = 0, y1 = 0, z1 = 0, x2 = 0, y2 = 0, z2 = 0;
var asciiTable=[];
var delay = 10;
var vMultiplier = 0.01;
var myColor;
var rgb = 0;
var origRGB = hsb2rgb([Math.random()*360,100,100]);

function changeBGC(color){
	document.body.style.backgroundColor=color;
	
}
$(document).ready( function() {

  for(var  i =48 ; i < 122 ; i++)
  {
    asciiTable.push(Math.random()*360);
  }


  var width = $(window).width(); 
  var height = $(window).height(); 
  $("#container").width(width);
  $("#container").height(height*2);
  if(!debug)removeElement("container");
  setupSocket();
  setupDevice();
  document.getElementById("brow").textContent = " " + BrowserDetect.browser + " "
  + BrowserDetect.version +" " + BrowserDetect.OS +" ";

  messageDiv = document.getElementById("messages");
  statusDiv = document.getElementById("status");

	//setup message sending button
	message = document.getElementById("message");
	button = document.getElementById("button");

	// send the form when you press enter 
	// or when you press the button
	button.onclick = function(e){
    // sendColor();
    sendMessageForm();
  };
  $("#message").keyup(function(event){
   if(event.keyCode == 13){
    sendMessageForm()
  }});
  // var rgb = hsb2rgb([Math.random()*360,100,100]);
  var color = ((0 << 24) | (rgb[0] << 16) |  (rgb[1] << 8) | rgb[2]);
  myColor = "#"+color.toString(16);//RGB2HTML(rgb[0],rgb[1],rgb[2]);
  changeBGC(myColor);
});
function hsb2rgb(hsb) {
  var red, grn, blu, i, f, p, q, t;
  hsb[0]%=360;
  if(hsb[2]==0) {return(new Array(0,0,0));}
  hsb[1]/=100;
  hsb[2]/=100;
  hsb[0]/=60;
  i = Math.floor(hsb[0]);
  f = hsb[0]-i;
  p = hsb[2]*(1-hsb[1]);
  q = hsb[2]*(1-(hsb[1]*f));
  t = hsb[2]*(1-(hsb[1]*(1-f)));
  if (i==0) {red=hsb[2]; grn=t; blu=p;}
  else if (i==1) {red=q; grn=hsb[2]; blu=p;}
  else if (i==2) {red=p; grn=hsb[2]; blu=t;}
  else if (i==3) {red=p; grn=q; blu=hsb[2];}
  else if (i==4) {red=t; grn=p; blu=hsb[2];}
  else if (i==5) {red=hsb[2]; grn=p; blu=q;}
  red = Math.floor(red*255);
  grn = Math.floor(grn*255);
  blu = Math.floor(blu*255);
  return (new Array(red,grn,blu));
}
// function rgb2hsb(r,g,b)
// {
//  var hue, saturation, brightness;
//  // if (hsbvals == null) {
//  //   hsbvals = new float[3];
//  // }
//  var cmax = (r > g) ? r : g;
//  if (b > cmax) cmax = b;
//  var cmin = (r < g) ? r : g;
//  if (b < cmin) cmin = b;

//  brightness = ( cmax) / 255;
//  if (cmax != 0)
//    saturation = ( (cmax - cmin)) / ( cmax);
//  else
//    saturation = 0;
//  if (saturation == 0)
//    hue = 0;
//  else {
//    var redc = ( (cmax - r)) / ( (cmax - cmin));
//    var greenc = ( (cmax - g)) / ( (cmax - cmin));
//    var bluec = ( (cmax - b)) / ( (cmax - cmin));
//    if (r == cmax)
//      hue = bluec - greenc;
//    else if (g == cmax)
//      hue = 2 + redc - bluec;
//    else
//      hue = 4 + greenc - redc;
//    hue = hue / 6;
//    if (hue < 0)
//      hue = hue + 1;
//  }
//  var hsbvals = new Array(0,0,0);
//  hsbvals[0] = float2int(hue*360);
//  hsbvals[1] = float2int(saturation*100);
//  hsbvals[2] = float2int(brightness*100);
//  return hsbvals;

// }
window.onresize = function(event) {
  var width = $(window).width(); 
  var height = $(window).height(); 
  $("#container").width(width);
  $("#container").height(height*2);
       // window.resizeTo( w,h )


     }
     function removeElement(elementName)
     {
      document.getElementById(elementName).style.display="none";
    }

// send value from text input
function sendMessageForm(){

  var n=message.value.split("");
  // var colors = [];
  var edited = "{";
  rgb = origRGB;

  edited+="\"colors\": [\n";

  for (var i = 0 ;i < n.length ;i++)
  {
    var  charCode = message.value.charCodeAt(i);
    // console.log();
    // var rgb = hsb2rgb([asciiTable[charCode-48],100,100]);
    // var rgb = hsb2rgb([ofMap(charCode,48,122,0,360),100,100]);
    
    myColor = "#"+  rgbToHex(rgb[0],rgb[1],rgb[2]);
    
    edited+= '{"r":'+rgb[0]+
    ',"g":'+rgb[1]+''+
    ',"b":'+rgb[2]+'},';
  }
  edited = edited.slice(0, -1);
  edited+="]";
  edited += "}";
  
  log(edited);
  socket.send(edited);

  message.value = "";

  changeBGC(myColor);
}
function ofMap(value,  inputMin,  inputMax,  outputMin,  outputMax,  clamp) {

  if (Math.abs(inputMin - inputMax) < 1.19209290){

    return outputMin;
  } else {
    var outVal = ((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin);

    if( clamp ){
      if(outputMax < outputMin){
        if( outVal < outputMax )outVal = outputMax;
        else if( outVal > outputMin )outVal = outputMin;
      }else{
        if( outVal > outputMax )outVal = outputMax;
        else if( outVal < outputMin )outVal = outputMin;
      }
    }
    return outVal;
  }

}
function sendColor(){

    myColor = "#"+  rgbToHex(rgb[0],rgb[1],rgb[2]);//RGB2HTML(rgb[0],rgb[1],rgb[2]);
    var edited = "{";
    edited+='\"colors\": [\n';
    edited+= '{"r":'+rgb[0]+
    ',"g":'+rgb[1]+''+
    ',"b":'+rgb[2]+'},';
    edited = edited.slice(0, -1);
    edited+="]";
    edited += "}";


    socket.send(edited);
    // message.value = "";
    
    changeBGC(myColor);
  }
  function rgbToHex(R,G,B) {return toHex(R)+toHex(G)+toHex(B)}
  function toHex(n) {
   n = parseInt(n,10);
   if (isNaN(n)) return "00";
   n = Math.max(0,Math.min(n,255));
   return "0123456789ABCDEF".charAt((n-n%16)/16)
   + "0123456789ABCDEF".charAt(n%16);
 }


// setup web socket
function setupSocket(){

	// setup websocket
	// get_appropriate_ws_url is a nifty function by the libwebsockets people
	// it decides what the websocket url is based on the broswer url
	// e.g. https://mygreathost:9099 = wss://mygreathost:9099

	if (BrowserDetect.browser == "Firefox") {
		socket = new MozWebSocket(get_appropriate_ws_url());
	} else {
		socket = new WebSocket(get_appropriate_ws_url());
	}
	
	// open
	try {
		socket.onopen = function() {
			statusDiv.style.backgroundColor = "#40ff40";
			statusDiv.textContent = " websocket connection opened ";
			// socket.send(myColor);
		} 

		// received message
		socket.onmessage =function got_packet(msg) {

      var jsonVal = jQuery.parseJSON( msg.data ) ;
      // if(debug)
      // {
      //   dir("jsonVal "+jsonVal);
      //   dir("msg.data "+msg.data);
      // }
      // var rgb =  hsb2rgb([jsonVal.hue,jsonVal.saturate,jsonVal.brightness]);
      for(var i = 0 ; i < jsonVal['elements'].length ; i++)
      {
        var element = jsonVal['elements'][i];
        if(element['address']=='/channel0')
        {
          var args = element['args'];
          myColor = "#"+rgbToHex(args[0]['value'],args[1]['value'],args[2]['value']);

          changeBGC(myColor);
        }
      }
      if(debug)
      {
        messageDiv.innerHTML = myColor + "<br />" + messageDiv.innerHTML;
        messageDiv.innerHTML = "Msg from socket"+ msg.data  + "<br />" + messageDiv.innerHTML;
      }
    }

    socket.onclose = function(){
     statusDiv.style.backgroundColor = "#ff4040";
     statusDiv.textContent = " websocket connection CLOSED ";
   }
 } catch(exception) {
  alert('<p>Error' + exception);  
}
}

function setupDevice()
{
	if (window.DeviceMotionEvent==undefined) {
    	// document.getElementById("no").style.display="block";
    	// document.getElementById("yes").style.display="none";

    } else {
      window.addEventListener('devicemotion', function (e) {
        x1 = e.accelerationIncludingGravity.x;
        y1 = e.accelerationIncludingGravity.y;
        z1 = e.accelerationIncludingGravity.z;
      }, false);
    	// window.ondevicemotion = function(event) {

    	// 	x1 = e.accelerationIncludingGravity.x;
     //        y1 = e.accelerationIncludingGravity.y;
     //        z1 = e.accelerationIncludingGravity.z;
    	// }

    	setInterval(function() {


        var change = Math.abs(x1-x2+y1-y2+z1-z2);

        if (change > sensitivity) {
          rgb = origRGB;
          sendColor();
        }
        else if (change > sensitivity*0.5) 
        {
          rgb[0] = 0;
          rgb[1] = 0;
          rgb[2] = 0;
          sendColor();  
        }  

                // Update new position
                x2 = x1;
                y2 = y1;
                z2 = z1;
              }, delay);
    } 
  }
  function log( msg)
  {
    if(debug)console.log(msg);
  }

  function dir( msg)
  {
    if(debug)console.dir(msg);
  }


  function float2int (value) {
    return value | 0;
  }