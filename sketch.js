let cols;
let rows;
let scl = 10;
let counter = 0;
let w;
let w2;
let Br;
let Bi;
let Cr;
let Ci;
let switchFactor = 0;

const Xrange = [-2, 2];
const Yrange = [-2, 2];
const Wrange = [-2, 2];

function preload() {
  Br = document.getElementById("Br");
  Bi = document.getElementById("Bi");
  Cr = document.getElementById("Cr");
  Ci = document.getElementById("Ci");
}

function setup() {
  let canvas = createCanvas(500, 400, WEBGL);
  canvas.parent('sketch-holder');
  camera(0, 400, 600, 0, 0, 0, 0, 1, 1);
  cols = 500 / scl;
  rows = 500 / scl;
  w = new Array(cols);
  w2 = new Array(cols);
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
  fill(255, 0, 0);
  box(1000, 4, 4);
  fill(0, 255, 0);
  box(4, 1000, 4);
  fill(0, 0, 255);
  box(4, 4, 1000);
  translate(-width / 2, -height / 2, -scl * cols / 2);
  colorMode(HSB);
  if (!switchFactor) {
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        let c = map(w[x][y].Im, Wrange[0], Wrange[1], 0, 250);
        let c2 = map(w2[x][y].Im, Wrange[0], Wrange[1], 0, 250);

        stroke(c, 250, 250);
        point(x * scl, y * scl, map(w[x][y].Re, Wrange[0], Wrange[1], 0, rows) * scl);
        stroke(c2, 250, 250);
        point(x * scl, y * scl, map(w2[x][y].Re, Wrange[0], Wrange[1], 0, rows) * scl);

      }
    }
  } else {
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        let c = map(w[x][y].Re, Wrange[0], Wrange[1], 0, 250);
        let c2 = map(w2[x][y].Re, Wrange[0], Wrange[1], 0, 250);
        stroke(c, 250, 250);
        point(x * scl, y * scl, map(w[x][y].Im, Wrange[0], Wrange[1], 0, rows) * scl);
        stroke(c2, 250, 250);
        point(x * scl, y * scl, map(w2[x][y].Im, Wrange[0], Wrange[1], 0, rows) * scl);
      }
    }
  }

}

function applyRoot(zr, zi, br, bi, cr, ci) {
  let discrimR = (br * br - bi * bi) - 4 * (cr - zr);
  let discrimI = 2 * br * bi - 4 * (ci - zi);
  let Re = -.5 * br + .5 * sqrt(sqrt(discrimI ** 2 + discrimR ** 2)) * cos(atan2(discrimI, discrimR) / 2);
  let Im = -.5 * bi + .5 * sqrt(sqrt(discrimI ** 2 + discrimR ** 2)) * sin(atan2(discrimI, discrimR) / 2);

  return ({
    Re,
    Im
  })

}

function applyRoot2(zr, zi, br, bi, cr, ci) {
  let discrimR = (br * br - bi * bi) - 4 * (cr - zr);
  let discrimI = 2 * br * bi - 4 * (ci - zi);
  let Re = -.5 * br - .5 * sqrt(sqrt(discrimI ** 2 + discrimR ** 2)) * cos(atan2(discrimI, discrimR) / 2);
  let Im = -.5 * bi - .5 * sqrt(sqrt(discrimI ** 2 + discrimR ** 2)) * sin(atan2(discrimI, discrimR) / 2);
  return ({
    Re,
    Im
  })
}

function render() {
  for (let y = 0; y < w.length; y++) {
    w[y] = new Array(rows);
    w2[y] = new Array(rows);
  }
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let X = map(x, 0, cols, Xrange[0], Xrange[1]);
      let Y = map(y, 0, rows, Yrange[0], Yrange[1]);
      w[x][y] = applyRoot(X, Y, Br.value, Bi.value, Cr.value, Ci.value);
      w2[x][y] = applyRoot2(X, Y, Br.value, Bi.value, Cr.value, Ci.value);

      //w[x][y] = applyRoot(X, Y, Br.value, Bi.value, Cr.value, Ci.value);
      //w2[x][y] = applyRoot2(X, Y, Br.value, Bi.value, Cr.value, Ci.value);
    }
  }
}

function switchIandR () {
  switchFactor = !switchFactor;
  render();
}

function applyQuad(zr, zi) {
  let Re = zr * zr - zi * zi + Br * zr + Cr;
  let Im = 2 * zr * zi + Bi * zi + Ci;
  return ({
    Re,
    Im
  })
}
