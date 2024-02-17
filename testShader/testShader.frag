precision mediump float;

varying vec2 pos;

uniform float millis;

// shader functions

void firstTest() {
  vec2 newPos = pos;
  newPos.y = 0.; // makes it a 1D gradient on the x-axis
  // newPos.x = sin(newPos.x * 20.);
  // newPos.x = (sin(newPos.x * 20.) + 1.) / 2.; // makes collumns with the second colour
  // newPos.x = (sin(millis / 1000. + newPos.x * 20.) + 1.) / 2.; // makes the collumns move
  // newPos = fract(pos * 10.); // makes a 10x10 grid
  gl_FragColor = vec4(newPos.x, newPos.y, 0.5, 1.); // r g b a
}

// end of shader functions

void main() {
  firstTest();
}