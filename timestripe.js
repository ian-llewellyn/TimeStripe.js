function TimeStripeRotator(units) {
  return "rotate(" + (units % 360) + "deg)";
}

function TimeStripe(dom_element) {
  this.element = dom_element;
  this.actor = 'height';
  this.unitsPerHour(100);
  this.scroll = 'yes';

  // This is the default function used for CSS property values.
  this.func = function (units) { return units };

  setInterval((function() { this.updatePosition(); }).bind(this), 1000);
}

TimeStripe.prototype.style = function(styleObject) {
  styleObject = typeof styleObject !== 'undefined' ? styleObject : null;

  if ( styleObject === null ) {
    throw Error('You need to give me some CSS styles.');
  }

  for ( var attribute in styleObject ) {
    var value = styleObject[attribute];
    this.element.style.setProperty(attribute, value);
  }

  return this;
}

TimeStripe.prototype.align = function(alignment) {
  alignment = typeof alignment !== 'undefined' ? alignment : 'top';

  switch ( alignment ) {
  case 'left':
    this.animate('width');
    this.style({"top": 0, "left": 0});
    break;
  case 'right':
    this.animate('width')
    this.style({"top": 0, "right": 0});
    break;
  case 'top':
    this.animate('height')
    this.style({"top": 0, "left": 0});
    break;
  case 'bottom':
    this.animate('height')
    this.style({"bottom": 0, "left": 0});
    break;
  }

  return this;
}

TimeStripe.prototype.animate = function(property, min_func, max) {
  // Set the CSS property to animate or throw an error.
  if ( typeof property !== 'undefined' ) {
    this.actor = property;
  } else {
    throw Error('Give me a CSS property to animvate.');
  }

  if ( typeof min_func === 'function' ) {
    // User defined function is being passed in here.
    this.func = min_func;
    //this.min = undefined;
    //this.max = undefined;
  } else if ( typeof min_func === 'number' ) {
    // A minimum is being passed in.
    this.min = min_func;
  } else if ( typeof min_func !== 'undefined' ) {
    // Something other than a function or a number has been passed in.
    console.log(min_func);
    throw Error("I'm not sure what to do with parameter 2.");
  }

  // This is safe - undefined can be passed straight through.
  this.max = max

  return this;
}

TimeStripe.prototype.unitsPerHour = function(value) {
  if ( typeof value !== 'undefined' ) {
    this.hourSize = value;
  } else {
    return this.hourSize;
  }

  return this;
}

TimeStripe.prototype.scrolling = function(value) {
  if ( typeof value !== 'undefined' ) {
    this.scroll = value;
  } else {
    throw Error("yes or no, should I scroll after CSS updates");
  }

  return this;
}

TimeStripe.prototype.updatePosition = function() {
  // Adjust Bar Postition / Div Size
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();

  var value = (hour * this.hourSize) +
              ((minute / 60) * this.hourSize) +
              ((second / 3600) * this.hourSize);

  this.element.style.setProperty(this.actor, this.func(value));

  if ( this.scroll == 'yes' ) this.scrollPage();
}

TimeStripe.prototype.scrollPage = function() {
  var time_bar_pos = parseInt(this.element.style.height);

  if (time_bar_pos > 80) {
    window.scrollTo(0, time_bar_pos - 80);
  } else {
    window.scrollTo(0, 0);
  }
}
