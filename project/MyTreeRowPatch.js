import { MyBillBoard } from "./MyBillBoard.js";
/**
 * MyTreeRowPatch
 * @constructor
 * @param scene - Reference to MyScene object
 **/
export class MyTreeRowPatch {
  constructor(scene) {
    this.scene = scene;
    this.trees = [];
    this.offsets = []; // Store the random offsets for each tree

    // Create the trees and generate random offsets
    for (let i = 0; i < 6; i++) {
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

    // Translate the group to the specified square

    // Display the trees with stored random offsets
    let increment = -15;
    let x = -30;
    let z = -90;
    for (let i = 0; i < 6; i++) {
      // Retrieve the stored random offsets for the current tree
      let offset = this.offsets[i];

      x += increment;
      this.trees[i].display(x + offset.x, 13, -20 + z + offset.z);
    }
  }
}