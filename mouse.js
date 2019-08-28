window.Mouse = function(){
    class Mouse {

        constructor(){
            this.mouse = [2,2];
            this.clics = [];
        }

        init(){
            document.addEventListener("mousedown",this.keyDown.bind(this));
            document.addEventListener("mouseup",this.keyUp.bind(this));
            document.addEventListener("mousemove",this.keyMove.bind(this));
        }

        keyDown(evt){
            this.clics[evt.button] = true;
        }
        
        keyUp(evt){
            this.clics[evt.button] = false;
            Governor.clic();
        }

        keyMove(evt){
            this.mouse = [evt.clientX,evt.clientY];
        }
        
        isPressed(touche){
            return this.key[touche] == 1;
        }

        isOn(x,y,w,h){
            return x < this.mouse[0] && x + w >= this.mouse[0] &&
                y < this.mouse[1] && y + h >= this.mouse[1];
        }
    }

    return new Mouse();
}();
