import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, filter } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ToasterService {
    subject: BehaviorSubject<any> = new BehaviorSubject(null);;
    toast$: Observable<any>;

    constructor() {
        this.toast$ = this.subject.asObservable()
            .pipe(filter(toast => toast !== null));
    }

    show(type: string, title?: string, body?: string, delay?: number) {
        this.subject.next({ type, title, body, delay });
    }
}