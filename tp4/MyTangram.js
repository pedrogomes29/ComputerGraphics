import { CGFobject,CGFappearance} from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */


export class MyTangram extends CGFobject {
  constructor(scene) {
    super(scene);
    this.diamond = new MyDiamond(scene);
    this.triangleSmallAbove = new MyTriangleSmall(scene, [0,0, 0.25,0.25 , 0,0.5]);
    this.triangleSmallBelow = new MyTriangleSmall(scene, [0.25, 0.75, 0.5, 0.5 , 0.75, 0.75]);
    this.triangleBigRight = new MyTriangleBig(scene,[1, 1, 0.5, 0.5 , 1, 0]);
    this.triangleBigLeft = new MyTriangleBig(scene,[1, 0, 0.5, 0.5 , 0, 0]);
    this.parallelogram = new MyParallelogram(scene);
    this.triangle = new MyTriangle(scene);
  }



  display() {
    const rotationMatrix = [
      Math.cos(Math.PI / 4),
      Math.sin(Math.PI / 4),
      0,
      0,

      -Math.sin(Math.PI / 4),
      Math.cos(Math.PI / 4),
      0,
      0,

      0,
      0,
      1,
      0,

      0,
      0,
      0,
      1,
    ]; //rodar 45º

    const translationMatrix = [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      -Math.sqrt(2) / 2,
      0,
      1,
    ]; //translação de sqrt(2)/2 no sentido negativo do y

    this.scene.pushMatrix();

    this.scene.multMatrix(translationMatrix);
    this.scene.multMatrix(rotationMatrix);
    this.diamond.display();
    

    this.scene.popMatrix();
    this.scene.pushMatrix();
    //Draw the objects

    this.scene.translate(0, Math.sqrt(2) / 2, 0);
    this.scene.rotate((3 * Math.PI) / 4, 0, 0, 1);



    this.triangleSmallAbove.display();



    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.translate(0, (-3 * Math.sqrt(2)) / 2, 0);
    this.scene.rotate(Math.PI / 4, 0, 0, 1);
    

    this.triangleSmallBelow.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate((3 * Math.sqrt(2)) / 2, 0, 0);
    this.scene.rotate(Math.PI / 4, 0, 0, 1);
    this.triangleBigRight.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate((-3 * Math.sqrt(2)) / 2, 0, 0);
    this.scene.rotate(-Math.PI / 4, 0, 0, 1);
    this.triangleBigLeft.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-Math.sqrt(2) / 2, 2 * Math.sqrt(2), 0, 0);
    this.scene.scale(-1, 1, 1);

    this.scene.rotate((-3 * Math.PI) / 4, 0, 0, 1);
    this.parallelogram.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate((3 * Math.sqrt(2)) / 2, -Math.sqrt(2), 0, 0);
    this.scene.rotate((-3 * Math.PI) / 4, 0, 0, 1);
    this.triangle.display();

  }

  updateBuffers(){
    this.diamond.initBuffers();
    this.triangleSmallAbove.initBuffers();
    this.triangleSmallBelow.initBuffers();
    this.triangleBigRight.initBuffers();
    this.triangleBigLeft.initBuffers();
    this.parallelogram.initBuffers();
    this.triangle.initBuffers();

    this.diamond.initNormalVizBuffers();
    this.triangleSmallAbove.initNormalVizBuffers();
    this.triangleSmallBelow.initNormalVizBuffers();
    this.triangleBigRight.initNormalVizBuffers();
    this.triangleBigLeft.initNormalVizBuffers();
    this.parallelogram.initNormalVizBuffers();
    this.triangle.initNormalVizBuffers();
  }

  enableNormalViz(){
    this.diamond.enableNormalViz();
    this.triangleSmallAbove.enableNormalViz();
    this.triangleSmallBelow.enableNormalViz();
    this.triangleBigRight.enableNormalViz();
    this.triangleBigLeft.enableNormalViz();
    this.parallelogram.enableNormalViz();
    this.triangle.enableNormalViz();
  }
}
