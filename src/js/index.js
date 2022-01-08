function setVh() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

u("window").on("load", setVh);
u("window").on("resize", setVh);

let activePage = "timer";

function navigate(hash) {
    u(".nav-link").removeClass("activeLink");
    u(`.nav-link[setPage="${hash}"]`).addClass("activeLink");
    
    u(".page").removeClass("show");
    u(`#${hash}Page`).addClass("show");

    activePage = hash;
}

HashNav.initial(activePage);
HashNav.change(navigate);

let currentScramble = null;
// let solves = [];
let currentSession = 0;
let sessions = [
    {
        name: "Session 1",
        scrambleType: 3,
        solves: []
    }
]
const penalties = ["none", "+2", "DNF"];

let timer = {
    started: false,
    cooldown: false,
    canStart: false,
    timeout: null,
    interval: null,
    time: 0,
    startTime: 0
};

(() => {
    u("[setPage]").each((node, i) => {
        u(node).on("click", (e) => {
            if(timer.started) return;
            HashNav.change(u(node).attr("setPage"));
		    e.preventDefault();
        });
    });

    newScramble();

    if (window.localStorage.getItem("sessions") !== null && window.localStorage.getItem("sessions") !== undefined) {
        sessions = JSON.parse(window.localStorage.getItem("sessions"));
    } else {
        save();
    }

    if(window.localStorage.getItem("currentSession") !== null && window.localStorage.getItem("currentSession") !== undefined) {
        currentSession = parseInt(localStorage.getItem("currentSession"));
    } else {
        saveCurrentSession();
    }

    writeAllSolves();
})();

function save() {
    window.localStorage.setItem("sessions", JSON.stringify(sessions));
}

function saveCurrentSession() {
    window.localStorage.setItem("currentSession", currentSession.toString());
}

function newScramble() {
    currentScramble = scramble(sessions[currentSession].scrambleType, 25);
    u(".scramble").text(currentScramble);
}

function saveSolve(time, timeStr) {
    const solveToSave = {
        scramble: currentScramble,
        time: time,
        timeString: timeStr,
        penalty: 0
    }

    // solves.push(solveToSave);
    sessions[currentSession].solves.push(solveToSave);
    displaySolve(solveToSave);

    newScramble();

    save();
}

function displaySolve(solve) {
    // console.log(solve);
    // console.log(sessions);
    const id = sessions[currentSession].solves.length - 1;
    const timeTd = u("<td>")
        .text(solve.penalty == 0 ? solve.timeString : solve.penalty == 1 ? solve.timeString + "+2" : "DNF(" + solve.timeString + ")")
        .addClass("solveTime")
        .on("click", () => solveInfo(solve, id));
    const scrambleTd = u("<td>")
        .text(solve.scramble)
        .addClass("solveScramble");
    const solveTr = u("<tr>")
        .append(timeTd)
        .append(scrambleTd)
        .addClass("solveTr")
        .attr("id", "s" + id);
    u(".solves tbody").append(solveTr);
}

function solveInfo(solve, id) {
    u(".timeInfo").text(solve.penalty == 0 ? solve.timeString : solve.penalty == 1 ? solve.timeString + "+2" : "DNF(" + solve.timeString + ")");
    u(".scrambleInfo").text(solve.scramble);

    u(".solveInfo").addClass("showInfo");
    u(".app-container").addClass("blur");

    u(".penaltyInfo .none").off("click").on("click", () => {
        sessions[currentSession].solves[id].penalty = 0;
        u(".timeInfo").text(solve.timeString);
        u(`#s${id} .solveTime`).text(solve.timeString);
        save();
    });

    u(".penaltyInfo .plus2").off("click").on("click", () => {
        sessions[currentSession].solves[id].penalty = 1;
        u(".timeInfo").text(solve.timeString + "+2");
        u(`#s${id} .solveTime`).text(solve.timeString + "+2");
        save();
    });

    u(".penaltyInfo .DNF").off("click").on("click", () => {
        sessions[currentSession].solves[id].penalty = 3;
        u(".timeInfo").text("DNF(" + solve.timeString + ")");
        u(`#s${id} .solveTime`).text("DNF(" + solve.timeString + ")");
        save();
    });

    u(".penaltyInfo .remove").off("click").on("click", () => {
        if(confirm("Do you want to delete the solve?")) {
            sessions[currentSession].solves.splice(id, parseInt(prompt("How many solves do you want to delete?", "1")));
            writeAllSolves();
        }
        save();
    });
}

u(".actions .none").off("click").on("click", () => {
    const id = sessions[currentSession].solves.length - 1;
    const timeString = sessions[currentSession].solves[id].timeString;
    sessions[currentSession].solves[id].penalty = 0;
    u(`#s${id} .solveTime`).text(timeString);
    u(`.time`).text(timeString);
    save();
});

u(".actions .plus2").off("click").on("click", () => {
    const id = sessions[currentSession].solves.length - 1;
    const timeString = sessions[currentSession].solves[id].timeString;
    sessions[currentSession].solves[id].penalty = 1;
    u(`#s${id} .solveTime`).text(timeString + "+2");
    u(`.time`).text(timeString + "+2");
    save();
});

u(".actions .DNF").off("click").on("click", () => {
    const id = sessions[currentSession].solves.length - 1;
    const timeString = sessions[currentSession].solves[id].timeString;
    sessions[currentSession].solves[id].penalty = 3;
    u(`#s${id} .solveTime`).text("DNF(" + timeString + ")");
    u(`.time`).text("DNF(" + timeString + ")");
    save();
});

u(".actions .remove").off("click").on("click", () => {
    const id = sessions[currentSession].solves.length - 1;
    if(confirm("Do you want to delete the solve?")) {
        sessions[currentSession].solves.splice(id, parseInt(prompt("How many solves do you want to delete?", "1")));
        writeAllSolves();
    }
    save();
});

function writeAllSolves() {
    u(".solveTr").remove();
    for(let i = 0; i < sessions[currentSession].solves.length; i++) {
        displaySolve(sessions[currentSession].solves[i]);
    }
}

u(".closeInfo").on("click", () => {
    u(".solveInfo").removeClass("showInfo");
    u(".app-container").removeClass("blur");
});

u(".scramble").on("click", newScramble);

u(document).on("keydown", keyDown);
u(document).on("keyup", keyUp);

function startTimerCooldown() {
    u(".time").addClass("red");
    timer.cooldown = true;
    timer.timeout = setTimeout(() => {
        u(".time").addClass("green").removeClass("red");
        timer.canStart = true;
    }, 500);
}

function stopTimerCooldown() {
    u(".time").removeClass("red").removeClass("green");
    timer.cooldown = false;
    clearTimeout(timer.timeout);
    if(timer.canStart) {
        timer.canStart = false;
        startTimer();
    }
}

function workFunc() {
    timer.time += timer.interval.interval;
    const p = parseTime(timer.time);
    const tStr = `${p.hours > 0 ? `${p.hours.toString()}.` : ""}${p.minutes > 0 ? `${p.minutes.toString().padStart(2, "0")}.` : ""}${p.seconds.toString().padStart(2, "0")}.${p.tenths.toString()}`;
    u(".time").text(tStr);
}

function startTimer() {
    timer.started = true;
    // Start
    timer.interval = new AdjustingInterval(workFunc, msInTenth);
    timer.interval.start();

    timer.startTime = Date.now();
}

function stopTimer() {
    timer.started = false;
    // Stop
    timer.interval.stop();
    timer.time = 0;
    const time = Date.now() - timer.startTime;
    const p = parseTime(time);
    const tStr = `${p.hours > 0 ? `${p.hours.toString()}.` : ""}${p.minutes > 0 ? `${p.minutes.toString().padStart(2, "0")}.` : ""}${p.seconds.toString().padStart(2, "0")}.${p.tenths.toString()}${p.hundredths.toString()}`;
    u(".time").text(tStr);
    saveSolve(time, tStr);
    save();
}

function keyDown(e) {
    switch (e.keyCode) {
        case 32:
            e.preventDefault();
            if(timer.started) stopTimer();
            else if(!timer.cooldown) startTimerCooldown();
            break;
        default:
            if(timer.started) stopTimer();
            break;
    }
}

function keyUp(e) {
    switch (e.keyCode) {
        case 32:
            e.preventDefault();
            if(timer.cooldown) stopTimerCooldown();
            break;
        default:
            break;
    }
}