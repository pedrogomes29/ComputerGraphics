import { CGFobject } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
  constructor(scene,tLeft,tFront,tRight,tBack,tUp,tDown) {
    super(scene);
    this.leftQuad = new MyQuad(scene);
    this.rightQuad = new MyQuad(scene);
    this.frontQuad = new MyQuad(scene);
    this.backQuad = new MyQuad(scene);
    this.upQuad = new MyQuad(scene);
    this.downQuad = new MyQuad(scene);



    this.tLeft = tLeft;
    this.tFront = tFront;
    this.tRight =tRight;
    this.tBack = tBack;
    this.tUp = tUp;
    this.tDown = tDown;


  }

  display() {

    this.scene.pushMatrix();

    this.scene.translate(0,0,0.5);
    this.tFront.apply();
    this.frontQuad.display()

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.rotate(Math.PI,0,1,0)
    this.scene.translate(0,0,0.5);
    this.tBack.apply();
    this.backQuad.display()

    this.scene.popMatrix();
    this.scene.pushMatrix();
    
    
    this.scene.rotate(Math.PI/2,1,0,0)
    this.scene.translate(0,0,0.5);
    this.tDown.apply();
    this.downQuad.display()


    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.rotate(-Math.PI/2,1,0,0)
    this.scene.translate(0,0,0.5);
    this.tUp.apply();
    this.upQuad.display()

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.rotate(Math.PI/2,0,1,0)
    this.scene.translate(0,0,0.5);
    this.tRight.apply();
    this.rightQuad.display()


    this.scene.popMatrix();
    this.scene.pushMatrix();
    
    this.scene.rotate(-Math.PI/2,0,1,0)
    this.scene.translate(0,0,0.5);
    this.tLeft.apply();
    this.leftQuad.display();

    this.scene.popMatrix();

  }
}
