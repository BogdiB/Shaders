attribute vec3 aPosition; // world-space position of vertex
attribute vec2 aTexCoord; // coordinate for fragment shader to draw a texture on top of

varying vec2 pos;

// shader functions

void basic() {
  pos = aTexCoord;
  
  vec4 position = vec4(aPosition, 1.0);
  position.xy = position.xy * 2.0 - 1.0;
  
  gl_Position = position;
}

// end of shader functions

void main() {
  basic();
}