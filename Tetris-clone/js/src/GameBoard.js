

define(["src/Numfont"],function(Numfont){

    var GameBoard = Class.extend({

        init: function(){
            this.back = content.get("back");
            this.blocks = content.get("blocks");

            var num = content.get("numbers");
            this.font = {
                gray:   new Numfont(num,   0, 9),
                cyan:   new Numfont(num, 9*1, 9),
                red:    new Numfont(num, 9*2, 9),
                blue:   new Numfont(num, 9*3, 9),
                orange: new Numfont(num, 9*4, 9),
                green:  new Numfont(num, 9*5, 9),
                yellow: new Numfont(num, 9*6, 9),
                purple: new Numfont(num, 9*7, 9)
            };
        },

        draw: function(ctx, stat){
            var tet = stat.tetraminos;

            ctx.drawImage(this.back, 0, 0);

            this.font.gray.draw(ctx, stat.lvl, 115, 16, 5);
            this.font.gray.draw(ctx, stat.lines, 115, 34, 5);
            this.font.gray.draw(ctx, stat.score, 80, 52, 10);

            this.font.orange.draw(  ctx, tet.L, 432,  52, 5);
            this.font.cyan.draw(    ctx, tet.I, 432,  76, 5);
            this.font.purple.draw(  ctx, tet.T, 432, 100, 5);
            this.font.green.draw(   ctx, tet.S, 432, 124, 5);
            this.font.red.draw(     ctx, tet.Z, 432, 148, 5);
            this.font.yellow.draw(  ctx, tet.O, 432, 172, 5);
            this.font.blue.draw(    ctx, tet.J, 432, 196, 5);

            this.font.gray.draw(ctx, tet.tot, 425, 221, 6);
        },

        drawBlock: function(ctx, block, x, y){
            var id = block.ID,
                size = 13;

                x = 179 + x*(size-1);
                y = 4 + y*(size-1);

                ctx.drawImage(this.blocks, id*(size-1), 0, size, size, x, y, size, size);
        }
    });

    return GameBoard;
});
