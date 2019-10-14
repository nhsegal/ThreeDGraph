let cols;
let rows;
let scl = 10;
let counter = 0;
let w;
let w2;
let w3;
let Ar;
let Ai;
let Br;
let Bi;
let Cr;
let Ci;
let Dr;
let Di;
let zReMin;
let zReMax;
let zImMin;
let zImMax;
let wReMin;
let wReMax;
let wImMin;
let wImMax;

let shiftY;
let shiftX;

let switchButton;
let switchFactor = 0;

function preload() {
  Ar = document.getElementById("Ar");
  Ai = document.getElementById("Ai");
  Br = document.getElementById("Br");
  Bi = document.getElementById("Bi");
  Cr = document.getElementById("Cr");
  Ci = document.getElementById("Ci");
  Dr = document.getElementById("Dr");
  Di = document.getElementById("Di");
  switchButton = document.getElementById("switchButton");
  zReMin = document.getElementById("zReMin");
  zReMax = document.getElementById("zReMax");
  zImMin = document.getElementById("zImMin");
  zImMax = document.getElementById("zImMax");
  wReMin = document.getElementById("wReMin");
  wReMax = document.getElementById("wReMax");
  wImMin = document.getElementById("wImMin");
  wImMax = document.getElementById("wImMax");
}

function setup() {
  let canvas = createCanvas(500, 400, WEBGL);
  canvas.parent('sketch-holder');
  camera(0, 0, 600, 0, 0, 0, 0, 1, 0);
  cols = 500 / scl;
  rows = 500 / scl;
  w = new Array(cols);
  w2 = new Array(cols);
  w3 = new Array(cols);
  render();
}

function draw() {
  ambientLight(155);
  colorMode(RGB);
  orbitControl();
  background(130);
  rectMode(CENTER);
  stroke(255);
  strokeWeight(1);

  push();
  shiftX = map(-0.5 * (parseFloat(zReMin.value) + parseFloat(zReMax.value)),
    parseFloat(zReMin.value), parseFloat(zReMax.value), -width / 2, width / 2);

  shiftZ = map(-0.5 * (parseFloat(zImMin.value) + parseFloat(zImMax.value)),
    parseFloat(zImMin.value), parseFloat(zImMax.value), -width / 2, width / 2);

  shiftY = map(0, parseFloat(wReMin.value), parseFloat(wReMax.value), -width / 2, width / 2);

  translate(shiftX / 2, -shiftY, shiftZ / 2);
  fill(255, 0, 0);
  box(1000, 4, 4); //axes are boxes because line doesn't work with WebGL
  fill(0, 255, 0);
  box(4, 1000, 4);
  fill(0, 0, 255);
  box(4, 4, 1000);
  pop();

  colorMode(HSB);
  if (!switchFactor) {
    for (let x = 0; x < cols; x++) {
      for (let z = 0; z < rows; z++) {
        let c = mod(map(w[x][z].im, parseFloat(wImMin.value), parseFloat(wImMax.value), 0, 250), 250);
        let c2 = mod(map(w2[x][z].im, parseFloat(wImMin.value), parseFloat(wImMax.value), 0, 250), 250);
        let c3 = mod(map(w3[x][z].im, parseFloat(wImMin.value), parseFloat(wImMax.value), 0, 250), 250);
        let Xcord = map(x, 0, cols, -cols / 2, cols / 2);
        let Zcord = map(z, 0, rows, -rows / 2, rows / 2);
        let Ycord1 = map(w[x][z].re, parseFloat(wReMin.value), parseFloat(wReMax.value), -rows / 2, rows / 2);
        let Ycord2 = map(w2[x][z].re, parseFloat(wReMin.value), parseFloat(wReMax.value), -rows / 2, rows / 2);
        let Ycord3 = map(w3[x][z].re, parseFloat(wReMin.value), parseFloat(wReMax.value), -rows / 2, rows / 2);

        if (w[x][z].re < parseFloat(wReMax.value) && w[x][z].re > parseFloat(wReMin.value)) {
          stroke(c, 250, 250);
          point(Xcord * scl, -Ycord1 * scl, Zcord * scl);
        }

        if (w2[x][z].re < parseFloat(wReMax.value) && w2[x][z].re > parseFloat(wReMin.value)) {
          stroke(c2, 250, 250);
          point(Xcord * scl, -Ycord2 * scl, Zcord * scl);
        }

        if (w3[x][z].re < parseFloat(wReMax.value) && w3[x][z].re > parseFloat(wReMin.value)) {
          stroke(c3, 250, 250);
          point(Xcord * scl, -Ycord3 * scl, Zcord * scl);
        }
      }
    }
  } else {
    for (let x = 0; x < cols; x++) {
      for (let z = 0; z < rows; z++) {
        let c = mod(map(w[x][z].re, parseFloat(wReMin.value), parseFloat(wReMax.value), 0, 250), 250);
        let c2 = mod(map(w2[x][z].re, parseFloat(wReMin.value), parseFloat(wReMax.value), 0, 250), 250);
        let c3 = mod(map(w3[x][z].re, parseFloat(wReMin.value), parseFloat(wReMax.value), 0, 250), 250);
        let Xcord = map(x, 0, cols, -cols / 2, cols / 2);
        let Zcord = map(z, 0, rows, -rows / 2, rows / 2);
        let Ycord1 = map(w[x][z].im, parseFloat(wImMin.value), parseFloat(wImMax.value), -rows / 2, rows / 2);
        let Ycord2 = map(w2[x][z].im, parseFloat(wImMin.value), parseFloat(wImMax.value), -rows / 2, rows / 2);
        let Ycord3 = map(w3[x][z].im, parseFloat(wImMin.value), parseFloat(wImMax.value), -rows / 2, rows / 2);

        if (w[x][z].im < parseFloat(wImMax.value) && w[x][z].im > parseFloat(wImMin.value)) {
          stroke(c, 250, 250);
          point(Xcord * scl, -Ycord1 * scl, Zcord * scl);
        }

        if (w2[x][z].im < parseFloat(wImMax.value) && w2[x][z].im > parseFloat(wImMin.value)) {
          stroke(c2, 250, 250);
          point(Xcord * scl, -Ycord2 * scl, Zcord * scl);
        }

        if (w3[x][z].im < parseFloat(wImMax.value) && w3[x][z].im > parseFloat(wImMin.value)) {
          stroke(c3, 250, 250);
          point(Xcord * scl, -Ycord3 * scl, Zcord * scl);
        }
      }
    }

  }

}

function render() {
  for (let zed = 0; zed < w.length; zed++) {
    w[zed] = new Array(rows);
    w2[zed] = new Array(rows);
    w3[zed] = new Array(rows);
  }
  for (let x = 0; x < cols; x++) {
    for (let z = 0; z < rows; z++) {
      let X = map(x, 0, cols, parseFloat(zReMin.value), parseFloat(zReMax.value));
      let Z = map(z, 0, rows, parseFloat(zImMin.value), parseFloat(zImMax.value));
      w[x][z] = cubeRoot1(X, Z,
        parseFloat(Ar.value), parseFloat(Ai.value),
        parseFloat(Br.value), parseFloat(Bi.value),
        parseFloat(Cr.value), parseFloat(Ci.value),
        parseFloat(Dr.value), parseFloat(Di.value)
      );

      w2[x][z] = cubeRoot2(X, Z,
        parseFloat(Ar.value), parseFloat(Ai.value),
        parseFloat(Br.value), parseFloat(Bi.value),
        parseFloat(Cr.value), parseFloat(Ci.value),
        parseFloat(Dr.value), parseFloat(Di.value)
      );

      w3[x][z] = cubeRoot3(X, Z,
        parseFloat(Ar.value), parseFloat(Ai.value),
        parseFloat(Br.value), parseFloat(Bi.value),
        parseFloat(Cr.value), parseFloat(Ci.value),
        parseFloat(Dr.value), parseFloat(Di.value)
      );
    }
  }
}

function switchIandR() {
  if (!switchFactor) {
    switchButton.innerHTML = 'Make <i>w<sub>r</sub></i> Height';
  } else {
    switchButton.innerHTML = 'Make <i>w<sub>i</sub></i> Height';
  };
  switchFactor = !switchFactor;
  render();
}


function cubeRoot1(zr, zi, ar, ai, br, bi, cr, ci, dr, di) {
  let a = new Complex(ar, ai);
  let b = new Complex(br, bi);
  let c = new Complex(cr, ci);
  let d = new Complex(dr - zr, di - zi);

  if (ar == 0 && ai == 0) {
    return applyRoot1(zr, zi, br, bi, cr, ci, dr, di);
  }

  let p = b.mul(-1).div(a.mul(3));
  let q = p.pow(3).add((b.mul(c).sub(a.mul(3).mul(d))).div(a.pow(2).mul(6)));
  let r = c.div(a.mul(3));

  let x = (q.add((q.pow(2).add(r.sub(p.pow(2)).pow(3)).pow(.5)))).pow(1 / 3)
    .add((q.sub((q.pow(2).add(r.sub(p.pow(2)).pow(3)).pow(.5)))).pow(1 / 3))
    .add(p);
  return x;
}


function cubeRoot2(zr, zi, ar, ai, br, bi, cr, ci, dr, di) {
  let a = new Complex(ar, ai);
  let b = new Complex(br, bi);
  let c = new Complex(cr, ci);
  let d = new Complex(dr - zr, di - zi);

  let rot = new Complex(-.5, -sqrt(3) / 2);

  if (ar == 0 && ai == 0) {
    return applyRoot2(zr, zi, br, bi, cr, ci, dr, di);
  }

  let p = b.mul(-1).div(a.mul(3));
  let q = p.pow(3).add((b.mul(c).sub(a.mul(3).mul(d))).div(a.pow(2).mul(6)));
  let r = c.div(a.mul(3));



  let x = (q.add((q.pow(2).add(r.sub(p.pow(2)).pow(3)).pow(.5)))).pow(1 / 3).mul(rot)
    .add((q.sub((q.pow(2).add(r.sub(p.pow(2)).pow(3)).pow(.5)))).pow(1 / 3).mul(rot))
    .add(p);

  return x;
}

function cubeRoot3(zr, zi, ar, ai, br, bi, cr, ci, dr, di) {
  let a = new Complex(ar, ai);
  let b = new Complex(br, bi);
  let c = new Complex(cr, ci);
  let d = new Complex(dr - zr, di - zi);

  let rot = new Complex(-.5, sqrt(3) / 2);
  let p = b.mul(-1).div(a.mul(3));
  let q = p.pow(3).add((b.mul(c).sub(a.mul(3).mul(d))).div(a.pow(2).mul(6)));
  let r = c.div(a.mul(3));

  if (ar == 0 && ai == 0) {
    return applyRoot2(zr, zi, br, bi, cr, ci, dr, di);
  }
  let x = (q.add((q.pow(2).add(r.sub(p.pow(2)).pow(3)).pow(.5)))).pow(1 / 3).mul(rot)
    .add((q.sub((q.pow(2).add(r.sub(p.pow(2)).pow(3)).pow(.5)))).pow(1 / 3).mul(rot))
    .add(p);

  return x;
}

function applyRoot1(zr, zi, br, bi, cr, ci, dr, di) {
  let a = new Complex(br, bi);
  let b = new Complex(cr, ci);
  let c = new Complex(dr - zr, di - zi);

  if (a.re == 0 && a.im == 0) {
    return c.mul(-1).div(b);
  }

  let discrim = b.mul(b).sub(a.mul(c.mul(4)));
  let x = (b.mul(-1).add(discrim.sqrt())).div(a.mul(2));

  return x;
}

function applyRoot2(zr, zi, br, bi, cr, ci, dr, di) {
  let a = new Complex(br, bi);
  let b = new Complex(cr, ci);
  let c = new Complex(dr - zr, di - zi);

  if (a.re == 0 && a.im == 0) {
    return c.mul(-1).div(b);
  }

  let discrim = b.mul(b).sub(a.mul(c.mul(4)));
  let x = (b.mul(-1).sub(discrim.sqrt())).div(a.mul(2));
  return x;
}

function mod(n, m) {
  return ((n % m) + m) % m;
}
