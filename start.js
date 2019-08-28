// Fichier d'initialisation du jeu.

let W,H,ctx,canvas;
let vecteurs = [[0,-1],[1,0],[0,1],[-1,0]];
let save = JSON.parse(window.localStorage.getItem("save"));

function resize(){
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.setAttribute("width",W);
    canvas.setAttribute("height",H);
}

function start(){
    // Construction de ce qui sert pour toute la session de jeu.
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");
    resize();
    
    Drawer.init(ctx,W,H,0,0);
    KeyBoard.init();
	Mouse.init();
    Governor.init(Drawer,KeyBoard);

    Governor.generateGalaxy(save);
    
    Governor.start();

}

