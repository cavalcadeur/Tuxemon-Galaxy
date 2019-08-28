window.Drawer = function(){

    class Drawer {

        
        
        constructor(){
            this.stars = [];
            this.colorBack = "rgb(0,0,30)";
            this.colorStar = "rgb(250,250,50)";
            this.lensColor = "rgb(210,210,210)";
            this.shopColor = "rgb(160,160,190)";
            this.shopColor2 = "rgb(0,0,0)";
            this.starNum = 80;
            this.scroll = [0,0];
            this.zoom = 0.9;
            this.zoomMin = 0.02; this.zoomMax = 2.5;
        }

        init(ctx,W,H,scrollX,scrollY){
            this.ctx = ctx;
            this.setWH(W,H);
            this.scrollX = scrollX; this.scrollY = scrollY;
            for (let i = 0; i < this.starNum; i ++){
                let n = Math.random()*10;
                if (n >= 8) n = 1;
                else n = 0;
                this.stars[i] = [n,Math.round(Math.random() * W),Math.round(Math.random() * H)];
            }
        }

        setWH(W,H){
            this.W = W;
            this.H = H;
        }
        
        setZoom(z){
            this.zoom = z;
        }

        getMargin(){
            return [W / this.zoomMin, H / this.zoomMin];
        }

        mulZoom(z){
            this.zoom *= z;
            if (this.zoom > this.zoomMax) this.zoom = this.zoomMax;
            else if (this.zoom < this.zoomMin) this.zoom = this.zoomMin;
        }
        
        centerScroll(pos){
            let newVec = [W/(2*this.zoom) - pos[0] - this.scroll[0],H/(2*this.zoom) - pos[1] - this.scroll[1]]
            this.scroll = [W/(2*this.zoom) - pos[0],H/(2*this.zoom) - pos[1]];

            let mod = 0.4 * this.zoom;
            for (let i = 0; i < this.starNum; i ++){
                if (i > this.starNum * 2 / 3) mod = 0.08 * this.zoom;
                else if (i > this.starNum / 3) mod = 0.2 * this.zoom;
                this.stars[i][1] += newVec[0] * mod;
                this.stars[i][2] += newVec[1] * mod;
                if (this.stars[i][1] > W) this.stars[i][1] -= W;
                else if (this.stars[i][1] < 0) this.stars[i][1] += W;
                if (this.stars[i][2] > H) this.stars[i][2] -= H;
                else if (this.stars[i][2] < 0) this.stars[i][2] += H;
            }
        }
        
        drawStar(star){
            if (star[0] == 0){
                this.ctx.fillRect(star[1]-1,star[2]-1,3,3);
            }
            else{
                ctx.beginPath();
                ctx.moveTo(star[1] - 2,star[2] - 2);
                ctx.lineTo(star[1],star[2] - 10);
                ctx.lineTo(star[1] + 2,star[2] - 2);
                ctx.lineTo(star[1] + 10,star[2]);
                ctx.lineTo(star[1] + 2,star[2] + 2);
                ctx.lineTo(star[1],star[2] + 10);
                ctx.lineTo(star[1] - 2,star[2] + 2);
                ctx.lineTo(star[1] - 10,star[2]);
                ctx.closePath();
                ctx.fill();
            }
        }
        
        drawBack(){
            this.ctx.fillStyle = this.colorBack;
            this.ctx.fillRect(0,0,W,H);
            this.ctx.fillStyle = this.colorStar;
            for (let i = 0; i < this.starNum; i ++){
                this.drawStar(this.stars[i]);
            }
        }

        drawCargo(content,n,size){
            let x = (W - size * 60 + 10)/2 + 25;
            for (let i = 0; i < size; i++){
                this.ctx.fillStyle = this.lensColor;
                this.ctx.beginPath();
                this.ctx.arc(x + i*60,H - 35,26,Math.PI,-Math.PI);
                this.ctx.fill();
                
                this.ctx.fillStyle = this.colorBack;
                this.ctx.beginPath();
                this.ctx.arc(x + i*60,H - 35,23,Math.PI,-Math.PI);
                this.ctx.fill();
                
                if (content[i] != undefined){
                    this.ctx.drawImage(content[i][0],x + i*60 - 20,H - 55,40,40);
                }
            }
        }
        
        imgObj(img,x,y,s,r,lens,alpha){
            if (alpha != undefined) this.ctx.globalAlpha = alpha;
            s = s * this.zoom;
            if (s < 5 && lens) s = 5; 
            this.ctx.save();
            this.ctx.translate((x + this.scroll[0]) * this.zoom,(y + this.scroll[1]) * this.zoom);
            this.ctx.rotate(r);
            this.ctx.drawImage(img,- s/2,- s/2,s,s);
            this.ctx.restore();
            
            this.ctx.globalAlpha = 1;

            if (s < 30 && lens){
                
                this.ctx.fillStyle = this.lensColor;
                this.ctx.beginPath();
                this.ctx.arc((x + this.scroll[0]) * this.zoom,(y + this.scroll[1]) * this.zoom - 50, 30,Math.PI,-Math.PI);
                this.ctx.fill();

                this.ctx.beginPath();
                this.ctx.moveTo((x + this.scroll[0]) * this.zoom,(y + this.scroll[1]) * this.zoom - 5);
                this.ctx.lineTo((x + this.scroll[0]) * this.zoom - 3,(y + this.scroll[1]) * this.zoom - 22);
                this.ctx.lineTo((x + this.scroll[0]) * this.zoom + 3,(y + this.scroll[1]) * this.zoom - 22);
                this.ctx.closePath();
                this.ctx.fill();
                

                this.ctx.fillStyle = this.colorBack;
                this.ctx.beginPath();
                this.ctx.arc((x + this.scroll[0]) * this.zoom,(y + this.scroll[1]) * this.zoom - 50, 27,Math.PI,-Math.PI);
                this.ctx.fill();
                
                this.ctx.save();
                this.ctx.translate((x + this.scroll[0]) * this.zoom,(y + this.scroll[1]) * this.zoom - 50);
                this.ctx.rotate(r);
                this.ctx.drawImage(img,- 26,- 26,52,52);
                this.ctx.restore();
            }
        }

        stringMoney(money,j){
            let spaces = "";
            for (let i = 1; i < j; i ++){
                if (money < 10**i) spaces += " ";
            }
            return spaces + money;
        }

        getNamesUpg(upg){
            let res = [];
            res[0] = "Capture Ray " + (upg[0] + 1);
            res[1] = "Cargo " + (upg[1] + 1);
            res[2] = "Compass";
            return res;
        }
        
        drawShopOverlay(money,upg){
            let res = this.getNamesUpg(upg);
            this.ctx.fillStyle = this.shopColor;
            this.ctx.fillRect(0,H-50,100,50);
            this.ctx.fillRect(W/2-150,0,300,100);
            for (let i = 0; i < 3; i ++){
                this.ctx.fillRect(W/2 - 250,H/2 - 150 + i*120,500,80);
            }
            this.ctx.textAlign = "center";
            this.ctx.fillStyle = this.shopColor2;
            this.ctx.font = "30px purisa";
            this.ctx.fillText(money + "€",50,H-12);
            this.ctx.font = "60px Purisa";
            this.ctx.fillText("SHOP",W/2,70);
            for (let i = 0; i < 3; i ++){
                this.ctx.fillText(res[i],W/2,H/2 - 90 + i*120);
            }
        }

        drawButton(butt,inverted){
            if (inverted) this.ctx.fillStyle = this.shopColor2;
            else this.ctx.fillStyle = this.shopColor;
            this.ctx.fillRect(butt[1],butt[2],butt[3],butt[4]);
            this.ctx.font = butt[5] + "px Purisa";
            
            this.ctx.textAlign = "center";
            if (inverted) this.ctx.fillStyle = this.shopColor;
            else this.ctx.fillStyle = this.shopColor2;
            this.ctx.fillText(butt[0],butt[1] + butt[3]/2,butt[2] + butt[4]/2 + butt[5]/3);
        }
        
    };

    
    return new Drawer();
}();
