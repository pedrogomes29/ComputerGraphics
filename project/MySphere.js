import { CGFobject } from "../lib/CGF.js";
/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySphere extends CGFobject {
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
        this.texCoords = [];

        for(let i=0;i<=this.slices;i++){
            for(let j=0;j<this.stacks;j++){
                const z = -1+2*(1/this.slices)*i;
                const radius = Math.sqrt(1-z*z);
                const ang = j*((2*Math.PI)/this.stacks);
                const x = radius*Math.cos(ang);
                const y = radius*Math.sin(ang);


                this.vertices.push(x,y,z);
                const normalizationOfNormal = Math.sqrt(radius*radius+z*z);
                this.normals.push(x/normalizationOfNormal,y/normalizationOfNormal,z/normalizationOfNormal)
                
                const theta = Math.atan2(y, x)
                const phi = Math.acos(z)
                const u = (theta + Math.PI) / (2 * Math.PI)
                const v = (phi+Math.PI) / Math.PI
                this.texCoords.push(u,v)

                if(i>0 && j>0){
                    const upper_right = (i-1)*this.stacks+j
                    const upper_left = i*this.stacks+j
                    const bottom_right = (i-1)*this.stacks+j-1
                    const bottom_left = i*this.stacks+j-1

                    this.indices.push(upper_right,upper_left,bottom_left)
                    this.indices.push(bottom_left,bottom_right,upper_right)            
                }
            }
            if(i>0){
                const last_ang = this.stacks-1
                const upper_right = (i-1)*this.stacks
                const upper_left = i*this.stacks    
                const bottom_right = (i-1)*this.stacks + last_ang
                const bottom_left = i*this.stacks+ last_ang
            
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