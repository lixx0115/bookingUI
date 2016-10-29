export class Event {
    start: Date;
    end?: Date;
    title: string;
    party: Party[] = new Array<Party>();
    allDay?: boolean;
}
export class Party {
    id: string;
    name: string;
    isProvider: boolean;
}