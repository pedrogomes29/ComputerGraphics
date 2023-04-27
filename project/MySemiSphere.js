import { CGFobject} from "../lib/CGF.js";
/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySemiSphere extends CGFobject {
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
        
        for(let k=0;k<2;k++){
            const offset = this.vertices.length/3
            for(let i=0;i<=this.slices/2;i++){
                for(let j=0;j<=this.stacks;j++){
                    const z = -1+2*(1/this.slices)*i;
                    const radius = Math.sqrt(1-z*z);
                    const theta = j*((2*Math.PI)/this.stacks);
                    const x = radius*Math.cos(theta);
                    const y = radius*Math.sin(theta);
        
                    this.vertices.push(x,y,z);
                    const normalizationOfNormal = Math.sqrt(radius*radius+z*z);
                    if(k==0)
                        this.normals.push(-x/normalizationOfNormal,-y/normalizationOfNormal,-z/normalizationOfNormal)
                    else
                        this.normals.push(x/normalizationOfNormal,y/normalizationOfNormal,z/normalizationOfNormal)
                    
                    const phi = Math.acos(z)
                    const u = (Math.PI-theta) / (2 * Math.PI)
                    const v = phi / Math.PI
                    this.texCoords.push(u,v)

        
                    if(i>0 && j>0){
                        const upper_right = (i-1)*(this.stacks+1)+j;
                        const upper_left = i*(this.stacks+1)+j; 
                        const bottom_right = (i-1)*(this.stacks+1)+j-1; 
                        const bottom_left = i*(this.stacks+1)+j-1;
                        
                        if(k==0){
                            this.indices.push(offset+bottom_left,offset+upper_left,offset+upper_right)
                            this.indices.push(offset+bottom_right,offset+bottom_left,offset+upper_right)   
                        }
                        else{
                            this.indices.push(offset+upper_right,offset+upper_left,offset+bottom_left)
                            this.indices.push(offset+bottom_left,offset+bottom_right,offset+upper_right)     
                        }
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
      }
}
