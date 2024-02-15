let myshader;

function loader(name) {
    if (typeof name !== "string") {
        throw Error("Shader name in loader function in the p5worker is not a string.");
    }
    name = name + "/" + name;
    return loadShader(name + ".vert", name + ".frag");
}

function preload() {
  myshader = loader("testShader");
}

function setup() {
  createCanvas(600, 600, WEBGL);
  shader(myshader);
}

function draw() {
  rect(-width/2, -height/2, width);
}