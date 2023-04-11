import { CGFobject,CGFappearance} from "../lib/CGF.js";
import { MyCone } from "./MyCone.js";
import { MyUnitCube } from "./MyUnitCube.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyQuad } from "./MyQuad.js";
/**
 * Mywing
 * @constructor
 * @param scene - Reference to MyScene object
 * @param right - whether the wing is the left wing or the right wing
 * */

export class MyWing extends CGFobject {
  constructor(scene,right,speed,time,startOfMovemnt) {
    super(scene);
    this.scene = scene;
    this.square= new MyQuad(scene);
    this.triangle = new MyTriangle(scene);
    this.right = right

    this.speed = speed
    this.time = time
    this.offset = 0
    this.goingDown = true
    this.startOfMovement = startOfMovemnt
    this.initMaterials();
  }


  initMaterials(){
    this.wingsMaterial = new CGFappearance(this.scene);
    //this.updateMaterial(this.wingsMaterial,"#f25278");
    this.updateMaterial(this.wingsMaterial,"#f5de10");

  }

  updateMaterial(material,hex){
    material.setAmbient(...this.scene.hexToRgbA(hex));
    material.setDiffuse(...this.scene.hexToRgbA(hex));
    material.setSpecular(1.0,1.0,1.0,1.0);
  }

  update(t){
    this.offset = t-this.time
    this.time = t
  }

  display() {
    const angle = (this.offset-this.time)*this.speed/1000
    if(this.right){
      this.scene.translate(0,0,Math.cos(Math.PI/12))
    }
    else{
        this.scene.scale(1,1,-1)
        this.scene.translate(0,0,Math.cos(Math.PI/12))
    }
    this.scene.pushMatrix();

    
    this.scene.rotate(-7*Math.PI/12,1,0,0)
    this.scene.translate(0.5,0.5,0)
    this.wingsMaterial.apply();
    this.square.display();
    
    this.scene.popMatrix();
    this.scene.pushMatrix();


    this.scene.scale(1,1,2)
    this.scene.scale(1/(2*Math.sqrt(2)),1/(2*Math.sqrt(2)),1/(2*Math.sqrt(2)))
    this.scene.rotate(-5*Math.PI/12+angle,1,0,0)
    this.scene.rotate(Math.PI/4,0,0,1)
    this.scene.translate(1,-1,0)


    this.wingsMaterial.apply();
    this.triangle.display();

    this.scene.popMatrix();
    this.scene.popMatrix();
    this.scene.pushMatrix();

}
}
