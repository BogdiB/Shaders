let myshader;
let backgroundImage;

function loader(name) {
    if (typeof name !== "string") {
        throw Error("Shader name in loader function in the p5worker is not a string.");
    }
    if (name === "imageShader") {
      backgroundImage = loadImage("image.jpg");
    }
    name = name + "/" + name;
    return loadShader(name + ".vert", name + ".frag");
}

function preload() {
  myshader = loader("imageShader");
}

function getMeasurements(type) {
  let height;
  let width;
  const size = 1.05;

  // truthy
  if (type == true) {
    // true screen values, will fit on screen perfectly - scaled to the screen ratio
    height = window.innerHeight;
    width = window.innerWidth;
  }
  // falsy
  else if (type == false) {
    // screen values, will be slightly smaller than the screen - scaled to the screen ratio
    height = window.innerHeight / size;
    width = window.innerWidth / size;
  }
  // no input
  else {
    // equal
    height = (window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth) / size;
    width = height;
  }
  return {height, width};
}

function setup() {
  clear();
  frameRate(30);

  let {height, width} = getMeasurements();
  
  createCanvas(width, height, WEBGL);
  shader(myshader);
}

// shader functions - ALSO CHANGE THE NAME IN THE PRELOAD

function firstTest() {
  myshader.setUniform("millis", millis());
  rect(-width/2, -height/2, width, height);
}

function imageShader() {
  /*
    putting the imageShader function in the draw function works, but is very inefficient
    so one might think to put it in setup, which would only draw the thing once
    this is the correct approach
    *HOWEVER*
    if we want to change the shader based on certain things, such as changing it every second
    from grayscale to something else, and then back to grayscale...
    we have to put the imageShader() in the draw function so that it gets redrawn every frame,
    one might then think that putting the setUniform for the image in the setup would be more
    efficient, but the way the draw function works is not by REdrawing, but by drawing over,
    therefore having the setUniform for the image not in the draw function means that the shader
    effect gets drawn on top of itself each frame, not leading to the outcome that we hoped for,
    so we have no choice but to also redraw the image on every frame
  */
  myshader.setUniform("image", backgroundImage);
  rect(-width/2, -height/2, width);
}

// end of shader functions

function draw() {
  // draw gets called as many times as frameRate() per second
  imageShader();
}