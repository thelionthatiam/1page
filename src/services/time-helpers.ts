export default class TimeHelpers {
    date: Date;
    day: number;
    hour: number;
    min: number;

    constructor() {
        this.date = new Date();
        this.day = this.date.getDay();
        this.hour = this.date.getHours();
        this.min = this.date.getMinutes();
    }

    todayOrTomorrow(time:V.MilitaryTime):string {
        let timeArr = time.split(':') // Question out
        let timeH = parseInt(timeArr[0])
        let timeM = parseInt(timeArr[1])

        if (timeH < this.hour) {
            return "tomorrow";
        } else if (timeH > this.hour) {
            return "today";
        } else if (timeH === this.hour) {
            if (timeM < this.min) {
                return "tomorrow";
            } else if (timeM > this.min) {
                return "today";
            } else {
                return "tomorrow";
            }
        } else {
            throw new Error('Something was unaccounted for when determining the next time this alarm goes off!')
        }
    }

    static isMilitaryTime(time) {
        return new Promise(
            (resolve, reject) => {
                let militaryRe = /^([01]\d|2[0-3]):?([0-5]\d):?([0-5]\d)?$/;
                if (militaryRe.test(time)) {
                    resolve(time)
                } else {
                    reject('Please use military time. You don\'t need seconds or colons if you don\'t want, but you at least need HHMM.')
                }
            }
        )
    }

    static parseStringTime(time) {
        return time.split(':').reduce((acc, time) => (60 * acc) + +time)
    }
    static orderTimes(a, b) { // updated but haven't tested parse string time
        const timeA = TimeHelpers.parseStringTime(a.time);
        const timeB = TimeHelpers.parseStringTime(b.time);

        let comp = 0;
        if (timeA > timeB) {
            comp = 1;
        } else if (timeB > timeA) {
            comp = -1;
        }
        return comp;
    }

    // WHAT DAY OF THE WEEK IS COMING NEXT? CURRENTLY NOT IN USE, BUT MAY BE USEFUL LATER
    dayOfTheWeek(time) {
        let timeArr = time.split(':')
        let timeH = parseInt(timeArr[0])
        let timeM = parseInt(timeArr[1])

        let dayNum;

        if (timeH < this.hour) {
            dayNum = this.day + 1
        } else if (timeH > this.hour) {
            dayNum = this.day
        } else if (timeH === this.hour) {
            if (timeM < this.min) {
                dayNum = this.day + 1
            } else if (timeM > this.min) {
                dayNum = this.day
            } else {
                dayNum = this.day + 1
            }
        }

        return TimeHelpers.dayNumToString(dayNum)
    }

    static dayNumToString(dayNum) {
        switch (dayNum) {
            case 0:
                day = "Sunday";
                break;
            case 1:
                day = "Monday";
                break;
            case 2:
                day = "Tuesday";
                break;
            case 3:
                day = "Wednesday";
                break;
            case 4:
                day = "Thursday";
                break;
            case 5:
                day = "Friday";
                break;
            case 6:
                day = "Saturday";
            default:
                day = "not a day in the western calendar"
        }
        return day;
    }
}