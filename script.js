// Funzione principale per avviare il gioco
function startGame() {
    myGameArea.start(); // Avvia l'area di gioco
    animatedObject.loadImages();  // Carica le immagini per l'oggetto animato
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
    drawGameObject: function(gameObject) {
        // Disegna un oggetto di gioco sul canvas
        this.context.drawImage(
            gameObject.image, // Immagine da disegnare
            gameObject.x, // Posizione X
            gameObject.y, // Posizione Y
            gameObject.width, // Larghezza dell'immagine
            gameObject.height // Altezza dell'immagine
        );
    }
};

// Funzione per aggiornare il movimento in base ai tasti premuti
function updateMovement() {
    let isMoving = false; // Variabile temporanea per verificare il movimento

    if (keys['w']) { // Tasto W per muoversi in alto
        animatedObject.speedY = -3; // Aumenta la velocità verticale
        isMoving = true;
    } else if (keys['s']) { // Tasto S per muoversi in basso
        animatedObject.speedY = 3; // Aumenta la velocità verticale
        isMoving = true;
    } else {
        animatedObject.speedY = 0; // Ferma il movimento verticale
    }

    if (keys['a']) { // Tasto A per muoversi a sinistra
        animatedObject.speedX = -3; // Aumenta la velocità orizzontale
        isMoving = true;
    } else if (keys['d']) { // Tasto D per muoversi a destra
        animatedObject.speedX = 3; // Aumenta la velocità orizzontale
        isMoving = true;
    } else {
        animatedObject.speedX = 0; // Ferma il movimento orizzontale
    }

    // Aggiorna lo stato di movimento del personaggio
    animatedObject.isMoving = isMoving;
}

// Funzione per aggiornare l'area di gioco
function updateGameArea() {
    myGameArea.clear(); // Pulisce il canvas
    updateMovement(); // Aggiorna il movimento in base ai tasti premuti
    animatedObject.update(); // Aggiorna lo stato dell'oggetto animato
    myGameArea.drawGameObject(animatedObject); // Disegna l'oggetto animato sul canvas
}

// Oggetto che rappresenta il personaggio animato
var animatedObject = {
    speedX: 0, // Velocità orizzontale
    speedY: 0, // Velocità verticale
    width: 60, // Larghezza del personaggio
    height: 60, // Altezza del personaggio
    x: 10, // Posizione iniziale X
    y: 120, // Posizione iniziale Y
    imageList: [], // Array per contenere le immagini dell'animazione
    contaFrame: 0, // Contatore dei frame per gestire l'animazione
    actualFrame: 0, // Frame corrente da visualizzare
    isMoving: false, // Stato del movimento (true se il personaggio si muove)

    // Funzione per aggiornare lo stato del personaggio
    update: function() {
        // Aggiorna la posizione X e Y in base alla velocità
        this.x += this.speedX;
        this.y += this.speedY;

        // Controlla i limiti del canvas
        if (this.x < 0) this.x = 0; // Limite sinistro
        if (this.y < 0) this.y = 0; // Limite superiore
        if (this.x + this.width > myGameArea.canvas.width) {
            this.x = myGameArea.canvas.width - this.width; // Limite destro
        }
        if (this.y + this.height > myGameArea.canvas.height) {
            this.y = myGameArea.canvas.height - this.height; // Limite inferiore
        }

        // Aggiorna l'animazione solo se il personaggio si muove
        if (this.isMoving) {
            this.contaFrame++; // Incrementa il contatore dei frame
            if (this.contaFrame === 3) { // Cambia frame ogni 3 aggiornamenti (più veloce)
                this.contaFrame = 0; // Resetta il contatore dei frame
                this.actualFrame = (this.actualFrame + 1) % this.imageList.length; // Passa al frame successivo
                this.image = this.imageList[this.actualFrame]; // Imposta il nuovo frame
            }
        }
    },

    // Funzione per caricare le immagini dell'animazione
    loadImages: function() {
        for (var imgPath of running) { // Itera su ogni percorso immagine nell'array `running`
            var img = new Image(this.width, this.height); // Crea un nuovo oggetto immagine
            img.src = imgPath; // Imposta il percorso dell'immagine
            this.imageList.push(img); // Aggiunge l'immagine all'array
        }
        this.image = this.imageList[this.actualFrame]; // Imposta l'immagine iniziale
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