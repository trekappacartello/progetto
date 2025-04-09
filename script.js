var myGamePiece;

function startGame() {
    myGameArea.start();
    animatedObject.loadImages();  // Carica l'immagine dell'oggetto animato
    myGamePiece = new component(30, 30, "red", 10, 120);
}

var myGameArea = {
    canvas: document.getElementById("gameCanvas"),
    start: function () {
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateGameArea, 20); // 20ms per fotogramma
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    drawGameObject: function(gameObject) {

        this.context.drawImage(
          gameObject.image,
          gameObject.x,
          gameObject.y,
          gameObject.width,
          gameObject.height
        );
    }
};

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;

    // Funzione per aggiornare il rettangolo sulla canvas
    this.update = function () {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    // Funzione che aggiorna la posizione del rettangolo
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    };
}

// Funzione che aggiorna la game area (per ogni fotogramma)
function updateGameArea() {
    myGameArea.clear();
    myGamePiece.newPos(); // Aggiorna la posizione in base alla velocità
    myGamePiece.update(); // Rende visibile il rettangolo alla nuova posizione
    myGameArea.drawGameObject(animatedObject); // Disegna l'oggetto animato (immagine)
}

// Funzione che viene chiamata quando un bottone viene premuto
function buttonAction(action) {
    switch (action) {
        case 'moveup':
            myGamePiece.speedY -= 1;  // Aumenta la velocità verso l'alto
            break;
        case 'movedown':
            myGamePiece.speedY += 1;  // Aumenta la velocità verso il basso
            break;
        case 'moveleft':
            myGamePiece.speedX -= 1;  // Aumenta la velocità verso sinistra
            break;
        case 'moveright':
            myGamePiece.speedX += 1;  // Aumenta la velocità verso destra
            break;
    }
}

// Funzione per fermare il movimento del rettangolo
function clearmove() {
    myGamePiece.speedX = 0;  // Imposta la velocità orizzontale a 0
    myGamePiece.speedY = 0;  // Imposta la velocità verticale a 0
}

var animatedObject = {
    speedX: 0,
    speedY: 0,
    width: 60,
    height: 60,
    x: 10,
    y: 120,

    loadImages: function() {
        this.image = new Image();
        this.image.src = "https://i.ibb.co/CjD4S3h/Run-000.png"; // Qui metti una tua immagine
    }
};
var animatedObject = {
    speedX: 0,
    speedY: 0,
    width: 60,
    height: 60,
    x: 10,
    y: 120,
    imageList: [], //Vettore che conterrà tutte le immagini caricate
    contaFrame: 0, //Tiene conto di quanti frame sono passati
    actualFrame: 0, //Specifica quale frame disegnare
  
    update: function() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.contaFrame++;
      if (this.contaFrame == 50) {
        this.contaFrame = 0;
        this.actualFrame = (1 + this.actualFrame) % this.imageList.length;
        //console.log(this.actualFrame);
        this.image = this.imageList[this.actualFrame];
      }
    },
  
    loadImages: function() {
       for (imgPath of running) {
        var img = new Image(this.width, this.height);
        img.src = imgPath;
        this.imageList.push(img);
        //console.log(img);
      }
      this.image = this.imageList[this.actualFrame];
    }
  
};
