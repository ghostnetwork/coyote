
function colorWithAlpha(color, alpha) {
  // Assumes color has format of '#RRGGBB'
  var red = color.substring(1, 3);
  var green = color.substring(3, 5);
  var blue = color.substring(5, 7);
  return 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha +')';
}
