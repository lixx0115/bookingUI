export class Event {
    id?: string
    start: Date;
    end?: Date;
    title: string;
    party: Party[] = new Array<Party>();
    allDay?: boolean;
    isCancel?: boolean;

    public static isOverlap(thisEvent: Event, otherEvent: Event) {
        if (thisEvent.start < otherEvent.end && thisEvent.end > otherEvent.end) //new book end in range
            return true;
        else if (thisEvent.start <= otherEvent.start && thisEvent.end > otherEvent.start) // new booking start in range
            return true;
        else if (thisEvent.start >= otherEvent.start && thisEvent.end < otherEvent.end) // new booking covers 
            return true;
        else if (thisEvent.start <= otherEvent.start && thisEvent.end > otherEvent.end) //new booking contain within 
            return true;
        return false;
    }

    public static isOverlapWithEvents(thisEvent: Event, otherEvents: Event[]) {
        console.log(thisEvent, otherEvents)
        if (thisEvent === null || otherEvents == null || otherEvents.length === 0) {
            return false;
        }


        for (let otherEvent of otherEvents) {
            if (Event.isOverlap(thisEvent, otherEvent)) {
                return true;
            }
        }

        return false;
    }
}
export class Party {
    id: string;
    name: string;
    isProvider: boolean;
}