import {Sides, Trait} from '../Entity.js';

export default class PendulumMove extends Trait {
    constructor() {
        super('pendulumMove');
        this.enabled = true;
        this.speed = -30;
    }

    obstruct(entity, side) {
        if (side === Sides.LEFT || side === Sides.RIGHT){
            this.speed *= -1;
        }
    }

    update(entity){
        if (this.enabled) {
            entity.vel.x = this.speed;
        }
    }
}
