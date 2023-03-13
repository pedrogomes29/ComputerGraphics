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



        for(let i=0;i<=this.stacks;i++){
            const height = (1/this.stacks)*i;
            for(let j=0;j<this.slices;j++){
                const ang = j*((2*Math.PI)/this.slices);
                this.vertices.push(Math.cos(ang),Math.sin(ang),height);
                this.normals.push(Math.cos(ang),Math.sin(ang),0)

                if(i>0 && j>0){
                    const upper_right = (i-1)*this.slices+j
                    const upper_left = i*this.slices+j
                    const bottom_right = (i-1)*this.slices+j-1
                    const bottom_left = i*this.slices+j-1

                    this.indices.push(upper_right,upper_left,bottom_left)
                    this.indices.push(bottom_left,bottom_right,upper_right)            
                }
            }
            if(i>0){
                const last_ang = this.slices-1
                const upper_right = (i-1)*this.slices
                const upper_left = i*this.slices    
                const bottom_right = (i-1)*this.slices + last_ang
                const bottom_left = i*this.slices+ last_ang
            
                this.indices.push(upper_right,upper_left,bottom_left)
                this.indices.push(bottom_left,bottom_right,upper_right)    
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
        this.scene.popMatrix();
        this.scene.pushMatrix();    
        this.scene.rotate(-Math.PI/2,1,0,0);
        super.display();
        this.scene.popMatrix();
        this.scene.pushMatrix(); 
      }
}