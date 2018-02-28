
define(["src/GameBoard", "src/StatManager", "src/Tetramino"],
    function(GameBoard, StatManager, Tetramino){

    var Tetris = Class.extend({

        init: function(){
            this.gameBoard = new GameBoard();
            this.stat = new StatManager();

            var tet = new Tetramino(Tetramino.Z);
        },

        update: function(inpt){

        },

        draw: function(ctx){
            this.gameBoard.draw(ctx, this.stat);
        }
    });

    return Tetris;
});
