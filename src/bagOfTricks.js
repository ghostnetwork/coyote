
function colorWithAlpha(color, alpha) {
  // Assumes color has format of '#RRGGBB'
  var red = parseInt(color.substring(1, 3), 16);
  var green = parseInt(color.substring(3, 5), 16);
  var blue = parseInt(color.substring(5, 7), 16);
  return 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha +')';
}
