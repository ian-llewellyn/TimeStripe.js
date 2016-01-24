# TimeStripe.js
If you have a listing of something against time, a Radio schedule for example,
TimeStripe.js can be used to help quickly find what matters right now. Assuming
your schedule has a fixed number of pixels per hour, the library overlays a red
line at the present time and shades everything in the past.

## To Use
Add the following to `<head>`:
```html
<script type="text/javascript" src="js/timestripe.js"></script>
<link rel="stylesheet" href="timestripe.css">
```

And the following to the `<body>` of the document:
```html
<div id="TimeStripe"></div>
<script type="text/javascript">
  new TimeStripe(document.getElementById('TimeStripe'));
</script>
```

## Customisation
You can make the TimeStripe animate horizontally by initialising it with:
```javascript
 TimeStripe(<DOM element>).animate('width').style({"border": "0 2px 0 0"});
```

The default number of pixels per hour is 100 including the top and bottom borders.
If you'd like it to be anything else, initialise the TimeStripe like so:
```javascript
 TimeStripe(<DOM element>).unitsPerHour(200);
```

You can define a style for the DOM element you pass to the creator:
```javascript
 TimeStripe(<DOM element>).style({"background-image": "url('...')", ...);
```

Normally, the height of the CSS property animates as time goes by, however,
you can easily specify any other numerical property to be animated:
```javascript
 TimeStripe(<DOM element>).animate('opacity');
```
In the event that you want to do something a little more specific, you can pass
a function to the animate method which should return the value to be assigned
to the CSS property.
```javascript
 TimeStripe(<DOM element>).animate("transform", function (units) {
  return "rotate(" + (units % 360) + "deg)";
});
```
Because the above is a reasonably common use for the library, it is included
and can be called as follows:
```javascript
 TimeStripe(<DOM element>).animate("transform", TimeStripeRotator);
```

Usually, after updating the property to be animated, the page scrolls to a new
position. This only really makes sense if the property being animated results
in something being pushed out of view. Override this behaviour with:
```javascript
 TimeStripe(<DOM element>).scrolling('no');
```
