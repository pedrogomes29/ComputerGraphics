import { MySemiSphere } from "./MySemiSphere.js";
import { CGFappearance } from "../lib/CGF.js";

export class MyBirdEgg{
    constructor(scene, texture){
        this.scene = scene;
        this.texture = texture;
        this.lowerEgg = new MySemiSphere(this.scene, 200, 200);
        this.upperEgg = new MySemiSphere(this.scene, 200, 200);
        this.material = new CGFappearance(this.scene);
        this.material.setTexture(this.texture);
        this.material.setTextureWrap('REPEAT', 'REPEAT');

    }   
    display(){
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,0,0,1);
        this.scene.scale(1,1.7,1);
        this.scene.rotate(Math.PI,0,0,1);
        this.material.apply();
        this.upperEgg.display();
        this.scene.popMatrix();
        this.scene.rotate(Math.PI/2,0,0,1);
        this.scene.scale(1,1.2,1);
        this.lowerEgg.display();
        
    }
}