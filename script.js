// Funzione principale per avviare il gioco
function startGame() {
    myGameArea.start(); // Avvia l'area di gioco
    animatedObject.loadImages(); // Carica le immagini per il primo personaggio
    secondCharacter.loadImages(); // Carica le immagini per il secondo personaggio
}

// Oggetto che rappresenta l'area di gioco
var myGameArea = {
    canvas: document.getElementById("gameCanvas"), // Riferimento al canvas HTML
    start: function () {
        this.context = this.canvas.getContext("2d"); // Ottiene il contesto 2D del canvas
        this.interval = setInterval(updateGameArea, 20); // Aggiorna l'area di gioco ogni 20ms
    },
    clear: function () {
        // Pulisce l'intero canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    drawGameObject: function(gameObject, isMirrored = false) {
        if (isMirrored) {
            // Salva il contesto corrente
            this.context.save();
            // Riflette orizzontalmente il contesto
            this.context.scale(-1, 1);
            // Disegna l'immagine specchiata
            this.context.drawImage(
                gameObject.image,
                -gameObject.x - gameObject.width, // Posizione X specchiata
                gameObject.y,
                gameObject.width,
                gameObject.height
            );
            // Ripristina il contesto originale
            this.context.restore();
        } else {
            // Disegna normalmente
            this.context.drawImage(
                gameObject.image,
                gameObject.x,
                gameObject.y,
                gameObject.width,
                gameObject.height
            );
        }
    }
};

// Oggetto per tenere traccia dei tasti premuti
var keys = {};

// Aggiungi un listener per i tasti premuti
document.addEventListener("keydown", function(event) {
    keys[event.key] = true; // Registra il tasto come premuto
});

// Aggiungi un listener per i tasti rilasciati
document.addEventListener("keyup", function(event) {
    keys[event.key] = false; // Registra il tasto come rilasciato
});

// Funzione per aggiornare il movimento del primo personaggio
function updateMovement() {
    let isMoving = false;

    if (keys['w'] && animatedObject.jumpCount < 2) { // Tasto W per saltare
        animatedObject.speedY = -15; // Impulso verso l'alto
        animatedObject.jumpCount++; // Incrementa il conteggio dei salti
        isMoving = true;
    }

    if (keys['a']) { // Tasto A per muoversi a sinistra
        animatedObject.speedX = -3;
        isMoving = true;
    } else if (keys['d']) { // Tasto D per muoversi a destra
        animatedObject.speedX = 3;
        isMoving = true;
    } else {
        animatedObject.speedX = 0;
    }

    animatedObject.isMoving = isMoving;
}

// Funzione per aggiornare il movimento del secondo personaggio
function updateSecondMovement() {
    let isMoving = false;

    if (keys['ArrowUp'] && secondCharacter.jumpCount < 2) { // Freccia Su per saltare
        secondCharacter.speedY = -15; // Impulso verso l'alto
        secondCharacter.jumpCount++; // Incrementa il conteggio dei salti
        isMoving = true;
    }

    if (keys['ArrowLeft']) { // Freccia Sinistra per muoversi a sinistra
        secondCharacter.speedX = -3;
        isMoving = true;
    } else if (keys['ArrowRight']) { // Freccia Destra per muoversi a destra
        secondCharacter.speedX = 3;
        isMoving = true;
    } else {
        secondCharacter.speedX = 0;
    }

    secondCharacter.isMoving = isMoving;
}

// Funzione per aggiornare l'area di gioco
function updateGameArea() {
    myGameArea.clear(); // Pulisce il canvas
    updateMovement(); // Aggiorna il movimento del primo personaggio
    updateSecondMovement(); // Aggiorna il movimento del secondo personaggio
    animatedObject.update(); // Aggiorna lo stato del primo personaggio
    secondCharacter.update(); // Aggiorna lo stato del secondo personaggio
    myGameArea.drawGameObject(animatedObject); // Disegna il primo personaggio sul canvas
    myGameArea.drawGameObject(secondCharacter, true); // Disegna il secondo personaggio specchiato
}

// Metodo update per il primo personaggio
var animatedObject = {
    speedX: 0,
    speedY: 0,
    width: 60,
    height: 60,
    x: myGameArea.canvas.width / 4 - 30, // Posizionato al centro sinistro
    y: myGameArea.canvas.height - 60, // Alla base del canvas
    imageList: [],
    contaFrame: 0,
    actualFrame: 0,
    isMoving: false,
    jumpCount: 0, // Conta i salti consecutivi
    update: function() {
        // Applica la gravità
        this.speedY += 1; // Gravità aumentata
        if (this.speedY > 10) this.speedY = 10; // Limita la velocità di caduta

        // Aggiorna la posizione
        this.x += this.speedX;
        this.y += this.speedY;

        // Impedisce al personaggio di uscire dai bordi del canvas
        if (this.x < 0) this.x = 0; // Limite sinistro
        if (this.x + this.width > myGameArea.canvas.width) {
            this.x = myGameArea.canvas.width - this.width; // Limite destro
        }
        if (this.y + this.height > myGameArea.canvas.height) {
            this.y = myGameArea.canvas.height - this.height; // Limite inferiore
            this.speedY = 0; // Ferma la caduta quando tocca il suolo
            this.jumpCount = 0; // Resetta il conteggio dei salti
        }

        if (this.isMoving) {
            this.contaFrame++;
            if (this.contaFrame === 3) {
                this.contaFrame = 0;
                this.actualFrame = (this.actualFrame + 1) % this.imageList.length;
                this.image = this.imageList[this.actualFrame];
            }
        }
    },
    loadImages: function() {
        for (var imgPath of running) {
            var img = new Image(this.width, this.height);
            img.src = imgPath;
            this.imageList.push(img);
        }
        this.image = this.imageList[0];
    }
};

// Metodo update per il secondo personaggio
var secondCharacter = {
    speedX: 0,
    speedY: 0,
    width: 60,
    height: 60,
    x: (myGameArea.canvas.width * 3) / 4 - 30, // Posizionato al centro destro
    y: myGameArea.canvas.height - 60, // Alla base del canvas
    imageList: [],
    contaFrame: 0,
    actualFrame: 0,
    isMoving: false,
    jumpCount: 0, // Conta i salti consecutivi
    update: function() {
        // Applica la gravità
        this.speedY += 1; // Gravità aumentata
        if (this.speedY > 10) this.speedY = 10; // Limita la velocità di caduta

        // Aggiorna la posizione
        this.x += this.speedX;
        this.y += this.speedY;

        // Impedisce al personaggio di uscire dai bordi del canvas
        if (this.x < 0) this.x = 0; // Limite sinistro
        if (this.x + this.width > myGameArea.canvas.width) {
            this.x = myGameArea.canvas.width - this.width; // Limite destro
        }
        if (this.y + this.height > myGameArea.canvas.height) {
            this.y = myGameArea.canvas.height - this.height; // Limite inferiore
            this.speedY = 0; // Ferma la caduta quando tocca il suolo
            this.jumpCount = 0; // Resetta il conteggio dei salti
        }

        if (this.isMoving) {
            this.contaFrame++;
            if (this.contaFrame === 3) {
                this.contaFrame = 0;
                this.actualFrame = (this.actualFrame + 1) % this.imageList.length;
                this.image = this.imageList[this.actualFrame];
            }
        }
    },
    loadImages: function() {
        for (var imgPath of runningSecond) {
            var img = new Image(this.width, this.height);
            img.src = imgPath;
            this.imageList.push(img);
        }
        this.image = this.imageList[0];
    }
};