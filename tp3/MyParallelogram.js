import { CGFobject } from "../lib/CGF.js";
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
  constructor(scene) {
    super(scene);
    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [
      0,
      0,
      0, //0
      1,
      1,
      0, //1
      2,
      0,
      0, //2
      3,
      1,
      0, //3

      0,
      0,
      0, //0
      1,
      1,
      0, //1
      2,
      0,
      0, //2
      3,
      1,
      0, //3
    ];

    //Counter-clockwise reference of vertices
    this.indices=[]
    for(let i=0;i<2*4;i+=4)
      this.indices.push(2+i, 1+i, 0+i, 3+i, 1+i, 2+i, 0+i, 1+i, 2+i, 2+i, 1+i, 3+i);
    this.normals = [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                    0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1];

    //The defined indices (and corresponding vertices)
    //will be read in groups of three to draw triangles
    this.primitiveType = this.scene.gl.TRIANGLES;

    this.initGLBuffers();
  }
}
