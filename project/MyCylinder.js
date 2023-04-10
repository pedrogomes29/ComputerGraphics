import { CGFobject } from "../lib/CGF.js";
/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCilinder extends CGFobject {
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
        this.normals = [];


        this.vertices.push(0,0,0); // center bottom
        this.normals.push(0,0,-1)
        this.vertices.push(0,0,1); // center top
        this.normals.push(0,0,1)

        
        for(let i=0;i<=this.stacks;i++){
            const height = (1/this.stacks)*i;
            for(let j=0;j<=this.slices;j++){
                const ang = j*((2*Math.PI)/this.slices);
                this.vertices.push(Math.cos(ang),Math.sin(ang),height);
                this.normals.push(Math.cos(ang),Math.sin(ang),0)
        
                if(i>0 && j>0){
                    const upper_right = 2+(i-1)*(this.slices+1)+j
                    const upper_left = 2+i*(this.slices+1)+j
                    const bottom_right = 2+(i-1)*(this.slices+1)+j-1
                    const bottom_left = 2+i*(this.slices+1)+j-1
        
                    this.indices.push(upper_right,upper_left,bottom_left)
                    this.indices.push(bottom_left,bottom_right,upper_right)
        
                    // Add indices for bottom face
                    if (i == 1) {
                        this.indices.push(0, upper_right, bottom_right);
                    }
        
                    // Add indices for top face
                    if (i == this.stacks) {
                        this.indices.push(1, bottom_left, upper_left);
                    }
                }
            }
        }
        this.primitiveType = this.scene.gl.TRIANGLES;
    
        this.initGLBuffers();
      }
      updateBuffers(){
        this.initBuffers();
        this.initNormalVizBuffers();
      }

      display(){    
        this.scene.rotate(-Math.PI/2,1,0,0);
        super.display();
        this.scene.popMatrix();
        this.scene.pushMatrix(); 
      }
}