export default function getNextLunchtime(hours, minutes) {
    const lunchtime = new Date();
    lunchtime.setHours(hours);
    lunchtime.setMinutes(minutes);
    lunchtime.setSeconds(0);
    lunchtime.setMilliseconds(0);
    // if we've already had lunch today, start planning
    // tomorrow's lunch
    if (lunchtime.valueOf() < Date.now())
        lunchtime.setDate(lunchtime.getDate() + 1);
    return lunchtime;
}
//# sourceMappingURL=lunchtime.js.map