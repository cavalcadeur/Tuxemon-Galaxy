window.Governor = function(){

    class Governor {

        
        
        constructor(){
            this.goOn = false;
            this.objects = [];
            this.g = 0.3;
            this.saveInterval = 60; this.saveN = 0;
            this.models = [
                [["shop",[5000,-750]],
                 [40,[0,-8800],undefined,[11,0]],
                 [400,[-3100,0],undefined,[0,20]],
                 [550,[0,-8500],undefined,[10,0]],
                 [3000,[0,0],3000000]],

                [[30,[100,-200]],
                 [40,[200,-600]],
                 [50,[100,100]],
                 [35,[-100,300]],
                 [90,[500,-300]],
                 [100,[-300,200]],
                 [700,[-500,600]]],

                [["shop",[1000,-500]],
                 [3000,[0,0],4000000]]
            ];

            this.planetTypes = [["AV8R",25,150],["grimachin",200,600],["dandicub",500,1500],
                                ["tweesher",300,800],["bigFin",1500,4000],
                                ["propellercat",25,100],["botbot",25,120],
                                ["PiCC",400,1500],["zunna",1300,3000],
                                ["eruptibus",250,750]];
        }

        init(draw,key){
            this.Drawer = draw; this.KeyBoard = key;
        }

        generateGalaxy(save){
            if (save == undefined){
                this.objects = [
                    new SpaceShip("spaceShip",20,[0,0]),
                    new Object("tuto",600,[0,-200],0),
                    new Object("AV8R",30,[-500,500],undefined,[1,-1])
                ];
            }
            else {
                this.objects = [new SpaceShip("spaceShip",20,[0,0])];
            }

            this.objects[0].getData(save);
        }

        start(){
            if (this.goOn == false){
                this.goOn = true;
                this.animation();
            }
        }

        stop(){
            this.goOn = false;
        }

        key(){
            if (this.KeyBoard.isPressed("+") || this.KeyBoard.isPressed("v")){
                this.Drawer.mulZoom(1.11);
            }
            else if (this.KeyBoard.isPressed("-") || this.KeyBoard.isPressed("c")){
                this.Drawer.mulZoom(0.9);
            }
        }

        checkGalaxy(){
            let margin = this.Drawer.getMargin(); let pos = [0,0];
            let playerPos = this.objects[0].pos();
            for (let i = 1; i < this.objects.length; i ++){
                pos = this.objects[i].pos();
                if (Math.abs(pos[0] - playerPos[0]) < margin[0] &&
                    Math.abs(pos[1] - playerPos[1]) < margin[1]) return;
            }
            // let's get rid of these planets
            this.objects = [this.objects[0]];
            this.newPlanets(playerPos,margin); // and let's add new ones
        }
        
        animation(){
            let f = function(t){
                this.saveN += 1;
                if (this.saveN >= this.saveInterval){
                    this.saveN = 0;
                    this.saveGame();
                }
                resize();
                this.Drawer.setWH(W,H);

                if (this.objects[0].inShop) this.shopGameplay(t);
                else this.standardGameplay(t);
                
                if (this.goOn) window.requestAnimationFrame(f.bind(this));
            };
            window.requestAnimationFrame(f.bind(this));
        }

        saveGame(){
            window.localStorage.setItem("save",this.objects[0].saveData());
        }
        
        clic(){
            if (this.objects[0].inShop){
                this.objects[0].clicShop();
            }
        }
        
        shopGameplay(t){
            this.Drawer.drawBack();

            this.objects[0].actShop();
            this.objects[0].drawShop(this.Drawer);
        }
        
        standardGameplay(t){
                this.Drawer.drawBack();

                for (let i = this.objects.length - 1; i >= 0; i -= 1){
                    this.objects[i].act(t,this.KeyBoard,this.objects,this.g,this.Drawer.zoom);
                    this.objects[i].draw(this.Drawer);
                    if (this.objects[i].isDead()){
                        this.objects.splice(i,1);
                    } 
                }

                this.key();
                
                this.Drawer.centerScroll(this.objects[0].pos());

                this.checkGalaxy();
        }
        
        newPlanets(playerPos,margin){
            let h = Math.floor(Math.random()*this.models.length);
            h = this.models[h];
            let r = this.objects[0].getR() + (Math.random() - 0.5)*Math.PI*0.5;
            let center = [playerPos[0] + Math.cos(r)*margin[0]*0.75,playerPos[1] + Math.sin(r)*margin[1]*0.75];

            let name = "";
            for (let i = 0; i < h.length; i ++){
                if (h[i][0] == "shop"){
                    this.objects.push(new Shop("shop",40,[h[i][1][0] + center[0], h[i][1][1] + center[1]], h[i][2], h[i][3]));
                }
                name = this.getName(h[i][0]);
                this.objects.push(
                    new Object(name,h[i][0],
                               [h[i][1][0] + center[0], h[i][1][1] + center[1]],
                               h[i][2], h[i][3])
                );
            }
        }

        getName(size){
            let possible = [];
            for (let i = 0; i < this.planetTypes.length; i ++){
                if (this.planetTypes[i][1] <= size && this.planetTypes[i][2] >= size) {
                    possible.push(this.planetTypes[i][0]);
                }
            }
            let h = Math.floor(Math.random()*possible.length);
            return possible[h];
        }
        
        
    };

    
    return new Governor();
}();
