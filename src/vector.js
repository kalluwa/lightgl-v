// Provides a simple 3D Vector3 class. Vector3 operations can be done using member
// functions, which return new vectors, or static functions, which reuse
// existing vectors to avoid generating garbage.
function Vector3(x, y, z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
}

function Vector2(x,y){
  this.x = x || 0;
  this.y = y || 0;
}

function Vector4(x,y,z,w){
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
  this.w = w || 0;
}
// ### Instance Methods
// The methods `add()`, `subtract()`, `multiply()`, and `divide()` can all
// take either a Vector3 or a number as an argument.
Vector3.prototype = {
  negative: function() {
    return new Vector3(-this.x, -this.y, -this.z);
  },
  add: function(v) {
    if (v instanceof Vector3) return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
    else return new Vector3(this.x + v, this.y + v, this.z + v);
  },
  subtract: function(v) {
    if (v instanceof Vector3) return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
    else return new Vector3(this.x - v, this.y - v, this.z - v);
  },
  multiply: function(v) {
    if (v instanceof Vector3) return new Vector3(this.x * v.x, this.y * v.y, this.z * v.z);
    else return new Vector3(this.x * v, this.y * v, this.z * v);
  },
  divide: function(v) {
    if (v instanceof Vector3) return new Vector3(this.x / v.x, this.y / v.y, this.z / v.z);
    else return new Vector3(this.x / v, this.y / v, this.z / v);
  },
  equals: function(v) {
    return this.x == v.x && this.y == v.y && this.z == v.z;
  },
  dot: function(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  },
  cross: function(v) {
    return new Vector3(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
  },
  length: function() {
    return Math.sqrt(this.dot(this));
  },
  unit: function() {
    return this.divide(this.length());
  },
  min: function() {
    return Math.min(Math.min(this.x, this.y), this.z);
  },
  max: function() {
    return Math.max(Math.max(this.x, this.y), this.z);
  },
  toAngles: function() {
    return {
      theta: Math.atan2(this.z, this.x),
      phi: Math.asin(this.y / this.length())
    };
  },
  angleTo: function(a) {
    return Math.acos(this.dot(a) / (this.length() * a.length()));
  },
  toArray: function(n) {
    return [this.x, this.y, this.z].slice(0, n || 3);
  },
  clone: function() {
    return new Vector3(this.x, this.y, this.z);
  },
  init: function(x, y, z) {
    this.x = x; this.y = y; this.z = z;
    return this;
  }
};

// ### Instance Methods
// The methods `add()`, `subtract()`, `multiply()`, and `divide()` can all
// take either a Vector3 or a number as an argument.
Vector2.prototype = {
  negative: function() {
    return new Vector2(-this.x, -this.y);
  },
  add: function(v) {
    if (v instanceof Vector2) return new Vector2(this.x + v.x, this.y + v.y);
    else return new Vector2(this.x + v, this.y + v);
  },
  subtract: function(v) {
    if (v instanceof Vector2) return new Vector2(this.x - v.x, this.y - v.y);
    else return new Vector2(this.x - v, this.y - v);
  },
  multiply: function(v) {
    if (v instanceof Vector2) return new Vector3(this.x * v.x, this.y * v.y);
    else return new Vector2(this.x * v, this.y * v);
  },
  divide: function(v) {
    if (v instanceof Vector2) return new Vector3(this.x / v.x, this.y / v.y);
    else return new Vector2(this.x / v, this.y / v);
  },
  equals: function(v) {
    return this.x == v.x && this.y == v.y;
  },
  dot: function(v) {
    return this.x * v.x + this.y * v.y;
  },
  length: function() {
    return Math.sqrt(this.dot(this));
  },
  unit: function() {
    return this.divide(this.length());
  },
  min: function() {
    return Math.min(this.x, this.y);
  },
  max: function() {
    return Math.max(this.x, this.y);
  },
  toArray: function(n) {
    return [this.x, this.y].slice(0, n || 2);
  },
  clone: function() {
    return new Vector3(this.x, this.y);
  },
  init: function(x, y) {
    this.x = x; this.y = y; 
    return this;
  },
  toVector3:function(n){
    
    switch(n){
      case 0:
        return new Vector3(0,x,y);
      case 1:
        return new Vector3(x,0,y);
      case defaut:
      case 2:
        return new Vector3(x,y,0);
    }
  },
};

Vector4.prototype = {
  negative: function() {
    return new Vector4(-this.x, -this.y, -this.z,-this.w);
  },
  add: function(v) {
    if (v instanceof Vector4) return new Vector4(this.x + v.x, this.y + v.y, this.z + v.z,this.w + v.w);
    else return new Vector4(this.x + v, this.y + v, this.z + v,this.w + v);
  },
  subtract: function(v) {
    if (v instanceof Vector4) return new Vector4(this.x - v.x, this.y - v.y, this.z - v.z,this.w - v.w);
    else return new Vector4(this.x - v, this.y - v, this.z - v,this.w - v);
  },
  multiply: function(v) {
    if (v instanceof Vector4) return new Vector4(this.x * v.x, this.y * v.y, this.z * v.z,this.w * v.w);
    else return new Vector4(this.x * v, this.y * v, this.z * v,this.w * v);
  },
  divide: function(v) {
    if (v instanceof Vector4) return new Vector4(this.x / v.x, this.y / v.y, this.z / v.z,this.w / v.w);
    else return new Vector4(this.x / v, this.y / v, this.z / v,this.w/v);
  },
  equals: function(v) {
    return this.x == v.x && this.y == v.y && this.z == v.z && this.w == v.w;
  },
  dot: function(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
  },
  length: function() {
    return Math.sqrt(this.dot(this));
  },
  unit: function() {
    return this.divide(this.length());
  },
  min: function() {
    return Math.min(Math.min(this.x, this.y), Math.min(this.w,this.z));
  },
  max: function() {
    return Math.max(Math.max(this.x, this.y), Math.max(this.w,this.z));
  },

  toArray: function(n) {
    return [this.x, this.y, this.z,this.w].slice(0, n || 4);
  },
  clone: function() {
    return new Vector4(this.x, this.y, this.z,this.w);
  },
  init: function(x, y, z,w) {
    this.x = x; this.y = y; this.z = z;this.w = w;
    return this;
  }
};

// ### Static Methods
// `Vector3.randomDirection()` returns a Vector3 with a length of 1 and a
// statistically uniform direction. `Vector3.lerp()` performs linear
// interpolation between two vectors.
Vector3.negative = function(a, b) {
  b.x = -a.x; b.y = -a.y; b.z = -a.z;
  return b;
};
Vector3.add = function(a, b, c) {
  if (b instanceof Vector3) { c.x = a.x + b.x; c.y = a.y + b.y; c.z = a.z + b.z; }
  else { c.x = a.x + b; c.y = a.y + b; c.z = a.z + b; }
  return c;
};
Vector3.subtract = function(a, b, c) {
  if (b instanceof Vector3) { c.x = a.x - b.x; c.y = a.y - b.y; c.z = a.z - b.z; }
  else { c.x = a.x - b; c.y = a.y - b; c.z = a.z - b; }
  return c;
};
Vector3.multiply = function(a, b, c) {
  if (b instanceof Vector3) { c.x = a.x * b.x; c.y = a.y * b.y; c.z = a.z * b.z; }
  else { c.x = a.x * b; c.y = a.y * b; c.z = a.z * b; }
  return c;
};
Vector3.divide = function(a, b, c) {
  if (b instanceof Vector3) { c.x = a.x / b.x; c.y = a.y / b.y; c.z = a.z / b.z; }
  else { c.x = a.x / b; c.y = a.y / b; c.z = a.z / b; }
  return c;
};
Vector3.cross = function(a, b, c) {
  c.x = a.y * b.z - a.z * b.y;
  c.y = a.z * b.x - a.x * b.z;
  c.z = a.x * b.y - a.y * b.x;
  return c;
};
Vector3.unit = function(a, b) {
  var length = a.length();
  b.x = a.x / length;
  b.y = a.y / length;
  b.z = a.z / length;
  return b;
};
Vector3.fromAngles = function(theta, phi) {
  return new Vector3(Math.cos(theta) * Math.cos(phi), Math.sin(phi), Math.sin(theta) * Math.cos(phi));
};
Vector3.randomDirection = function() {
  return Vector3.fromAngles(Math.random() * Math.PI * 2, Math.asin(Math.random() * 2 - 1));
};
Vector3.min = function(a, b) {
  return new Vector3(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.min(a.z, b.z));
};
Vector3.max = function(a, b) {
  return new Vector3(Math.max(a.x, b.x), Math.max(a.y, b.y), Math.max(a.z, b.z));
};
Vector3.lerp = function(a, b, fraction) {
  return b.subtract(a).multiply(fraction).add(a);
};
Vector3.fromArray = function(a) {
  return new Vector3(a[0], a[1], a[2]);
};
Vector3.angleBetween = function(a, b) {
  return a.angleTo(b);
};

// ### Static Methods
// `Vector3.randomDirection()` returns a Vector3 with a length of 1 and a
// statistically uniform direction. `Vector3.lerp()` performs linear
// interpolation between two vectors.
Vector2.negative = function(a, b) {
  b.x = -a.x; b.y = -a.y; 
  return b;
};
Vector2.add = function(a, b) {
  if (b instanceof Vector2) { c.x = a.x + b.x; c.y = a.y + b.y;  }
  else { c.x = a.x + b; c.y = a.y + b; }
  return c;
};
Vector2.subtract = function(a, b, c) {
  if (b instanceof Vector2) { c.x = a.x - b.x; c.y = a.y - b.y; }
  else { c.x = a.x - b; c.y = a.y - b;  }
  return c;
};
Vector2.multiply = function(a, b, c) {
  if (b instanceof Vector2) { c.x = a.x * b.x; c.y = a.y * b.y;  }
  else { c.x = a.x * b; c.y = a.y * b; }
  return c;
};
Vector2.divide = function(a, b, c) {
  if (b instanceof Vector2) { c.x = a.x / b.x; c.y = a.y / b.y;  }
  else { c.x = a.x / b; c.y = a.y / b; }
  return c;
};

Vector2.unit = function(a, b) {
  var length = a.length();
  b.x = a.x / length;
  b.y = a.y / length;
  return b;
};

Vector2.min = function(a, b) {
  return new Vector2(Math.min(a.x, b.x), Math.min(a.y, b.y));
};
Vector2.max = function(a, b) {
  return new Vector2(Math.max(a.x, b.x), Math.max(a.y, b.y));
};
Vector2.lerp = function(a, b, fraction) {
  return b.subtract(a).multiply(fraction).add(a);
};
Vector2.fromArray = function(a) {
  return new Vector2(a[0], a[1]);
};

// ### Static Methods
// `Vector3.randomDirection()` returns a Vector3 with a length of 1 and a
// statistically uniform direction. `Vector3.lerp()` performs linear
// interpolation between two vectors.
Vector4.negative = function(a, b) {
  b.x = -a.x; b.y = -a.y; b.z = -a.z;b.w = -a.w;
  return b;
};
Vector4.add = function(a, b, c) {
  if (b instanceof Vector4) { c.x = a.x + b.x; c.y = a.y + b.y; c.z = a.z + b.z; c.w = a.w + b.w;}
  else { c.x = a.x + b; c.y = a.y + b; c.z = a.z + b; c.w = a.w + b;}
  return c;
};
Vector4.subtract = function(a, b, c) {
  if (b instanceof Vector4) { c.x = a.x - b.x; c.y = a.y - b.y; c.z = a.z - b.z;c.w = a.w - b.w; }
  else { c.x = a.x - b; c.y = a.y - b; c.z = a.z - b;c.w = a.w - b; }
  return c;
};
Vector4.multiply = function(a, b, c) {
  if (b instanceof Vector4) { c.x = a.x * b.x; c.y = a.y * b.y; c.z = a.z * b.z;c.w = a.w * b.w; }
  else { c.x = a.x * b; c.y = a.y * b; c.z = a.z * b; c.w = a.w * b;}
  return c;
};
Vector4.divide = function(a, b, c) {
  if (b instanceof Vector4) { c.x = a.x / b.x; c.y = a.y / b.y; c.z = a.z / b.z; c.w = a.w / b.w; }
  else { c.x = a.x / b; c.y = a.y / b; c.z = a.z / b; c.w = a.w /b;}
  return c;
};

Vector4.unit = function(a, b) {
  var length = a.length();
  b.x = a.x / length;
  b.y = a.y / length;
  b.z = a.z / length;
  b.w = a.w / length;
  return b;
};

Vector4.min = function(a, b) {
  return new Vector4(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.min(a.z, b.z),Math.min(a.w,b.w));
};
Vector4.max = function(a, b) {
  return new Vector4(Math.max(a.x, b.x), Math.max(a.y, b.y), Math.max(a.z, b.z),Math.max(a.w,b.w));
};
Vector4.lerp = function(a, b, fraction) {
  return b.subtract(a).multiply(fraction).add(a);
};
Vector4.fromArray = function(a) {
  return new Vector4(a[0], a[1], a[2],a[3]);
};

