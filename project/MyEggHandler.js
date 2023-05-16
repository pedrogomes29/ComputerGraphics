import { CGFappearance } from "../lib/CGF.js";
import { MyBirdEgg } from "./MyBirdEgg.js";
import { Position } from "./Position.js";

const TIME_TO_FALL = 1000;

export class MyEggHandler{
    constructor(scene,texture){
        this.positions = []
        this.scene = scene
        this.egg = new MyBirdEgg(scene,texture);
        this.eggBeingPickedUp = -1;
        this.eggBeingDropped = -1;
        this.initialPosition = null;
        this.finalPosition = null;
        this.startOfMovement = null;
        this.vx = 0;
        this.vy = 0;
        this.vz = 0;
        this.aceleration = 0;
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

    initializeMovement(initialPosition,finalPosition){
        this.eggBeingDropped = this.eggBeingPickedUp;
        this.eggBeingPickedUp = -1;
        this.initialPosition = initialPosition;
        this.positions[this.eggBeingDropped] = initialPosition
        this.finalPosition = finalPosition;
        this.startOfMovement = Date.now();
        this.acceleration = (2/(TIME_TO_FALL*TIME_TO_FALL))
                            *(this.finalPosition.y-this.initialPosition.y)
        this.vx = (finalPosition.x-initialPosition.x)/TIME_TO_FALL;
        this.vz = (finalPosition.z-initialPosition.z)/TIME_TO_FALL;
        console.log(this.acceleration)
    }

    update(t){
        if(this.eggBeingDropped!=-1){
            const timeSinceStart = t-this.startOfMovement 
            if(this.positions[this.eggBeingDropped].y<this.finalPosition.y){
                this.eggBeingDropped = -1;
                this.positions[this.eggBeingDropped] = this.finalPosition;
            }
            else{
                const newPosition = new Position (this.initialPosition.x+this.vx*timeSinceStart,
                    this.initialPosition.y+(1/2)*this.acceleration*timeSinceStart*timeSinceStart,
                    this.initialPosition.z+this.vz*timeSinceStart);
                console.log(newPosition)
                this.positions[this.eggBeingDropped] = newPosition;
            }
          
        }
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