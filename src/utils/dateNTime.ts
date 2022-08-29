import type { Moment } from 'moment';
import moment from 'moment';

export function getDate(date: Moment | string, format?: string): Moment {
    if (typeof date === 'string') {
        return moment(date, format);
    }
    return date;
}

type DateRelative = 'past' | 'future' | 'current';

export function checkDateRelativity(
    startDate: Moment | string,
    endDate: Moment | string,
    date: Moment | string = moment(),
    format?: string
): DateRelative {
    const start = getDate(startDate, format);
    const end = getDate(endDate, format);
    const dateToCheck = getDate(date, format);

    console.log(startDate, endDate);
    console.log(
        dateToCheck.isBefore(start),
        dateToCheck.isBetween(start, end),
        dateToCheck.isAfter(end)
    );

    if (dateToCheck.isBetween(start, end)) {
        return 'current';
    }
    if (dateToCheck.isBefore(start)) {
        return 'past';
    }
    return 'future';
}
