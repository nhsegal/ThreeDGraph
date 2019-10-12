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
let Zmin;
let Zmax;
let Wmin;
let Wmax;

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
  Zmin = document.getElementById("Zmin");
  Zmax = document.getElementById("Zmax");
  Wmin = document.getElementById("Wmin");
  Wmax = document.getElementById("Wmax");

}

function setup() {
  let canvas = createCanvas(500, 400, WEBGL);
  canvas.parent('sketch-holder');
  camera(0, 800, 1200, 0, 0, 0, 0, 1, 1);
  cols = 500 / scl;
  rows = 500 / scl;
  w = new Array(cols);
  w2 = new Array(cols);
  w3 = new Array(cols);
  render();
}

function draw() {
  ambientLight(255);
  orbitControl();
  background(175);
  rectMode(CENTER);
  stroke(255);
  strokeWeight(1);
  background(0);

  push();
  translate(-(250)*(.5*parseFloat(Zmin.value) + .5*parseFloat(Zmax.value)), -(250)*(.5*parseFloat(Zmin.value) + .5*parseFloat(Zmax.value)), 0);
  fill(255, 0, 0);
  box(1000, 4, 4); //axes are boxes because line doesn't work with WebGL
  fill(0, 255, 0);
  box(4, 1000, 4);
  fill(0, 0, 255);
  box(4, 4, 1000);
  pop();

  translate((-width / 2), -height / 2, -scl * cols / 2);
  colorMode(HSB);
  if (!switchFactor) {
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        let c = map(w[x][y].im, parseFloat(Wmin.value), parseFloat(Wmax.value), 0, 250);
        let c2 = map(w2[x][y].im, parseFloat(Wmin.value), parseFloat(Wmax.value), 0, 250);
        let c3 = map(w3[x][y].im, parseFloat(Wmin.value), parseFloat(Wmax.value), 0, 250);
        stroke(c, 250, 250);
        point(x * scl, y * scl, map(w[x][y].re, parseFloat(Wmin.value), parseFloat(Wmax.value), 0, rows) * scl);
        stroke(c2, 250, 250);
        point(x * scl, y * scl, map(w2[x][y].re, parseFloat(Wmin.value), parseFloat(Wmax.value), 0, rows) * scl);
        stroke(c3, 250, 250);
        point(x * scl, y * scl, map(w3[x][y].re, parseFloat(Wmin.value), parseFloat(Wmax.value), 0, rows) * scl);

      }
    }
  } else {
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        let c = map(w[x][y].re, parseFloat(Wmin.value), parseFloat(Wmax.value), 0, 250);
        let c2 = map(w2[x][y].re, parseFloat(Wmin.value), parseFloat(Wmax.value), 0, 250);
        let c3 = map(w3[x][y].re, parseFloat(Wmin.value), parseFloat(Wmax.value), 0, 250);
        stroke(c, 250, 250);
        point(x * scl, y * scl, map(w[x][y].im, parseFloat(Wmin.value), parseFloat(Wmax.value), 0, rows) * scl);
        stroke(c2, 250, 250);
        point(x * scl, y * scl, map(w2[x][y].im, parseFloat(Wmin.value), parseFloat(Wmax.value), 0, rows) * scl);
        stroke(c3, 250, 250);
        point(x * scl, y * scl, map(w3[x][y].im, parseFloat(Wmin.value), parseFloat(Wmax.value), 0, rows) * scl);
      }
    }
  }

}


function render() {
  for (let y = 0; y < w.length; y++) {
    w[y] = new Array(rows);
    w2[y] = new Array(rows);
    w3[y] = new Array(rows);
  }
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let X = map(x, 0, cols, parseFloat(Zmin.value), parseFloat(Zmax.value));
      let Y = map(y, 0, rows, parseFloat(Zmin.value), parseFloat(Zmax.value));
      w[x][y] = cubeRoot1(X, Y, Ar.value, Ai.value, Br.value, Bi.value, Cr.value, Ci.value, Dr.value, Di.value);
      w2[x][y] = cubeRoot2(X, Y, Ar.value, Ai.value, Br.value, Bi.value, Cr.value, Ci.value, Dr.value, Di.value);
      w3[x][y] = cubeRoot3(X, Y, Ar.value, Ai.value, Br.value, Bi.value, Cr.value, Ci.value, Dr.value, Di.value);
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
  let z = new Complex(zr, zi);
  if (ar == 0 && ai == 0) {
    return applyRoot1(z.re, z.im, b.re, b.im, c.re, c.im, d.re, d.im);
  }

  let p = b.mul(-1).div(a.mul(1 / 3));
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
  let z = new Complex(zr, zi);
  let rot = new Complex(-.5, -sqrt(3) / 2);

  if (ar == 0 && ai == 0) {
    return applyRoot2(z.re, z.im, b.re, b.im, c.re, c.im, d.re, d.im);
  }

  let p = b.mul(-1).div(a.mul(1 / 3));
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
  let z = new Complex(zr, zi);
  let rot = new Complex(-.5, sqrt(3) / 2);
  let p = b.mul(-1).div(a.mul(1 / 3));
  let q = p.pow(3).add((b.mul(c).sub(a.mul(3).mul(d))).div(a.pow(2).mul(6)));
  let r = c.div(a.mul(3));

  if (ar == 0 && ai == 0) {
    return applyRoot2(z.re, z.im, b.re, b.im, c.re, c.im, d.re, d.im);
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
