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
        this.normals = [];

        const number_of_vertices = (this.stacks+1)*this.slices


        for(let points_offset=0; points_offset<2*number_of_vertices; points_offset+=number_of_vertices){
            for(let i=0;i<=this.stacks;i++){
                const height = (1/this.stacks)*i;
                for(let j=0;j<this.slices;j++){
                    const ang = j*((2*Math.PI)/this.slices);
                    this.vertices.push(Math.cos(ang),Math.sin(ang),height);

                    if(points_offset==0){
                        const previous_ang = (j-1)*((2*Math.PI)/this.slices);
                        const side_ang = (ang+previous_ang)/2
                        this.normals.push(Math.cos(side_ang),Math.sin(side_ang),0)
                    }
                    else{
                        const next_ang = (j+1)*((2*Math.PI)/this.slices);
                        const side_ang = (ang+next_ang)/2
                        this.normals.push(Math.cos(side_ang),Math.sin(side_ang),0)
                    }
                    if(i>0 && j>0){
                        const upper_right = points_offset+(i-1)*this.slices+j
                        const upper_left = points_offset+i*this.slices+j
                        const bottom_right = points_offset+(i-1)*this.slices+j-1
                        const bottom_left = points_offset+i*this.slices+j-1

                        this.indices.push(upper_right,upper_left,bottom_left)
                        this.indices.push(bottom_left,bottom_right,upper_right)            
                    }
                }
                if(i>0){
                    const last_ang = this.slices-1
                    const upper_right = points_offset+(i-1)*this.slices
                    const upper_left = points_offset+i*this.slices    
                    const bottom_right = points_offset+(i-1)*this.slices + last_ang
                    const bottom_left = points_offset+i*this.slices+ last_ang
                
                    this.indices.push(upper_right,upper_left,bottom_left)
                    this.indices.push(bottom_left,bottom_right,upper_right)    
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
        this.scene.popMatrix();
        this.scene.pushMatrix();    
        this.scene.rotate(-Math.PI/2,1,0,0);
        super.display();
        this.scene.popMatrix();
        this.scene.pushMatrix(); 
      }
}