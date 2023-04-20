import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyBird } from "./MyBird.js"
import { MyTerrain } from "./MyTerrain.js"

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);
    //Objects connected to MyInterface
    this.displayAxis = false;
    this.displayNormals = false;
    this.scaleFactor = 1;

    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.earthTexture = new CGFtexture(this, "images/earth.jpg");
    this.panoramaTexture = new CGFtexture(this, "images/panorama4.jpg");
    this.terrainTexture = new CGFtexture(this, "images/terrain.jpg");
    this.heightMap = new CGFtexture(this, "images/heightmap_low_center.jpg");
    this.appearance = new CGFappearance(this);
    this.panorama = new MyPanorama(this, this.panoramaTexture);
    this.bird = new MyBird(this,0,0,3,0,0);
    this.terrain = new MyTerrain(this)
    this.speedFactor = 1
    this.setUpdatePeriod(50)

    this.shader = new CGFshader(this.gl, "shaders/terrain.vert", "shaders/terrain.frag");
    this.shader.setUniformsValues({ terrainTexture: 1 });
    this.shader.setUniformsValues({ heightMap: 2 });
  }
  
  hexToRgbA(hex)
  {
      var ret;
      //either we receive a html/css color or a RGB vector
      if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
          ret=[
              parseInt(hex.substring(1,3),16).toPrecision()/255.0,
              parseInt(hex.substring(3,5),16).toPrecision()/255.0,
              parseInt(hex.substring(5,7),16).toPrecision()/255.0,
              1.0
          ];
      }
      else
          ret=[
              hex[0].toPrecision()/255.0,
              hex[1].toPrecision()/255.0,
              hex[2].toPrecision()/255.0,
              1.0
          ];
      return ret;
  }
  initLights() {
    this.lights[0].setDiffuse(0.7,0.7,0.7,1.0);
    this.lights[0].setSpecular(0.4,0.4,0.4,1.0);
    this.lights[0].enable();
    this.lights[0].update();
    this.lights[1].setAmbient(0.5,0.5,0.5,1.0);
    this.lights[1].setDiffuse(0.5,0.5,0.5,1.0);
    this.lights[1].setSpecular(0.4,0.4,0.4,1.0);
    this.lights[1].enable();
    this.lights[1].update();
    this.lights[1].setPosition(0,5,3);
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.9,
      0.1,
      1000,
      vec3.fromValues(3, 4, 3),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(1, 1, 1, 1);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  checkKeys() {
    var text="Keys pressed: ";
    var keysPressed=false;
    if (this.gui.isKeyPressed("KeyA")) {
      text+="A";
      keysPressed=true;
      this.bird.turn(0.1);
    }
    if (this.gui.isKeyPressed("KeyD")) {
      text+="D";
      keysPressed=true;
      this.bird.turn(-0.1);
    }
    if (this.gui.isKeyPressed("KeyW")) {
      text+="W";
      keysPressed=true;
      this.bird.accelerate(0.3);
    }
    if (this.gui.isKeyPressed("KeyS")) {
      text+="S";
      keysPressed=true;
      this.bird.accelerate(-0.3);
    }
    if (this.gui.isKeyPressed("KeyR")) {
      text+="R";
      keysPressed=true;
      this.bird.reset();
    }
    if (keysPressed)
      console.log(text);
  }
  update(t){
    this.bird.update(t);
    this.checkKeys();
    this.bird.setSpeedFactor(this.speedFactor);
    this.bird.scaleFactor = this.scaleFactor
  }

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();


    // ---- BEGIN Primitive drawing section
    console.log(this.activeShader)
    this.pushMatrix();
    this.setAmbient(1, 1, 1, 1);
    this.appearance.apply();
    this.translate(0,-100,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);

    this.panorama.display();
    this.bird.display();
    this.popMatrix();

    this.setActiveShader(this.shader);
    this.pushMatrix();
    this.terrainTexture.bind(1);
    this.heightMap.bind(2);
    this.terrain.display();
    this.setActiveShader(this.defaultShader);
    // ---- END Primitive drawing section
  }
}