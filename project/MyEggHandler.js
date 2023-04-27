import { CGFappearance } from "../lib/CGF.js";
import { MyBirdEgg } from "./MyBirdEgg.js";
import { Position } from "./Position.js";

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export class MyEggHandler{
    constructor(scene,texture){
        this.positions = []
        this.scene = scene
        this.egg = new MyBirdEgg(scene,texture);
        this.eggBeingPickedUp = -1;
        this.positions.push(new Position(-40,10,-30));
        this.positions.push(new Position(-60,10,-90));
        this.positions.push(new Position(-80,10,-100));
        this.positions.push(new Position(-120,10,-20));
        this.positions.push(new Position(-120,10,-100));
    }   
    getPositions(){
        return this.positions
    }

    hideEgg(index){
        this.eggBeingPickedUp = index
    }

    showEgg(){
        this.eggBeingPickedUp = -1;
    }

    display(){
        for (let i = 0; i < this.positions.length; i++) {
            if(i!=this.eggBeingPickedUp){
                this.scene.popMatrix();
                this.scene.pushMatrix();
                this.scene.translate(this.positions[i].x, this.positions[i].y, this.positions[i].z);
                this.egg.display();
            }
        }  
    }
}