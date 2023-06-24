Array.prototype.myFilter = function (cb) {
  let output = [];
  for (var key in this) {
    if (this.hasOwnProperty(key)) {
      var result = cb(this[key], key, this);
      // console.log(key);
      if (result) {
        output.push(this[key]);
      }
    }
  }
  return output;
};

const numbers = [1, 2, 3, 4];

console.log(
  numbers.myFilter(function (number) {
    return number % 2 === 0;
  })
);
Output: [2, 4];
