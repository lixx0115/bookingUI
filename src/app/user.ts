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
}