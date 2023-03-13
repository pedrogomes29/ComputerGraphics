import { CGFobject } from "../lib/CGF.js";
/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
    constructor(scene, slices, stacks)
    {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }
    
    
    
    
    initBuffers() {
        this.vertices = [];
        this.indices = [];

        for(let i=0;i<=this.stacks;i++){
            const height = (1/this.stacks)*i;
            for(let j=0;j<=this.slices;j++){
                const ang = j*((2*Math.PI)/this.slices);
                this.vertices.push(Math.cos(ang),-Math.sin(ang),height);
            }
        }
        for(let i=1;i<=this.stacks;i++){
            for(let j=1;j<=this.slices;j++){
                    const upper_right = (i-1)*(this.slices+1)+j
                    const upper_left = i*(this.slices+1)+j
                    const bottom_right = (i-1)*(this.slices+1)+j-1
                    const bottom_left = i*(this.slices+1)+j-1

                    console.log(upper_right,upper_left,bottom_right,bottom_left)

                    this.indices.push(bottom_right,bottom_left,upper_left)
                    this.indices.push(bottom_right,upper_left,upper_right)
                }
            }
      
        
        this.primitiveType = this.scene.gl.TRIANGLES;
    
        this.initGLBuffers();
      }
      updat
}