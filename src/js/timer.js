function AdjustingInterval(workFunc, interval, errorFunc) {
    var that = this;
    var expected, timeout;
    this.interval = interval;

    this.start = function() {
        expected = Date.now() + this.interval;
        timeout = setTimeout(step, this.interval);
    }

    this.stop = function() {
        clearTimeout(timeout);
    }

    function step() {
        var drift = Date.now() - expected;
        if (drift > that.interval) {
            // You could have some default stuff here too...
            if (errorFunc) errorFunc();
        }
        workFunc();
        expected += that.interval;
        timeout = setTimeout(step, Math.max(0, that.interval-drift));
    }
}

const msInSec = 1000;
const msInMin = msInSec * 60;
const msInHour = msInMin * 60;

const msInTenth = msInSec / 10;
const msInHundredth = msInTenth / 10;

function parseTime(ms) {
    let time = ms;

    const hours = Math.floor(time / msInHour);
    time -= hours * msInHour;

    const minutes = Math.floor(time / msInMin);
    time -= minutes * msInMin;

    const seconds = Math.floor(time / msInSec);
    time -= seconds * msInSec;

    const tenths = Math.floor(time / msInTenth);
    time -= tenths * msInTenth;

    const hundredths = Math.floor(time / msInHundredth);
    time -= hundredths * msInHundredth;

    return {
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        tenths: tenths,
        hundredths: hundredths
    }
}