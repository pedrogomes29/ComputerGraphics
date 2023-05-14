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
  
      // Create the trees
      for (let i = 0; i < 6; i++) {
        this.trees.push(new MyBillBoard(this.scene));
      }
    }
    display() {
        this.scene.popMatrix();
        this.scene.pushMatrix();
  
        // Translate the group to the specified square
  
        // Display the trees
        let increment = -15;
        let x = -30
        let z = -90
        this.trees.forEach((tree) => {
            x += increment
            tree.display(x, 13, -20 + z);
      });
    }
}