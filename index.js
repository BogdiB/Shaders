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

  // only for image
  imageShader();
}

// shader functions - ALSO CHANGE THE NAME IN THE PRELOAD

function firstTest() {
  myshader.setUniform("millis", millis());
  rect(-width/2, -height/2, width, height);
}

function imageShader() {
  // used in SETUP! - if used in "draw", it keeps drawing over itself every frame
  myshader.setUniform("image", backgroundImage);
  rect(-width/2, -height/2, width);
}

// end of shader functions

function draw() {
  ;
}