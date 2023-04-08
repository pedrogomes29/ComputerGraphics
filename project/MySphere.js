import { CGFobject} from "../lib/CGF.js";
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
            for(let j=0;j<=this.stacks;j++){ // increase the number of stacks by one
                const z = -1+2*(1/this.slices)*i;
                const radius = Math.sqrt(1-z*z);
                const theta = (j / this.stacks) * 2 * Math.PI;
                const x = radius*Math.cos(theta);
                const y = radius*Math.sin(theta);
    
                this.vertices.push(x,y,z);
                const normalizationOfNormal = Math.sqrt(radius*radius+z*z);
                this.normals.push(x/normalizationOfNormal,y/normalizationOfNormal,z/normalizationOfNormal)
                
                const phi = (i / this.slices) * Math.PI;
                const u = (Math.PI+theta) / (2 * Math.PI)
                const v = (Math.PI-phi) / Math.PI
                this.texCoords.push(u,v)
    
                if(i>0 && j>0){
                    const upper_right = (i-1)*(this.stacks+1)+j;
                    const upper_left = i*(this.stacks+1)+j;
                    const bottom_right = (i-1)*(this.stacks+1)+j-1;
                    const bottom_left = i*(this.stacks+1)+j-1;
                    
                    //this.indices.push(bottom_left,upper_left,upper_right)
                    //this.indices.push(bottom_right,bottom_left,upper_right)
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
        //this.scene.scale(200,200,200,1);
        super.display();
        this.scene.popMatrix();
        this.scene.pushMatrix(); 
      }
}