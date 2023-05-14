import { CGFobject,CGFappearance,CGFtexture} from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";

export class MyBillBoard extends CGFobject{
    constructor(scene){
        super(scene);
        this.scene = scene;
        this.quad = new MyQuad(scene);
        this.material = new CGFappearance(scene);
        this.material.setTexture(new CGFtexture(scene, 'images/billboardtree.png'));
    }
    display(x,y,z){
        
        let cameraPosition = this.scene.camera.position;
        let quadPosition = vec3.fromValues(x, y, z);
        
        // Compute camera vector
        let cameraVector = vec3.create();
        cameraVector[0] = cameraPosition[0] - quadPosition[0];
        cameraVector[1] = cameraPosition[1] - quadPosition[1];
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
        let cosAngle = cameraVector[0] * quadVector[0] + cameraVector[1] * quadVector[1] + cameraVector[2] * quadVector[2];
        let sinAngle = Math.sqrt(1 - cosAngle * cosAngle);
        let axis = vec3.fromValues(
          cameraVector[1] * quadVector[2] - cameraVector[2] * quadVector[1],
          cameraVector[2] * quadVector[0] - cameraVector[0] * quadVector[2],
          cameraVector[0] * quadVector[1] - cameraVector[1] * quadVector[0]
        );
        
        // Rotate the quad
        this.scene.rotate(Math.acos(cosAngle), axis[0], axis[1], axis[2]);
        this.scene.translate(x, y, z);
        this.material.apply()
        this.quad.display();
        
    }
}