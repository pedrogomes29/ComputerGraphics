import { CGFobject} from "../lib/CGF.js";
/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCircle extends CGFobject {
    constructor(scene, slices, radius)
    {
        super(scene);
        this.slices = slices;
        this.radius = radius;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;
        const r = this.radius;
        
        this.vertices.push(0,0,0);
        this.normals.push(0,1,0);
        this.texCoords.push(0.5,0.5)


        for(var i = 1; i <= this.slices; i++){
            const x = r*Math.cos(ang);
            const z = -r*Math.sin(ang);
            this.vertices.push(x, 0, z);

            if(i>1)
                this.indices.push(i,0,i-1);

            this.normals.push(0,1,0);
            this.texCoords.push(0.5+0.5*Math.cos(ang),0.5-0.5*Math.sin(ang))

            ang+=alphaAng;
        }
        this.indices.push(1,0,this.slices);
    
        this.primitiveType = this.scene.gl.TRIANGLES;
    
        this.initGLBuffers();
    }
}
