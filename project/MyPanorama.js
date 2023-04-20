import { MySphere } from "./MySphere.js";
import { CGFappearance } from "../lib/CGF.js";

/**
 * MyPanorama
 * @constructor
 * @param scene - Reference to MyScene object
 * @param texture - Reference to CGFtexture object
 * */
export class MyPanorama{
    constructor(scene, texture){
        this.scene = scene;
        this.texture = texture;
        this.sphere = new MySphere(this.scene, 200, 200, true, 200);
        this.material = new CGFappearance(this.scene);
        this.material.setTexture(this.texture);
        this.material.setTextureWrap('REPEAT', 'REPEAT');
        this.material.setEmission(1,1,1,1);
        this.material.setDiffuse(0,0,0,1)
        this.material.setSpecular(0,0,0,1)
        this.material.setAmbient(0,0,0,1)
        this.material.setShininess(0)

    }
    display(){
        this.material.apply();
        this.sphere.display();

    }
}