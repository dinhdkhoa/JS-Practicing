Array.prototype.reduce2 = function (cb, initValue) {
  let accumulator = 0;
  let i = 1;
  if (initValue != undefined) {
    accumulator = initValue;
    i = 0;
  } else {
    accumulator = this[0];
  }
  for (i; i < this.length; i++) {
    accumulator = cb(accumulator, this[i], i, this);
  }
  return accumulator;
};

Array.prototype.reduce3 = function (cb, result) {
  let i = 0;
  if (arguments < 2) {
    result = this[0];
  }
  for (i; i < this.length; i++) {
    result = cb(accumulator, this[i], i, this);
  }
  return result;
};

Array.prototype.myMap = function (cb) {
  let results = [];
  let arrayLength = this.length;
  for (let i = 0; i < arrayLength; i++) {
    results.push(cb(this[i], i));
  }
  return results;
};

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

Array.prototype.mySome = function(cb) {
  
  for (var key in this) {
    if (this.hasOwnProperty(key)) {
      if(cb(this[key], key, this)){
        return true
      }   
    }
  }
    return false
}

Array.prototype.myEvery = function(cb) {
  for (var key in this) { 
 if (this.hasOwnProperty(key)) {
   if(!cb(this[key], key, this)){
       return false
     break
   }   
 }
}
 return true
}
