// Assign to `a` all properties in `b` that are not in `reserved`
// or already in `a`
module.exports = function(a, b, reserved) {
  for (var x in b) {
    if (!b.hasOwnProperty(x)) continue;
    if (a[x]) continue;
    if (reserved[x]) continue;
    a[x] = b[x];
  }
}
