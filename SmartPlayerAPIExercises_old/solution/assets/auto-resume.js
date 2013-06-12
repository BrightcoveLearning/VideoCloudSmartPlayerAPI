var player;
var vpm;
var bclocation;

function myTemplateLoaded(experienceID)
{
	//console.log("myTemplateLoaded");
	player = brightcove.api.getExperience(experienceID);
	vpm = player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
}

function onTemplateReady(evt)
{
	//console.log("onTemplateReady");
	bclocation = getCookie("bc-location");
	//console.log(bclocation);
	//console.log("Seekable: " + vpm.seekable());
	vpm.play();
	//console.log("Seekable: " + vpm.seekable());
	//waitForSeekable();
	setTimeout(stopAndSeek, 300);
}

function waitForSeekable()
{
	console.log("waitForSeekable");
	if (vpm.seekable())
	  stopAndSeek();
	else
	  setTimeout(waitForSeekable, 50);
}

function stopAndSeek()
{
	console.log("stopAndSeek");
	vpm.pause();
	vpm.seek(bclocation);
}

window.onbeforeunload = OnBeforeUnload;

function OnBeforeUnload()
{
	console.log("Saving video time...");
	vpm.getVideoPosition(false, setTime);	
}

function setTime(time)
{
	setCookie("bc-location", time);
}

function setCookie(name, value)
{
	var date = new Date();
	date.setDate(date.getDate() + 7);
	document.cookie = name + "=" + value + ";expires=" + date.toUTCString();
}

function getCookie(name)
{
	console.log("getCookie: " + name);
	var cname;
	var cvalue;
	var cookies = document.cookie.split(";");
	for (var i = 0; i < cookies.length; i++)
	{
	  cname = cookies[i].substr(0, cookies[i].indexOf("="));
	  cvalue = cookies[i].substr(cookies[i].indexOf("=") + 1);
	  if (cname == name)
	  {
	    console.log("getCookie returning: " + cvalue);
	    return unescape(cvalue);
	  }
	}
	console.log("getCookie returning");
}