import { Event } from './event'
export class User {
    constructor() {

    }
    userid: string;
    userName: string;
    profileImageUrl: string;
    cellNumber: string;
    email: string;
    isConsumer: boolean;
    isProvider: boolean;
    provider: {
        tags: string[],
        description: string,
        website: string,
        hoursAvailable: {
            monday: { open: boolean, start: number, end: number },
            tuesday: { open: boolean, start: number, end: number },
            wednsday: { open: boolean, start: number, end: number },
            thursday: { open: boolean, start: number, end: number },
            friday: { open: boolean, start: number, end: number },
            saturday: { open: boolean, start: number, end: number },
            sunday: { open: boolean, start: number, end: number }
        }
    }

    public static dayStrings: string[] = ["sunday", "monday", "tuesday", "wednsday", "thursday", "friday", "saturday", "saturday"];

    public static dateToDayString(date: Date): any {
        let dayNumber = date.getDay();
        return User.dayStrings[dayNumber];

    }

    public static IsAllowed(event: Event, user: User): boolean {
        let start = event.start;
        let end = event.end;
        let dayString = User.dateToDayString(start);
        let hoursAvailable = user.provider.hoursAvailable[dayString];

        if (!hoursAvailable.open) {
            return false;
        }
        let startHour = start.getHours();
        let endHour = end.getHours();

        if (hoursAvailable.start <= startHour && hoursAvailable.end > endHour) {
            return true;
        }
        else {
            return false;
        }
    }
}