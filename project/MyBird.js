import { CGFobject,CGFappearance} from "../lib/CGF.js";
import { MyCone } from "./MyCone.js";
import { MyUnitCube } from "./MyUnitCube.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyQuad } from "./MyQuad.js";

/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 * */

export class MyBird extends CGFobject {
  constructor(scene) {
    super(scene);
    this.scene = scene;
    this.nose = new MyCone(scene,4,20);
    this.upperBody = new MyUnitCube(scene);
    this.lowerBody = new MyCone(scene,4,20);
    this.eye = new MyUnitCube(scene);
    this.leftWingSquare = new MyQuad(scene);
    this.leftWingTriangle = new MyTriangle(scene);
    this.rightWingSquare = new MyQuad(scene);
    this.rightWingTriangle = new MyTriangle(scene);
    this.tail = new MyTriangle(scene);
    this.initMaterials();
  }


  initMaterials(){
    this.noseMaterial = new CGFappearance(this.scene);
    this.updateMaterial(this.noseMaterial,"#FFFF00");
    this.bodyMaterial = new CGFappearance(this.scene);
    this.updateMaterial(this.bodyMaterial,"#008081");
    this.wingsMaterial = new CGFappearance(this.scene);
    this.updateMaterial(this.wingsMaterial,"#0147ab");
    this.eyeMaterial = new CGFappearance(this.scene);
    this.updateMaterial(this.eyeMaterial,"#333333");
    this.tailMaterial = new CGFappearance(this.scene);
    this.updateMaterial(this.tailMaterial,"#d4af37");
  }

  updateMaterial(material,hex){
    material.setAmbient(...this.scene.hexToRgbA(hex));
    material.setDiffuse(...this.scene.hexToRgbA(hex));
    material.setSpecular(1.0,1.0,1.0,1.0);
  }

  display() {
    this.scene.translate(0,3,0)
    this.scene.pushMatrix();
    this.scene.scale(1,0.5,0.5)
    this.scene.rotate(-Math.PI/2,0,0,1)
    this.noseMaterial.apply();
    //this.nose.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.scale(2,2,2)
    this.scene.translate(-0.5,0,0);
    this.bodyMaterial.apply();
    this.upperBody.display();

    
    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-1.75,0,0);
    this.scene.rotate(Math.PI/2 + Math.PI/6,0,0,1)
    this.scene.scale(1,4,1);
    this.bodyMaterial.apply();
    this.lowerBody.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();
    
    this.scene.translate(-0.75,0.5,1);
    this.scene.scale(0.5,0.5,0.5);
    this.eyeMaterial.apply();
    this.eye.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();
    
    this.scene.translate(-0.75,0.5,-1);
    this.scene.scale(0.5,0.5,0.5);
    this.eyeMaterial.apply();
    this.eye.display();

    
    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-1.75,-1.5,1.5);
    this.scene.rotate(-7*Math.PI/12,1,0,0)
    this.wingsMaterial.apply();
    this.leftWingSquare.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    //this.scene.translate(-1.75,-1.5,2.5);

    this.scene.rotate(Math.PI/4,0,1,0)
    this.scene.rotate(-5*Math.PI/12,1,0,0)
    this.scene.scale(0.5,0.5,0.5)
    this.wingsMaterial.apply();
    this.leftWingTriangle.display();
    

    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.translate(-1.75,-1.5,-1.5);
    this.scene.rotate(7*Math.PI/12,1,0,0)
    this.wingsMaterial.apply();
    this.rightWingSquare.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-1.75,-1.5,-1.5);
    this.scene.rotate(-Math.PI/6,0,1,0)
    this.scene.rotate(-5*Math.PI/12,1,0,0)
    this.scene.scale(0.5,0.5,0.5)
    this.wingsMaterial.apply();
    this.leftWingTriangle.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.tailMaterial.apply();
    this.tail.display();
  }
}

