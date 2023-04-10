import { CGFobject,CGFappearance} from "../lib/CGF.js";
import { MyCone } from "./MyCone.js";
import { MyUnitCube } from "./MyUnitCube.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyQuad } from "./MyQuad.js";
import { MyWing } from "./MyWing.js";
import { MySphere } from "./MySphere.js";
import { MyCilinder } from "./MyCylinder.js";
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
    this.upperBody = new MyCilinder(scene,100,100);
    this.lowerBody = new MyCone(scene,4,20);
    this.eye = new MySphere(scene,100,100);
    this.leftWing = new MyWing(scene,false)
    this.rightWing = new MyWing(scene,true)
    this.hair = new MyTriangle(scene);
    this.tail = new MyTriangle(scene);
    this.initMaterials();
  }


  initMaterials(){
    this.noseMaterial = new CGFappearance(this.scene);
    this.updateMaterial(this.noseMaterial,"#b0903d");
    this.upperBodyMaterial = new CGFappearance(this.scene);
    this.updateMaterial(this.upperBodyMaterial,"#008081");
    this.upperBodyMaterial.setSpecular(0,0,0,1);
    this.lowerBodyMaterial = new CGFappearance(this.scene);
    this.updateMaterial(this.lowerBodyMaterial,"#fa8128");
    this.eyeMaterial = new CGFappearance(this.scene);
    this.updateMaterial(this.eyeMaterial,"#000000");
    this.eyeMaterial.setSpecular(0,0,0,1);
    this.tailMaterial = new CGFappearance(this.scene);
    this.updateMaterial(this.tailMaterial,"#b0903d");
    this.hairMaterial = new CGFappearance(this.scene);
    this.updateMaterial(this.hairMaterial,"#439946");
  }

  updateMaterial(material,hex){
    material.setAmbient(...this.scene.hexToRgbA(hex));
    material.setDiffuse(...this.scene.hexToRgbA(hex));
    material.setSpecular(1.0,1.0,1.0,1.0);
  }

  display() {
    this.scene.translate(0,3,0)
    this.scene.pushMatrix();
    this.scene.scale(1.2,0.3,0.3)
    this.scene.rotate(-Math.PI/2,0,0,1)
    this.noseMaterial.apply();
    this.nose.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.scale(2,1,1)
    this.scene.rotate(Math.PI/2,0,0,1)
    this.upperBodyMaterial.apply();
    this.upperBody.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.translate(-0.75,1.5,0);
    this.scene.scale(0.5,0.5,0.5);
    this.scene.rotate(0,0,0,1);
    this.hairMaterial.apply();
    this.hair.display();

    
    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-1.5,0.12,0);
    this.scene.rotate(Math.PI/2 + Math.PI/6,0,0,1)
    this.scene.scale(1,4,1);
    this.lowerBodyMaterial.apply();
    this.lowerBody.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();
  
    
    this.scene.translate(-4,-1.5,-0.5)
    this.scene.scale(1.5,1/(2*Math.sqrt(2)),1/(2*Math.sqrt(2)))
    this.scene.rotate(-Math.PI/4,0,0,1)
    this.scene.rotate(-Math.PI/2,0,1,0)
    this.scene.rotate(-Math.PI/2,1,0,0)
    this.scene.rotate(Math.PI/4,0,0,1)
    this.scene.translate(1,-1,0)
    this.tailMaterial.apply();
    this.tail.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();
    
    this.scene.translate(-0.75,0.5,1);
    this.scene.scale(0.25,0.25,0.25);
    this.eyeMaterial.apply();
    this.eye.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();
    
    this.scene.translate(-0.75,0.5,-1);
    this.scene.scale(0.25,0.25,0.25);
    this.eyeMaterial.apply();
    this.eye.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();
    
    this.scene.translate(-3.25,-0.25,0);
    this.scene.scale(1.25,1.25,2)
    this.leftWing.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.rightWing.display();

    this.scene.popMatrix();
  }
}

