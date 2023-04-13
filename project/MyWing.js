import { CGFobject,CGFappearance, CGFtexture} from "../lib/CGF.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyQuad } from "./MyQuad.js";
/**
 * Mywing
 * @constructor
 * @param scene - Reference to MyScene object
 * @param right - whether the wing is the left wing or the right wing
 * */
const upAngle = -Math.PI/4+Math.PI/12;
const downAngle = Math.PI/4;
const fullRotationAngle = downAngle-upAngle;

const minSpeed = 2*fullRotationAngle

export class MyWing extends CGFobject {

  constructor(scene,right,angularSpeed,time,startOfMovemnt) {
    super(scene);
    this.scene = scene;
    this.square= new MyQuad(scene);
    this.triangle = new MyTriangle(scene);
    this.right = right
    this.angularSpeed = angularSpeed;
    this.speedFactor = 1;
    this.time = time
    this.offset = 0
    this.goingDown = false
    this.startOfMovement = startOfMovemnt
    this.initMaterials();
  }



  initMaterials(){
    this.wingsMaterial = new CGFappearance(this.scene);
    this.wingsTexture = new CGFtexture(this.scene,"images/feather2.jpg")
    this.wingsMaterial.setTexture(this.wingsTexture);
    this.wingsMaterial.setTextureWrap('REPEAT', 'REPEAT');
    //this.updateMaterial(this.wingsMaterial,"#f25278");
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
  accelerate(v){
    if(this.angularSpeed+v < 0){
      this.angularSpeed = 0
      return
    }
    if(this.angularSpeed + v > 30){
      this.angularSpeed = 30
      return
    }
    this.angularSpeed+=v
  }

  reset(time,startOfMovement){
    this.time = time
    this.offset = 0
    this.startOfMovement = startOfMovement
    this.angularSpeed = 0
    this.goingDown = false
    this.speedFactor = 1;
    this.scaleFactor = 1;
  }

  display() {
    let angle;
    const fullRotationTime = fullRotationAngle/(this.speedFactor*(minSpeed + this.angularSpeed*0.3));
    if((this.time-this.startOfMovement)/1000 > fullRotationTime){
      this.startOfMovement = this.time
      this.goingDown = !this.goingDown
    }

    if(this.goingDown){
      angle = upAngle + this.speedFactor*(minSpeed+this.angularSpeed*0.3)*(this.time-this.startOfMovement)/1000
    }
    else{
      angle = downAngle -this.speedFactor*(minSpeed+this.angularSpeed*0.3)*(this.time-this.startOfMovement)/1000
    }



    if(!this.right)
        this.scene.scale(1,1,-1)
    
    this.scene.rotate(angle,1,0,0);
    this.scene.translate(0,Math.sin(Math.PI/12),Math.cos(Math.PI/12));
    this.scene.pushMatrix();

    
    this.scene.rotate(-7*Math.PI/12,1,0,0)
    this.scene.translate(0.5,0.5,0)
    this.wingsMaterial.apply();
    this.square.display();
    
    this.scene.popMatrix();
    this.scene.pushMatrix();


    this.scene.scale(1,1,2)
    this.scene.scale(1/(2*Math.sqrt(2)),1/(2*Math.sqrt(2)),1/(2*Math.sqrt(2)))
    this.scene.rotate(-5*Math.PI/12,1,0,0)
    this.scene.rotate(Math.PI/4,0,0,1)
    this.scene.translate(1,-1,0)


    this.wingsMaterial.apply();
    this.triangle.display();

    this.scene.popMatrix();
    this.scene.popMatrix();
    this.scene.pushMatrix();

}
}
