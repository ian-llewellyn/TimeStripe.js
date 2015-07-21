function updateBar() {
  var hour_size = 100; // Include the thickness of top and bottom borders.

  // Adjust Bar Postition / Div Size
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();

  var height = (hour * hour_size) + ((minute / 60) * hour_size);

  document.getElementById('time-bar').style.height = height;

  scrollPage();

  setTimeout(function() { updateBar(); }, 30000);
}

function scrollPage() {
  var time_bar_pos = parseInt(document.getElementById('time-bar').style.height);

  if (time_bar_pos > 80) {
    window.scrollTo(0, time_bar_pos - 80);
  } else {
    window.scrollTo(0, 0);
  }
}

window.onload = function() { setTimeout(updateBar(), 2000); };
