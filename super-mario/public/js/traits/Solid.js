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
