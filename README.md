# dgTrack - Library To Track Website Events.
Track Website events like PageviewCount (per User/Session), Source, Medium, Campaign, Landing Page, Acquisition Date/Month (UTM Values - First/Last Attribution) & more... 
Can be used to track custom events in Facebook, GTM (dataLayer) or any other analytics tool.

## Getting Started
* Copy & Paste the `dgtrack` at the end of body tag enclosed in `<script></script>` OR as a Custom HTML Tag in GTM. 
* After that you'll need to include one or more of the below event codes as per your requirement.

### 1. Pageviews Per User

 
```js
/**
 * Assigns the pageviewcount in the cookie
 */
dgTrack.pageviewCount({
 cookie_name: 'pv_per_user',
 cookie_duration: 365*2,
 callback : function(obj){ 
 // Insert your event tracking code here : facebook custom event example //
 fbq('trackCustom','PageviewsPerUser',{
 'Pages Viewed': obj['cookieValueNew'],
 'page':location.pathname
  })
 }
})

```

The object returned in the callback will contain the following values. 
* `cookieValueOld` : The previous page count.
* `cookieValueNew`: The new page count.

For dataLayer you can simply replace fbq('trackCustom'...... event code with dataLayer.push as follows:

```js
dataLayer.push({
 event:'pageviewCountEvent',
 pageviewCount: obj['cookieValueNew']
})
```
After this you can create variable named 'pageviewCount' & event trigger with value as 'pageviewCountEvent'

### 2. Pageviews Per Session

The only difference between this event & the former one is you don't need to specify `cookie_duration` parameter in this one.

```js
/**
 * Assigns the pageviewcount in the cookie
 */
dgTrack.pageviewCount({
 cookie_name: 'pv_per_sess',
 callback : function(obj){ 
 // Insert your event tracking code here : facebook custom event example //
 fbq('trackCustom','PageviewsPerSession',{
  'Pages Viewed': obj['cookieValueNew'],
  'page':location.pathname
  })  
 }
})

```

The object returned in the callback will contain the following values. 
* `cookieValueOld` : The previous page count.
* `cookieValueNew`: The new page count.

For dataLayer you can simply replace fbq('trackCustom'...... event code with dataLayer.push as follows:

```js
dataLayer.push({
 event:'pageviewCountEvent',
 pageviewCount: obj['cookieValueNew']
})
```


### 3. First Attribution Source, Medium & Campaign (UTM Values)

Use the following code to track the initial source, medium & campaign of the user landing on the website

```js
dgTrack.utmValues({
 cookie_name: 'futm',
 cookie_duration: 180,
 attributionType : 'first',
 callback : function(obj){	
 // Insert your event tracking code here : facebook custom event example //
 fbq('trackCustom','firstAttribution',{
 'Source': obj['source'],
 'Medium': obj['medium'],
 'Campaign': obj['campaign']
  })  
 }
})
```

The object returned in the callback will contain the following values. 
* `source` : The source of the visit. (Eg: direct, google.com, example.com, utm_source value)
* `medium`: The 'medium' value of the visit. (Eg: none, referral, utm_medium value)
* `campaign`: The 'campaign' value of the visit. (Eg: utm_campaign value)
* `landingPage`: The landing page of the visit. (Eg: /home/index.html )
* `acquisitionDate`: The date of the the visit . (Format: YYYYMMDD)
* `acquisitionMonth`: The month of the visit. (Format: MM)
* `cookieValueOld`: The previous cookie value. (Format: MM)
* `cookieValueNew`: The current cookie value. (Format: MM)


For dataLayer you can simply replace fbq('trackCustom'...... event code with dataLayer.push as follows:

```js
dataLayer.push({
 event:'firstAttributionEvent',
 source:obj['source'],
 medium:obj['medium'],
 campaign:obj['campaign'],
 landingPage:obj['landingPage'],
 acquisitionDate:obj['acquisitionDate'],
 acquisitionMonth:obj['acquisitionMonth']
})
```


### 4. Last Attribution Source, Medium & Campaign (UTM Values)

In the following code, you can track the last (recent) source, medium & campaign of the user landing on the website. 

The only different is to change the `cookie_name` & `attributionType` parameter to `last`.


```js
dgTrack.utmValues({
 cookie_name: 'lutm',
 cookie_duration: 180,
 attributionType : 'last',
 callback : function(obj){	
 // Insert your event tracking code here : facebook custom event example //
 fbq('trackCustom','lastAttribution',{
  'Source': obj['source'],
  'Medium': obj['medium'],
  'Campaign': obj['campaign']
 })  
}
})
```

The object returned in the callback will contain the following values. 
* `source` : The source of the last (recent) visit. (Eg: direct, google.com, example.com, utm_source value)
* `medium`: The 'medium' value of the last (recent) visit. (Eg: none, referral, utm_medium value)
* `campaign`: The 'campaign' value of the last (recent) visit. (Eg: utm_campaign value)
* `landingPage`: The landing page of the last (recent) visit. (Eg: /home/index.html )
* `acquisitionDate`: The date of the the last (recent) visit . (Format: YYYYMMDD)
* `acquisitionMonth`: The month of the last (recent) visit. (Format: MM)
* `cookieValueOld`: The previous cookie value. (Format: MM)
* `cookieValueNew`: The current cookie value. (Format: MM)


For dataLayer you can simply replace fbq('trackCustom'...... event code with dataLayer.push as follows:

```js
dataLayer.push({
 event:'firstAttributionEvent',
 source:obj['source'],
 medium:obj['medium'],
 campaign:obj['campaign'],
 landingPage:obj['landingPage'],
 acquisitionDate:obj['acquisitionDate'],
 acquisitionMonth:obj['acquisitionMonth']
})
```



#### Using All Or Some Events

To use all or some of the above events simply install them after the base dgtrack code.  


```js
///////////
//
//dgtrack base code//
//
///////////



// Pageview per user code //
dgTrack.pageviewCount({
 cookie_name: 'pv_per_user',
 cookie_duration: 365*2,
 callback : function(obj){ 
 // Insert your event tracking code here : facebook custom event example //
 fbq('trackCustom','PageviewsPerUser',{
 'Pages Viewed': obj['cookieValueNew'],
 'page':location.pathname
  })
 }
})

//Pageview per Session code //
dgTrack.pageviewCount({
 cookie_name: 'pv_per_sess',
 callback : function(obj){ 
 // Insert your event tracking code here : facebook custom event example //
 fbq('trackCustom','PageviewsPerSession',{
  'Pages Viewed': obj['cookieValueNew'],
  'page':location.pathname
  })
 }
})

dgTrack.utmValues({
 cookie_name: 'futm',
 cookie_duration: 180,
 attributionType : 'first',
 callback : function(obj){	
 // Insert your event tracking code here : facebook custom event example //
 fbq('trackCustom','firstAttribution',{
  'Source': obj['source'],
  'Medium': obj['medium'],
  'Campaign': obj['campaign']
  })  
 }
})


dgTrack.utmValues({
 cookie_name: 'lutm',
 cookie_duration: 180,
 attributionType : 'last',
 callback : function(obj){	
 // Insert your event tracking code here : facebook custom event example //
 fbq('trackCustom','lastAttribution',{
  'Source': obj['source'],
  'Medium': obj['medium'],
  'Campaign': obj['campaign']
  })  
 }
})

```

Note: Make sure to have different cookie names & custom event names.


## More Information

For more information on the setup & use cases, check out the below links.

* [16 Powerful Facebook Custom Events](https://www.digishuffle.com/blogs/10-facebook-custom-events-to-build-custom-audiences-define-conversions/)
* [How To Track Acquisition Dimensions in Google Analytics via GTM](https://www.digishuffle.com/blogs/acquisition-dimensions/)
