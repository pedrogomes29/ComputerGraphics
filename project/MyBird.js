import { CGFobject,CGFappearance,CGFtexture} from "../lib/CGF.js";
import { MyCone } from "./MyCone.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyWing } from "./MyWing.js";
import { MySphere } from "./MySphere.js";
import { MyCilinder } from "./MyCylinder.js";
import { Position } from "./Position.js";

/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 * */

const VELOCITY_GOING_DOWN = -1;

export class MyBird extends CGFobject {
  constructor(scene,orientation,x,y,z,speed) {
    super(scene);

    this.orientation = orientation
    this.position = new Position(x,y,z);
    this.speed = speed
    this.time = Date.now() 
    this.offset = 0
    this.goingDown = true
    this.startOfMovement = Date.now()
    this.speedFactor = 1;
    this.scaleFactor = 1;
    this.scene = scene;
    this.nose = new MyCone(scene,4,20);
    this.upperBody = new MyCilinder(scene,100,20);
    this.lowerBody = new MyCone(scene,4,20);
    this.eye = new MySphere(scene,100,100);
    this.leftWing = new MyWing(scene,false,speed,this.time,this.startOfMovement)
    this.rightWing = new MyWing(scene,true,speed,this.time,this.startOfMovement)
    this.hair = new MyTriangle(scene);
    this.tail = new MyTriangle(scene);
    this.initMaterials();
  }


  initMaterials(){
    this.noseMaterial = new CGFappearance(this.scene);
    this.updateMaterial(this.noseMaterial,"#b0903d");
    this.upperBodyMaterial = new CGFappearance(this.scene);
    this.updateMaterial(this.upperBodyMaterial,"#391c18");
    this.upperBodyMaterial.setSpecular(0,0,0,1);
    this.lowerBodyMaterial = new CGFappearance(this.scene);
    this.updateMaterial(this.lowerBodyMaterial,"#391c18");

    this.eyeMaterial = new CGFappearance(this.scene);
    this.updateMaterial(this.eyeMaterial,"#000000");
    this.eyeMaterial.setSpecular(0,0,0,1);

    this.tailMaterial = new CGFappearance(this.scene);
    this.tailTexture = new CGFtexture(this.scene,"images/feather.jpg")
    this.tailMaterial.setTexture(this.tailTexture)
    this.tailMaterial.setTextureWrap('REPEAT','REPEAT')
    ///this.updateMaterial(this.tailMaterial,"#439946");
    
    this.hairMaterial = new CGFappearance(this.scene);
    this.hairTexture = new CGFtexture(this.scene,"images/feather.jpg")
    this.hairMaterial.setTexture(this.hairTexture)
    this.hairMaterial.setTextureWrap('REPEAT','REPEAT')
    ///this.updateMaterial(this.hairMaterial,"#439946");
  }

  updateMaterial(material,hex){
    material.setAmbient(...this.scene.hexToRgbA(hex));
    material.setDiffuse(...this.scene.hexToRgbA(hex));
    material.setSpecular(1.0,1.0,1.0,1.0);
  }

  update(t){
    this.offset = t-this.time
    this.time = t
    let y

    if(this.time-this.startOfMovement > 500){
      this.startOfMovement = this.time
      this.goingDown = !this.goingDown
    }

    if(this.goingDown){
      y = 3 + VELOCITY_GOING_DOWN*(this.time-this.startOfMovement)/1000
    }
    else{
      y = 2.5 + (-VELOCITY_GOING_DOWN)*(this.time-this.startOfMovement)/1000
    }

    const z_velocity_direction = Math.cos(this.orientation)
    const x_velocity_direction = Math.sin(this.orientation)


    const x_and_z_velocity = (this.speed*this.speedFactor)/Math.sqrt(2)

    const x_offset = x_velocity_direction*x_and_z_velocity*(this.offset)/1000
    const z_offset = z_velocity_direction*x_and_z_velocity*(this.offset)/1000

    this.position.setPosition(this.position.x+x_offset,y,this.position.z+z_offset)
    this.leftWing.update(t)
    this.rightWing.update(t)
  }
  reset(){
    this.position.setPosition(0,3,0);
    this.orientation = 0
    this.speed = 0
    this.time = Date.now()
    this.offset = 0
    this.goingDown = true
    this.startOfMovement = Date.now()
    this.speedFactor = 1;
    this.scaleFactor = 1;
    this.leftWing.reset(this.time,this.startOfMovement);
    this.rightWing.reset(this.time,this.startOfMovement);
  }

  turn(v){
    this.orientation+=v*this.speedFactor
  }

  setSpeedFactor(speedFactor){
    this.speedFactor = speedFactor;
    this.leftWing.speedFactor = speedFactor;
    this.rightWing.speedFactor = speedFactor;
  }

  accelerate(v){
    this.leftWing.accelerate(v)
    this.rightWing.accelerate(v)
    if(this.speed+v < 0){
      this.speed = 0
      return
    }
    if(this.speed+v > 30*this.speedFactor){
      this.speed = 30*this.speedFactor
      return
    }
    this.speed+=v
  }

  display() {
    this.scene.translate(this.position.x,this.position.y,this.position.z)
    this.scene.translate(0,0,-(2/3)*this.scaleFactor);
    this.scene.rotate(-Math.PI/2+this.orientation,0,1,0)
    this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
    this.scene.scale(1/3,1/3,1/3)
    this.scene.translate(2,0,0)
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

    this.scene.translate(-1.5,0.05,0);
    this.scene.rotate(Math.PI/2 + Math.PI/9,0,0,1)
    this.scene.scale(1,4,1);
    this.lowerBodyMaterial.apply();
    this.lowerBody.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();
  
    
    this.scene.translate(-4.25,-1.1,-0.5)
    this.scene.scale(1.5,1/(2*Math.sqrt(2)),1/(2*Math.sqrt(2)))
    this.scene.rotate(-Math.PI/3,0,0,1)
    this.scene.rotate(-Math.PI/2,0,1,0)
    this.scene.rotate(-Math.PI/2,1,0,0)
    this.scene.rotate(Math.PI/4,0,0,1)
    this.scene.translate(1,-1,0)
    this.tailMaterial.apply();
    this.tail.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();
    
    this.scene.translate(-0.75,0.5,0.9);
    this.scene.scale(0.25,0.25,0.25);
    this.eyeMaterial.apply();
    this.eye.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();
    
    this.scene.translate(-0.75,0.5,-0.9);
    this.scene.scale(0.25,0.25,0.25);
    this.eyeMaterial.apply();
    this.eye.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();
    
    this.scene.translate(-3.25,-0.50,0);
    this.scene.scale(1.25,1.25,2)
    this.leftWing.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-3.25,-0.50,0);
    this.scene.scale(1.25,1.25,2)
    this.rightWing.display();

    this.scene.popMatrix();

  }
}

