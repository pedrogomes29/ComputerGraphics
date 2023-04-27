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
    
        for (let i = 0; i <= this.stacks; i++) {
            const height = (1 / this.stacks) * i;
            for (let j = 0; j <= this.slices; j++) {
                const ang = j * ((2 * Math.PI) / this.slices);
                const x = Math.cos(ang);
                const y = Math.sin(ang);
                this.vertices.push(x, y, height);
                this.normals.push(x, y, 0);
    
                if (i > 0 && j > 0) {
                    const upper_right = (i - 1) * (this.slices + 1) + j;
                    const upper_left = i * (this.slices + 1) + j;
                    const bottom_right = (i - 1) * (this.slices + 1) + j - 1;
                    const bottom_left = i * (this.slices + 1) + j - 1;
    
                    this.indices.push(upper_right, upper_left, bottom_left);
                    this.indices.push(bottom_left, bottom_right, upper_right);
                }
            }
        }
    
        // Create vertices and normals for the top and bottom faces
        const offset = this.vertices.length / 3; // current index to add new vertices
        this.vertices.push(0, 0, 0); // center bottom
        this.normals.push(0, 0, -1); // normal of center bottom
    
        for (let i = 0; i <= this.slices; i++) {
            const ang = i * ((2 * Math.PI) / this.slices);
            const x = Math.cos(ang);
            const y = Math.sin(ang);
            this.vertices.push(x, y, 0); // bottom face
            this.normals.push(0, 0, -1); // normal of bottom face
        }
        const top_offset = this.vertices.length / 3; // index of center of top face
        this.vertices.push(0, 0, 1); // center top
        this.normals.push(0, 0, 1); // normal of center top
    
        for (let i = 0; i <= this.slices; i++) {
            const ang = i * ((2 * Math.PI) / this.slices);
            const x = Math.cos(ang);
            const y = Math.sin(ang);
            this.vertices.push(x, y, 1); // top face
            this.normals.push(0, 0, 1); // normal of top face
        }
    
        // Create indices for bottom face
        for (let i = 0; i <= this.slices; i++) {
            const center_index = offset;
            const first_index = offset + i;
            const second_index = first_index + 1;
            this.indices.push(center_index, second_index, first_index);
        }
    
        // Create indices for top face
        for (let i = 0; i <= this.slices; i++) {
            const center_index = top_offset;
            const first_index = top_offset + i;
            const second_index = first_index + 1;
            this.indices.push(center_index, first_index, second_index);
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