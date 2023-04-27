import { CGFobject, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyCilinder } from "./MyCylinder.js";
import { MySemiSphere } from "./MySemiSphere.js";
import { MyCone } from "./MyCone.js";

/**
 * MyNest
 * @constructor
 * @param scene - Reference to MyScene object
 * */
export class MyNest extends CGFobject {
  constructor(scene) {
    super(scene);
    this.nestTexture = new CGFtexture(this.scene, "images/nest.jpg");
    this.semiSphere = new MySemiSphere(scene,30,30);
    this.initMaterials();
  }
  initMaterials() {
    this.semiSphereMaterial = new CGFappearance(this.scene);
    this.semiSphereMaterial.setTexture(this.nestTexture);
    this.semiSphereMaterial.setTextureWrap('REPEAT', 'REPEAT');
  }

  display() {
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.translate(-80.0, 10.4, -60.0);
    this.scene.scale(4, 4/3, 4);
    this.semiSphereMaterial.apply();
    this.semiSphere.display();
  }
}