var canvas;
var ctx;

// basic beholder til alle rektanglene som man kommer til å lage
var RectList = [];

// setter opp blueprint til hvert av rektanglene så det er mye lettere å lage dem
class Box {
    constructor() {
        this.x = 250;
        this.y = 250;
        this.size = 25;
        this.color = "#fff";

        this.xSpeed = ((Math.random() * 5) - ((Math.random() * 5)));
        this.ySpeed = ((Math.random() * 5) - ((Math.random() * 5)));
    }
    //Getters and Setters for variablene av hvert av boksene
    GetXSpeed() { return this.xSpeed; }
    GetYSpeed() { return this.ySpeed; }
    GetSize() { return this.size; }
    GetColor() { return this.color; }
    GetX() { return this.x; }
    GetY() { return this.y; }

    SetSize(newSize) { this.size = newSize; }
    SetX(newX) { this.x = newX; }
    SetY(newY) { this.y = newY; }
    SetColor(newColor) { this.color = newColor; }
}
//denne function gjør at partiklene blir mindre og mindre mens tida går og hvis det er = 0 returner det 0 så en annen function kan bare sette verdiene tilbake på plass
function MoveShrink(size, sizeMulitiplier) {
    //new formula
    if (size <= 0.3 /*works fine with 0.3 to 0.5*/) {
        return 0;
    } else {
        return ((size * sizeMulitiplier)+0.1);
    }
    /*
    Old Formula
    if (size <= 0){
        return 0;
    } else {
        return ((size *sizeMulitipler)-0.005);    
    }
    */


}
//I draw får vi boksen til å bevege seg en frame
function Draw(particle = new Box()){    
    ctx.fillStyle = particle.GetColor();	
    ctx.fillRect(particle.GetX(), particle.GetY(), particle.GetSize(), particle.GetSize());
    // ctx.fillRect(Rectangle X position on canvas, Pectangle y position on canvas, width of rectangle, height of rectangle)
    particle.SetX((particle.GetX() + particle.GetXSpeed()));
    particle.SetY((particle.GetY() + particle.GetYSpeed()));
    particle.SetSize(MoveShrink(particle.GetSize(),(Math.random()*0.82) + 0.45)); 

    //Sjekker om partikelen er usynlig og hvis den er det så starter den på nytt
    //Laget pga hvis jeg holdte på å lage uendelig mange rektangler koster det bare formye memory og krever at jeg bruker infinite loop som kan bare crashe nettsiden
    // ^ kan bli gjørt om slik at når partikkelen forsvinner blir den tatt av fra Hoved partikkel arrayen og da kan vi kjøre function som kommer til å repopulate array tilbake til 100
    if (particle.GetSize() <= 0) {
        particle.SetX(250);
        particle.SetY(250);
        particle.SetSize(25);
    }
}

//denne function lager alle boxene, og gir dem nye farger
function CreateInfo() {
    for (var i = 0; i < 1500; i++) {
        RectList[i] = new Box();
        RectList[i].SetColor(CreateNewHex());
    }
}

//Vi må gjøre at hvert av partiklene får sin frame til å bevege seg så derfor setter vi opp enda en for loop som gjør det for oss
function DrawParticles() {
    // vi rydder canvas her siden da får vi se neste frame
    ctx.clearRect(0, 0, 500, 500);
    for (var i = 0; i < RectList.length; i++) {
        Draw(RectList[i]);
    }
}

//denne function gjør at alt som er beskrevet over skjer, med intervaler per 0.03 sekund
window.onload = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    CreateInfo();
    setInterval(DrawParticles, 30);
}

function CreateNewHex() {
    var ToHexHelperArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
    var FOfHex = Math.floor(Math.random() * 16);
    var SOfHex = Math.floor(Math.random() * 16);
    var TOfHex = Math.floor(Math.random() * 16);
    var NewHex = "#" + ToHexHelperArray[FOfHex] + ToHexHelperArray[SOfHex] + ToHexHelperArray[TOfHex];
    return NewHex;
}