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
    this.offsets = []; // Store the random offsets for each tree

    // Create the trees and generate random offsets
    for (let i = 0; i < 9; i++) {
      this.trees.push(new MyBillBoard(this.scene));

      // Generate random offsets for each tree
      let xOffset = Math.random() * 5 - 2.5;
      let zOffset = Math.random() * 5 - 2.5;
      this.offsets.push({ x: xOffset, z: zOffset });
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

        // Retrieve the stored random offsets for the current tree
        let offset = this.offsets[i * 3 + j];

        this.trees[i * 3 + j].display(x + offset.x, 13, z + offset.z);
      }
      x = increment;
      z += increment;
    }
  }
}