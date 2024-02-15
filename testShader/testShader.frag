precision mediump float;

varying vec2 pos;

void main() {
  vec2 newPos = pos;
  newPos = fract(pos * 10.);
  gl_FragColor = vec4(newPos, 1., 1.);
}