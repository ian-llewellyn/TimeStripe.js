# TimeStripe.js
If you have a listing of something against time, a Radio schedule for example,
TimeStripe can be used to help quickly find what matters right now. Assuming
your schedule has a fixed number of pixels per hour, the library overlays a red
line at the present time and shades everything in the past.

## To Use
Add the following to <head>:
```javascript
<script type="text/javascript" src="js/timestripe.js">
```

And the following to the body of the document:
```javascript
<div id="TimeStripe"></div>
<script type="text/javascript">
  new TimeStripe(document.getElementById('TimeStripe'));
</script>
```

## Customisation
You can make the TimeStripe animate horizontally by initialising it with
```javascript
 TimeStripe(<DOM element>).align('left');
```

The default number of pixels per hour is 100 including the top and bottom borders.
If you'd like it to be anything else, initialise the TimeStripe like so:
```javascript
 TimeStripe(<DOM element>).pixelsPerHour(200);
```

You can define a style for the DOM element you pass to the creator:
```javascript
 TimeStripe(<DOM element>).style({"background-image": "url('...')", ...);
```

Normally, the hight is the CSS property animated as time goes by, however,
you can specify any othe numerical property to be animated:
```javascript
 TimeStripe(<DOM element>).animate('rotation', [min, max]); or
 TimeStripe(<DOM element>).animate('opacity', [min, max]);
```

Usually, after updating the property to be animated, the page scrolls to a new
position. This only really makes sense if the property being animated results
in something being pushed out of view. Override this behaviour with:
```javascript
 TimeStripe(<DOM element>).scrolling('no');
```
