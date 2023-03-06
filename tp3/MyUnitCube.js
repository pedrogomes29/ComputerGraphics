import { CGFobject } from "../lib/CGF.js";
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
  constructor(scene) {
    super(scene);
    this.initBuffers();
  }


  initBuffers() {
    this.vertices = [
      -0.5,
      -0.5,
      -0.5, //0

      -0.5,
      -0.5,
      0.5, //1

      0.5,
      -0.5,
      0.5, //2

      0.5,
      -0.5,
      -0.5, //3

      -0.5,
      0.5,
      -0.5, //4

      -0.5,
      0.5,
      0.5, //5

      0.5,
      0.5,
      0.5, //6

      0.5,
      0.5,
      -0.5, //7

      -0.5,
      -0.5,
      -0.5, //0

      -0.5,
      -0.5,
      0.5, //1

      0.5,
      -0.5,
      0.5, //2

      0.5,
      -0.5,
      -0.5, //3

      -0.5,
      0.5,
      -0.5, //4

      -0.5,
      0.5,
      0.5, //5

      0.5,
      0.5,
      0.5, //6

      0.5,
      0.5,
      -0.5, //7



      -0.5,
      -0.5,
      -0.5, //0

      -0.5,
      -0.5,
      0.5, //1

      0.5,
      -0.5,
      0.5, //2

      0.5,
      -0.5,
      -0.5, //3

      -0.5,
      0.5,
      -0.5, //4

      -0.5,
      0.5,
      0.5, //5

      0.5,
      0.5,
      0.5, //6

      0.5,
      0.5,
      -0.5, //7
    ];
    this.indices = [];

    //Counter-clockwise reference of vertices
    for(let i=0;i<3*8;i+=8){
      this.indices.push(2+i, 1+i, 0+i, 0+i, 3+i, 2+i, 
                      5+i, 4+i, 0+i, 0+i, 1+i, 5+i,
                      2+i, 5+i, 1+i, 2+i, 6+i, 5+i,
                      3+i, 6+i, 2+i, 7+i, 6+i, 3+i,
                      4+i, 5+i, 6+i, 7+i, 4+i, 6+i,
                      0+i, 4+i, 7+i, 3+i, 0+i, 7+i);
    }
    //The defined indices (and corresponding vertices)
    //will be read in groups of three to draw triangles
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.normals = [];

    const X_AXIS=0;
    const Y_AXIS=1;
    const Z_AXIS=2;


    for(let i=0;i<3*8;i++){
      const point = i%8;
      switch(Math.floor(i/8)){
          case X_AXIS:
            this.normals.push(Math.sign(this.vertices[point*3]),0,0);
            break;
          case Y_AXIS:
            this.normals.push(0,Math.sign(this.vertices[point*3+1]),0);
            break;          
          case Z_AXIS:
            this.normals.push(0,0,Math.sign(this.vertices[point*3+2]));
            break;
      }
    }

    this.initGLBuffers();
  }


  display(){
    super.display();
  }

  updateBuffers(){
    this.initBuffers();
    this.initNormalVizBuffers();
  }
}
