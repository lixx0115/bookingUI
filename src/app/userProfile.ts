export class UserProfile {
    id: string
    name: string;
    cellNumber: string;
    email: string;
    isConsumer: boolean;
    isProvider: boolean;
    provider: {
        tags: string[],
        description: string,
        website: string,
        hoursAvailable: {
            monday: { blocked: boolean, start: number, end: number },
            tusday: { blocked: boolean, start: number, end: number },
            wednsday: { blocked: boolean, start: number, end: number },
            thursday: { blocked: boolean, start: number, end: number },
            friday: { blocked: boolean, start: number, end: number },
            saturday: { blocked: boolean, start: number, end: number },
            sunday: { blocked: boolean, start: number, end: number }
        }
    }
}