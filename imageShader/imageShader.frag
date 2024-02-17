precision mediump float;

varying vec2 pos;

// uniform float millis;

uniform sampler2D image;

// shader functions

void grayscale() {
  vec2 newPos = pos;
  newPos.y = 1. - pos.y; // invert the position so the image is not upside-down
  
  vec4 img = texture2D(image, newPos);

  float avg = (img.r + img.g + img.b) / 3.;

  gl_FragColor = vec4(img);
  gl_FragColor = vec4(avg, avg, avg, 1.); // r g b a
}

// end of shader functions

void main() {
  grayscale();
}