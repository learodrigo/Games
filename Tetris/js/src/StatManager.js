

define(function(){

    var StatManager = Class.extend({

        init: function(){
            this.reset(0);
        },

        reset: function(){
            this.tetraminos = {
                L: 0,
                I: 0,
                T: 0,
                S: 0,
                Z: 0,
                O: 0,
                J: 0,

                tot: 0,
            } // data
        },

        incTetramino: function(id){
            this.tetraminos[id]++;
            this.tetraminos.tot++;
        }
    });

    return StatManager;
});
