// the fragment shader gets called for every pixel that is intended (by the vertex shader) to be modified

precision mediump float;

varying vec2 pos;

// uniform float millis;

uniform sampler2D image;
vec2 newPos;
vec4 img;

// shader functions

void setup() {
  newPos = pos;
  newPos.y = 1. - pos.y; // invert the position so the image is not upside-down
  
  img = texture2D(image, newPos);
  gl_FragColor = vec4(img);
}

void grayscale() {
  float avg = (img.r + img.g + img.b) / 3.;
  gl_FragColor = vec4(avg, avg, avg, 1.); // r g b a
}

void vignette() {
  vec3 circle = vec3(0.5, 0.5, 0.3); // xy = circle position, z = radius
  float d = length(newPos - circle.xy) - circle.z;
  // d = -d;

  // basically vignette - low intensity, make the second number lower for higher intensity
  d = smoothstep(0., 0.9, d); // if d < value return 0; else return 1;
  d = -d;
  // d = length(newPos - circle.xy) - circle.z;

  gl_FragColor += vec4(d, d, d, 0.);
}

// end of shader functions

void main() {
  setup();

  // grayscale();
  vignette();
}