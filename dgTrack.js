/* dgTrack Base Code (v1.0.0) - Track Events On Website 
 * Description: Track Custom Events in Facebook (& Other Analytics Tools).
 * @Ritwikga www.Digishuffle.com
 */


(function(glob, ns){
  
  function CookieData(cookieName, cookieDuration){
    if(!cookieName){throw 'Enter Cookie Name & Duration'}
    this.cookieName = cookieName;
    this.cookieDuration = cookieDuration;
    this.cookieValue = readCookie(this.cookieName)
    if(!this.cookieValue || this.cookieValue === "NaN"){
    this.cookieValue = 0;
    }
  }
  

  function pageviewCount(obj){
    if(!obj['cookie_name']){throw 'Kindly Enter the Cookie Name'}  
    var cookieInst = new CookieData(obj['cookie_name'], obj['cookie_duration']);
    var cookieName = cookieInst.cookieName 
    var cookieValueOld = cookieInst.cookieValue;
    var cookieDuration = cookieInst.cookieDuration;
    
    var cookieValueNew = String(parseInt(cookieValueOld) + 1);
    createCookie(cookieName, cookieValueNew, cookieDuration);
    if(obj['callback'] && typeof obj['callback'] === 'function'){
      obj.callback({cookieValueOld:cookieValueOld,cookieValueNew:cookieValueNew})
    }
   
  }
  
  
  function utmValues(obj){
    if(!obj['cookie_name']){throw 'Kindly Enter the Cookie Name'}  
    if(!obj['attributionType'] || obj['attributionType'].search(/^first$|^last$/) === -1)
    {throw 'Kindly Enter the "first" or "last" value'}  
    var cookieInst = new CookieData(obj['cookie_name'], obj['cookie_duration']);
    var cookieName = cookieInst.cookieName 
    var cookieValueOld = cookieInst.cookieValue;
    var cookieDuration = cookieInst.cookieDuration;
    var cookieValueNew = false;
    var attrData = {}

    attrData = attributionCookie(cookieValueOld,obj['attributionType'])
    cookieValueNew = attrData['cookieValueNew'];

    createCookie(cookieName, cookieValueNew, cookieDuration);
    if(obj['callback'] && typeof obj['callback'] === 'function'){
      obj.callback(attrData);
    }
  }
  
  function getParams(txt){
   return txt.split('&').reduce(function(aggr,i){
   var objkey = i.split("=");
   aggr[objkey[0]] = objkey[1];
   return aggr
   },{})
  }
  

  function attributionCookie(cookieValueOld, attributionType){
   var obj = getParams(document.location.search.slice(1));
   var source='not_set', medium='not_set', campaign='not_set';
   var cookie_value = false;
   var docReferrer = document.referrer;
   if(docReferrer !== "" && docReferrer.search(location.hostname) === -1){
    source = cleanURL(docReferrer);medium = "referral"
  };
   if(source.search(/www\.google|www\.bing|duckduckgo|yandex/g) > -1){medium = "organic"};
   if(obj['gclid']){source = "google";medium = "cpc"};
   if(obj['fbclid']){source = "facebook";medium = "referral"};
   if(obj['utm_source']){source = obj['utm_source']};
   if(obj['utm_medium']){medium = obj['utm_medium']};
   if(obj['utm_campaign']){campaign = obj['utm_campaign']};

   //Additional Params//
   var date = new Date();
   var dateArray = date.toLocaleDateString('en-US').split('/')
   var acquisitionDate = dateArray[2]+("0" + dateArray[0]).slice(-2)+("0" + dateArray[1]).slice(-2)
   var acquisitionMonth = ("0" + dateArray[0]).slice(-2)
   var acquisitionPage = location.pathname

   if(source !== 'not_set' && medium !== 'not_set' && 
    (attributionType === 'last' || (attributionType === 'first' && !cookieValueOld))) {
   cookie_value = 'utm_source='+source+'&utm_medium='+medium+'&utm_campaign='+campaign+
   "&utm_content="+acquisitionPage+"&utm_date="+acquisitionDate+"&utm_month="+acquisitionMonth;     
   } else {
    if(cookieValueOld) {cookie_value = cookieValueOld;}
    else {cookie_value = 'utm_source=direct&utm_medium=none&utm_campaign=not_set'+
   "&utm_content="+acquisitionPage+"&utm_date="+acquisitionDate+"&utm_month="+acquisitionMonth;}
     var cookieObj = getParams(cookie_value)
     source = cookieObj['utm_source'] ? cookieObj['utm_source'] : 'not_set';;
     medium = cookieObj['utm_medium'] ? cookieObj['utm_medium'] : 'not_set';
     campaign = cookieObj['utm_campaign'] ? cookieObj['utm_campaign'] : 'not_set';
     acquisitionDate = cookieObj['utm_date'] ? cookieObj['utm_date'] : 'not_set';
     acquisitionMonth = cookieObj['utm_month'] ? cookieObj['utm_month'] : 'not_set';
     acquisitionPage = cookieObj['utm_content'] ? cookieObj['utm_content'] : 'not_set';
   } 
  
   return {source:source,medium:medium,campaign:campaign,acquisitionDate:acquisitionDate,
    acquisitionMonth:acquisitionMonth,landingPage:acquisitionPage,cookieValueOld:cookieValueOld,
    cookieValueNew:cookie_value
  };    
  
  }
  
  function cleanURL(url){
    if(url.search(/\?/) > -1) {
      url = url.substr(0,url.search(/\?/))
    } 
    return url.replace(/http:\/\/|https:\/\/|\//g,'');
  }
  
// Source : https://www.quirksmode.org/js/cookies.html ///
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
 
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
 
function eraseCookie(name) {
	createCookie(name,"",-1);
}


var globalExports = {
  pageviewCount:pageviewCount,
  utmValues:utmValues
}
glob[ns] = glob[ns] || {};  
for(i in globalExports) {
 if(globalExports.hasOwnProperty(i)){
  glob[ns][i] = globalExports[i] 
 }
}  
}).call(window, window, 'dgTrack');
