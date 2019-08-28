window.KeyBoard = function(){
    class KeyBoard {

        constructor(){
            this.key = {};
            this.dest = 0; this.news = [];
        }

        init(){
            document.addEventListener("keydown",this.keyDown.bind(this));
            document.addEventListener("keyup",this.keyUp.bind(this));
        }

        keyDown(evt){
            this.key[evt.key] = 1;
            
        }
        
        keyUp(evt){
            this.key[evt.key] = 0;
        }

        resetNews(){
            this.news = [];
        }
        
        isPressed(touche){
            return this.key[touche] == 1;
        }
    }

    return new KeyBoard();
}();
