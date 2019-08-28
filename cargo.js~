class Cargo {
    
    constructor(taille,content){
        this.taille = taille;
        this.content = content;
        this.show = 0;
        this.n = 0;
    }
    
    draw(Painter){
        if (this.show == 1) {
            Painter.drawCargo(this.content,this.n,this.taille);
            this.n -= 1;
            if (this.n == 0) this.show = 0;
        }
    }

    add(pack){
        if (this.taille > this.content.length){
            this.content.push(pack);
            this.show = 1; this.n = 300;
        }
        else{
            this.show = 2;
        }
    }

    sellPack(){
        let price = 0;
        for (let i = 0; i < this.taille; i ++){
            if (this.content[i] != undefined){
                price += Math.round(this.content[i][1] / 2);
            }
        }
        this.content = [];
        return price;
    }
    
};
