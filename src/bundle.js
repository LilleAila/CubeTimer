(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/* Umbrella JS 3.2.2 umbrellajs.com */

var u=function(t,e){return this instanceof u?t instanceof u?t:("string"==typeof t&&(t=this.select(t,e)),t&&t.nodeName&&(t=[t]),void(this.nodes=this.slice(t))):new u(t,e)};u.prototype={get length(){return this.nodes.length}},u.prototype.nodes=[],u.prototype.addClass=function(){return this.eacharg(arguments,function(t,e){t.classList.add(e)})},u.prototype.adjacent=function(i,t,n){return"number"==typeof t&&(t=0===t?[]:new Array(t).join().split(",").map(Number.call,Number)),this.each(function(r,o){var e=document.createDocumentFragment();u(t||{}).map(function(t,e){var n="function"==typeof i?i.call(this,t,e,r,o):i;return"string"==typeof n?this.generate(n):u(n)}).each(function(t){this.isInPage(t)?e.appendChild(u(t).clone().first()):e.appendChild(t)}),n.call(this,r,e)})},u.prototype.after=function(t,e){return this.adjacent(t,e,function(t,e){t.parentNode.insertBefore(e,t.nextSibling)})},u.prototype.append=function(t,e){return this.adjacent(t,e,function(t,e){t.appendChild(e)})},u.prototype.args=function(t,e,n){return"function"==typeof t&&(t=t(e,n)),"string"!=typeof t&&(t=this.slice(t).map(this.str(e,n))),t.toString().split(/[\s,]+/).filter(function(t){return t.length})},u.prototype.array=function(o){o=o;var i=this;return this.nodes.reduce(function(t,e,n){var r;return o?((r=o.call(i,e,n))||(r=!1),"string"==typeof r&&(r=u(r)),r instanceof u&&(r=r.nodes)):r=e.innerHTML,t.concat(!1!==r?r:[])},[])},u.prototype.attr=function(t,e,r){return r=r?"data-":"",this.pairs(t,e,function(t,e){return t.getAttribute(r+e)},function(t,e,n){t.setAttribute(r+e,n)})},u.prototype.before=function(t,e){return this.adjacent(t,e,function(t,e){t.parentNode.insertBefore(e,t)})},u.prototype.children=function(t){return this.map(function(t){return this.slice(t.children)}).filter(t)},u.prototype.clone=function(){return this.map(function(t,e){var n=t.cloneNode(!0),r=this.getAll(n);return this.getAll(t).each(function(t,e){for(var n in this.mirror)this.mirror[n]&&this.mirror[n](t,r.nodes[e])}),n})},u.prototype.getAll=function(t){return u([t].concat(u("*",t).nodes))},u.prototype.mirror={},u.prototype.mirror.events=function(t,e){if(t._e)for(var n in t._e)t._e[n].forEach(function(t){u(e).on(n,t.callback)})},u.prototype.mirror.select=function(t,e){u(t).is("select")&&(e.value=t.value)},u.prototype.mirror.textarea=function(t,e){u(t).is("textarea")&&(e.value=t.value)},u.prototype.closest=function(e){return this.map(function(t){do{if(u(t).is(e))return t}while((t=t.parentNode)&&t!==document)})},u.prototype.data=function(t,e){return this.attr(t,e,!0)},u.prototype.each=function(t){return this.nodes.forEach(t.bind(this)),this},u.prototype.eacharg=function(n,r){return this.each(function(e,t){this.args(n,e,t).forEach(function(t){r.call(this,e,t)},this)})},u.prototype.empty=function(){return this.each(function(t){for(;t.firstChild;)t.removeChild(t.firstChild)})},u.prototype.filter=function(e){var t=function(t){return t.matches=t.matches||t.msMatchesSelector||t.webkitMatchesSelector,t.matches(e||"*")};return"function"==typeof e&&(t=e),e instanceof u&&(t=function(t){return-1!==e.nodes.indexOf(t)}),u(this.nodes.filter(t))},u.prototype.find=function(e){return this.map(function(t){return u(e||"*",t)})},u.prototype.first=function(){return this.nodes[0]||!1},u.prototype.generate=function(t){return/^\s*<tr[> ]/.test(t)?u(document.createElement("table")).html(t).children().children().nodes:/^\s*<t(h|d)[> ]/.test(t)?u(document.createElement("table")).html(t).children().children().children().nodes:/^\s*</.test(t)?u(document.createElement("div")).html(t).children().nodes:document.createTextNode(t)},u.prototype.handle=function(){var t=this.slice(arguments).map(function(e){return"function"==typeof e?function(t){t.preventDefault(),e.apply(this,arguments)}:e},this);return this.on.apply(this,t)},u.prototype.hasClass=function(){return this.is("."+this.args(arguments).join("."))},u.prototype.html=function(e){return void 0===e?this.first().innerHTML||"":this.each(function(t){t.innerHTML=e})},u.prototype.is=function(t){return 0<this.filter(t).length},u.prototype.isInPage=function(t){return t!==document.body&&document.body.contains(t)},u.prototype.last=function(){return this.nodes[this.length-1]||!1},u.prototype.map=function(t){return t?u(this.array(t)).unique():this},u.prototype.not=function(e){return this.filter(function(t){return!u(t).is(e||!0)})},u.prototype.off=function(t,e,n){var r=null==e&&null==n,o=null,i=e;return"string"==typeof e&&(o=e,i=n),this.eacharg(t,function(e,n){u(e._e?e._e[n]:[]).each(function(t){(r||t.orig_callback===i&&t.selector===o)&&e.removeEventListener(n,t.callback)})})},u.prototype.on=function(t,e,o){var i=null,n=e;"string"==typeof e&&(i=e,n=o,e=function(e){var n=arguments,r=!1;u(e.currentTarget).find(i).each(function(t){if(t===e.target||t.contains(e.target)){r=!0;try{Object.defineProperty(e,"currentTarget",{get:function(){return t}})}catch(t){}o.apply(t,n)}}),r||e.currentTarget!==e.target||o.apply(e.target,n)});var r=function(t){return e.apply(this,[t].concat(t.detail||[]))};return this.eacharg(t,function(t,e){t.addEventListener(e,r),t._e=t._e||{},t._e[e]=t._e[e]||[],t._e[e].push({callback:r,orig_callback:n,selector:i})})},u.prototype.pairs=function(n,t,e,r){if(void 0!==t){var o=n;(n={})[o]=t}return"object"==typeof n?this.each(function(t){for(var e in n)r(t,e,n[e])}):this.length?e(this.first(),n):""},u.prototype.param=function(e){return Object.keys(e).map(function(t){return this.uri(t)+"="+this.uri(e[t])}.bind(this)).join("&")},u.prototype.parent=function(t){return this.map(function(t){return t.parentNode}).filter(t)},u.prototype.prepend=function(t,e){return this.adjacent(t,e,function(t,e){t.insertBefore(e,t.firstChild)})},u.prototype.remove=function(){return this.each(function(t){t.parentNode&&t.parentNode.removeChild(t)})},u.prototype.removeClass=function(){return this.eacharg(arguments,function(t,e){t.classList.remove(e)})},u.prototype.replace=function(t,e){var n=[];return this.adjacent(t,e,function(t,e){n=n.concat(this.slice(e.children)),t.parentNode.replaceChild(e,t)}),u(n)},u.prototype.scroll=function(){return this.first().scrollIntoView({behavior:"smooth"}),this},u.prototype.select=function(t,e){return t=t.replace(/^\s*/,"").replace(/\s*$/,""),/^</.test(t)?u().generate(t):(e||document).querySelectorAll(t)},u.prototype.serialize=function(){var r=this;return this.slice(this.first().elements).reduce(function(e,n){return!n.name||n.disabled||"file"===n.type?e:/(checkbox|radio)/.test(n.type)&&!n.checked?e:"select-multiple"===n.type?(u(n.options).each(function(t){t.selected&&(e+="&"+r.uri(n.name)+"="+r.uri(t.value))}),e):e+"&"+r.uri(n.name)+"="+r.uri(n.value)},"").slice(1)},u.prototype.siblings=function(t){return this.parent().children(t).not(this)},u.prototype.size=function(){return this.first().getBoundingClientRect()},u.prototype.slice=function(t){return t&&0!==t.length&&"string"!=typeof t&&"[object Function]"!==t.toString()?t.length?[].slice.call(t.nodes||t):[t]:[]},u.prototype.str=function(e,n){return function(t){return"function"==typeof t?t.call(this,e,n):t.toString()}},u.prototype.text=function(e){return void 0===e?this.first().textContent||"":this.each(function(t){t.textContent=e})},u.prototype.toggleClass=function(t,e){return!!e===e?this[e?"addClass":"removeClass"](t):this.eacharg(t,function(t,e){t.classList.toggle(e)})},u.prototype.trigger=function(t){var o=this.slice(arguments).slice(1);return this.eacharg(t,function(t,e){var n,r={bubbles:!0,cancelable:!0,detail:o};try{n=new window.CustomEvent(e,r)}catch(t){(n=document.createEvent("CustomEvent")).initCustomEvent(e,!0,!0,o)}t.dispatchEvent(n)})},u.prototype.unique=function(){return u(this.nodes.reduce(function(t,e){return null!=e&&!1!==e&&-1===t.indexOf(e)?t.concat(e):t},[]))},u.prototype.uri=function(t){return encodeURIComponent(t).replace(/!/g,"%21").replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\*/g,"%2A").replace(/%20/g,"+")},u.prototype.wrap=function(t){return this.map(function(e){return u(t).each(function(t){(function(t){for(;t.firstElementChild;)t=t.firstElementChild;return u(t)})(t).append(e.cloneNode(!0)),e.parentNode.replaceChild(t,e)})})},"object"==typeof module&&module.exports&&(module.exports=u,module.exports.u=u);
},{}],2:[function(require,module,exports){
const u = require("umbrellajs");

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

const average = (array) => array.reduce((a, b) => a + b) / array.length;

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
},{"umbrellajs":1}]},{},[2]);
