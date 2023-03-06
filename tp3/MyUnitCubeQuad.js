import { CGFobject } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
  constructor(scene) {
    super(scene);
    this.leftQuad = new MyQuad(scene);
    this.rightQuad = new MyQuad(scene);
    this.frontQuad = new MyQuad(scene);
    this.backQuad = new MyQuad(scene);
    this.upQuad = new MyQuad(scene);
    this.downQuad = new MyQuad(scene);
  }

  display() {

    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.translate(5.0,-5.001,5.0);
    this.scene.scale(10, 10, 10);
    this.scene.pushMatrix();


    this.scene.translate(0,0,0.5);
    this.frontQuad.display()

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.rotate(Math.PI,1,0,0)
    this.scene.translate(0,0,0.5);
    this.backQuad.display()

    this.scene.popMatrix();
    this.scene.pushMatrix();
    
    
    this.scene.rotate(Math.PI/2,1,0,0)
    this.scene.translate(0,0,0.5);
    this.downQuad.display()


    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.rotate(-Math.PI/2,1,0,0)
    this.scene.translate(0,0,0.5);
    this.upQuad.display()

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.rotate(Math.PI/2,0,1,0)
    this.scene.translate(0,0,0.5);
    this.rightQuad.display()


    this.scene.popMatrix();
    this.scene.pushMatrix();
    
    this.scene.rotate(-Math.PI/2,0,1,0)
    this.scene.translate(0,0,0.5);
    this.leftQuad.display();

    this.scene.popMatrix();

  }
}
