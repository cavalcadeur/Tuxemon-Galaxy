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
    
    getContent(){
        let result = [];
        for (let i = 0; i < this.content.length; i ++){
            result[i] = [this.content[i][0].src,this.content[i][1]];
        }
        return result;
    }

    setContent(data){
        for (let i = 0; i < data.length; i ++){
            this.content[i] = [new Image(),data[i][1]];
            this.content[i][0].src = data[i][0];
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
                price += Math.round(this.content[i][1]);
            }
        }
        this.content = [];
        return price;
    }
    
};
