import { CGFobject } from "../lib/CGF.js";
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
    this.triangleSmallAbove = new MyTriangleSmall(scene);
    this.triangleSmallBelow = new MyTriangleSmall(scene);
    this.triangleBigRight = new MyTriangleBig(scene);
    this.triangleBigLeft = new MyTriangleBig(scene);
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
}
