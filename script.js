document.addEventListener("DOMContentLoaded", () => {

const rooms = ["Cafeteria", "Electrical", "Navigation", "MedBay"];
let currentRoom = "Cafeteria";

let players = [
    { name: "You", alive: true },
    { name: "Red", alive: true },
    { name: "Blue", alive: true },
    { name: "Green", alive: true }
];

let role = Math.random() < 0.25 ? "Impostor" : "Crewmate";
let tasksLeft = 3;
let killCooldown = false;

const roleText = document.getElementById("role");
const aliveText = document.getElementById("alive");
const roomText = document.getElementById("room");
const log = document.getElementById("log");
const killBtn = document.getElementById("killBtn");

roleText.textContent = role;
updateAlive();
killBtn.style.display = role === "Impostor" ? "inline-block" : "none";

function updateAlive() {
    aliveText.textContent = players.filter(p => p.alive).length;
}

window.move = function() {
    currentRoom = rooms[Math.floor(Math.random() * rooms.length)];
    roomText.textContent = "Room: " + currentRoom;
    log.textContent = "You moved.";
}

window.doTask = function() {
    if (role !== "Crewmate") {
        log.textContent = "Impostors can't do tasks!";
        return;
    }

    tasksLeft--;
    log.textContent = "Task completed. Tasks left: " + tasksLeft;

    if (tasksLeft <= 0) {
        alert("CREWMATES WIN!");
        location.reload();
    }
}

window.kill = function() {
    if (killCooldown) {
        log.textContent = "Kill cooldown!";
        return;
    }

    let victims = players.filter(p => p.alive && p.name !== "You");
    if (victims.length === 0) return;

    let victim = victims[Math.floor(Math.random() * victims.length)];
    victim.alive = false;

    log.textContent = "You killed " + victim.name;
    updateAlive();

    killCooldown = true;
    setTimeout(() => killCooldown = false, 5000);

    checkWin();
}

window.meeting = function() {
    let alivePlayers = players.filter(p => p.alive && p.name !== "You");

    if (alivePlayers.length === 0) return;

    let ejected = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
    ejected.alive = false;

    alert(ejected.name + " was ejected.");
    updateAlive();
    checkWin();
}

function checkWin() {
    let alive = players.filter(p => p.alive);

    if (role === "Impostor" && alive.length <= 2) {
        alert("IMPOSTOR WINS!");
        location.reload();
    }

    if (role === "Crewmate") {
        let impostorAlive = role === "Crewmate";
        if (!impostorAlive) {
            alert("CREWMATES WIN!");
            location.reload();
        }
    }
}

});
