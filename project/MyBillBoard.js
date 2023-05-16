import { CGFobject,CGFappearance,CGFtexture} from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";

export class MyBillBoard extends CGFobject{
    constructor(scene){
        super(scene);
        this.scene = scene;
        this.quad = new MyQuad(scene);
        this.material = new CGFappearance(scene);
        this.material.setAmbient(1, 1, 1, 1);
        this.material.setDiffuse(1, 1, 1, 1);
        this.material.setSpecular(1, 1, 1, 1);
        this.material.setShininess(10);
        this.textures = [];
        this.textures.push(new CGFtexture(scene, 'images/bigtree.png'));
        this.textures.push(new CGFtexture(scene, 'images/smalltree.png'));
        this.textures.push(new CGFtexture(scene, 'images/billboardtree.png'));
        // choose one of the textures at random
        this.texture = this.textures[Math.floor(Math.random() * this.textures.length)];
        this.material.setTexture(this.texture);
    }
    display(x,y,z){
        let cameraPosition = this.scene.camera.position;
        let quadPosition = vec3.fromValues(x, y, z);
        
        // Compute camera vector
        let cameraVector = vec3.create();
        cameraVector[0] = cameraPosition[0] - quadPosition[0];
        cameraVector[1] = 0;
        cameraVector[2] = cameraPosition[2] - quadPosition[2];
        let cameraVectorLength = Math.sqrt(cameraVector[0] * cameraVector[0] + cameraVector[1] * cameraVector[1] + cameraVector[2] * cameraVector[2]);
        cameraVector[0] /= cameraVectorLength;
        cameraVector[1] /= cameraVectorLength;
        cameraVector[2] /= cameraVectorLength;
        // Compute quad vector
        let quadVector = vec3.fromValues(cameraVector[0], 0, cameraVector[2]);
        let quadVectorLength = Math.sqrt(quadVector[0] * quadVector[0] + quadVector[1] * quadVector[1] + quadVector[2] * quadVector[2]);
        quadVector[0] /= quadVectorLength;
        quadVector[1] /= quadVectorLength;
        quadVector[2] /= quadVectorLength;
        
        // Compute rotation angle and axis
        let angle = Math.acos(vec3.dot(vec3.fromValues(0, 0, 1), cameraVector));
        let axis = vec3.create();
        vec3.cross(axis,vec3.fromValues(0, 0, 1), cameraVector);
        // Rotate the quad
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(x, y, z);
        this.scene.rotate(angle, axis[0], axis[1], axis[2]);
        this.scene.scale(10, 10, 10);
        this.material.apply()
        this.quad.display();
        
    }
}