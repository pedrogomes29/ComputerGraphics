import { MySphere } from "./MySphere.js";

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
        this.sphere = new MySphere(this.scene, 200, 200);
    }
    display(){
        this.sphere.display();
        this.scene.translate(this.scene.camera.position.x,this.scene.camera.position.y,this.scene.camera.position.z)
        this.scene.appearance.setTexture(this.texture);
        this.scene.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.scene.appearance.apply();
    }
}