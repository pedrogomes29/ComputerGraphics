import { MySphere } from "./MySphere.js";
import { CGFappearance } from "../lib/CGF.js";

export class MyBirdEgg{
    constructor(scene, texture){
        this.scene = scene;
        this.texture = texture;
        this.sphere = new MySphere(this.scene, 200, 200);
        this.material = new CGFappearance(this.scene);
        this.material.setTexture(this.texture);
        this.material.setTextureWrap('REPEAT', 'REPEAT');

    }   
    display(){
        this.scene.rotate(Math.PI/2,0,0,1);
        this.scene.scale(1,1.7,1);
        this.material.apply();
        this.sphere.display();
        
    }
}