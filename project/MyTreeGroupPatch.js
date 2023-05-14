import { MyBillBoard } from "./MyBillBoard.js";

/**
 * MyTreeGroupPatch
 * @constructor
 * @param scene - Reference to MyScene object
 **/
export class MyTreeGroupPatch {
  constructor(scene) {
    this.scene = scene;
    this.trees = [];

    // Create the trees
    for (let i = 0; i < 9; i++) {
      this.trees.push(new MyBillBoard(this.scene));
    }
  }

  display() {
    this.scene.popMatrix();
    this.scene.pushMatrix();


    // Display the trees
    let increment = -30;
    let x = increment;
    let z = increment;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        x += increment;
        this.trees[i * 3 + j].display(x, 13, z);
      }
      x = increment;
      z += increment;
    }
  }
}