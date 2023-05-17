import { CGFobject, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyCircle } from "./MyCircle.js";
import { MySemiSphere } from "./MySemiSphere.js";

/**
 * MyNest
 * @constructor
 * @param scene - Reference to MyScene object
 * */
export class MyNest extends CGFobject {
  constructor(scene,nestPosition,baseHeight) {
    super(scene);
    this.nestTexture = new CGFtexture(this.scene, "images/nest.jpg");
    this.woodTexture = new CGFtexture(this.scene, "images/wood.jpeg");

    this.semiSphere = new MySemiSphere(scene,30,30);
    this.baseHeight = baseHeight;
    this.position = nestPosition;
    this.circle = new MyCircle(scene,30,Math.sqrt(this.baseHeight*(2-this.baseHeight)));
    this.initMaterials();
  }
  initMaterials() {
    this.semiSphereMaterial = new CGFappearance(this.scene);
    this.semiSphereMaterial.setTexture(this.nestTexture);
    this.semiSphereMaterial.setTextureWrap('REPEAT', 'REPEAT');
    this.circleMaterial = new CGFappearance(this.scene);
    this.circleMaterial.setTexture(this.woodTexture);
    this.circleMaterial.setTextureWrap('REPEAT', 'REPEAT');
  }

  getPosition(){
    return this.position;
  }

  display() {
    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(this.position.x,this.position.y,this.position.z);
    this.scene.scale(4, 4/3, 4);
    this.scene.pushMatrix();
    this.semiSphereMaterial.apply();
    this.semiSphere.display();

    this.scene.popMatrix();
    this.scene.translate(0,(this.baseHeight-1),0);
    this.circleMaterial.apply();
    this.circle.display();
  }
}