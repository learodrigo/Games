import {Sides, Trait} from '../Entity.js';

export default class Solid extends Trait {
    constructor() {
        super('solid');
        this.obstructs = true;
    }

    obstruct(entity, side, match) {
        if (!this.obstructs) {
            return;
        }
        // if (side === Sides.BOTTOM) {
        //     entity.bounds.bottom = match.y1;
        //     entity.vel.y = 0;
        // } else if (side === Sides.TOP) {
        //     entity.bounds.top = match.y2;
        //     entity.vel.y = 0;
        // } else if (side === Sides.LEFT) {
        //     entity.bounds.left = match.x2;
        //     entity.vel.x = 0;
        // } else if (side === Sides.RIGHT) {
        //     entity.bounds.right = match.x1;
        //     entity.vel.x = 0;
        // }


        switch (side) {
            case Sides.BOTTOM:
                entity.bounds.bottom = match.y1;
                entity.vel.y = 0;
                break;
            case Sides.TOP:
                entity.bounds.top = match.y2;
                entity.vel.y = 0;
                break;
            case Sides.LEFT:
                entity.bounds.left = match.x2;
                entity.vel.x = 0;
                break;
            case Sides.RIGHT:
                entity.bounds.right = match.x1;
                entity.vel.x = 0;
                break;
        }
    }
}
