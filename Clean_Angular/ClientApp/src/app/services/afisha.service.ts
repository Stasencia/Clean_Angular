import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TheatricalEvent } from '../models/theatricalevent';

@Injectable({
  providedIn: 'root'
})
export class AfishaService {

    private url = "/api/afisha";

    constructor(private http: HttpClient) {
    }

    getTheatricalEvents(filter: any) {
        return this.http.get(this.url + this.AfishaQueryString(filter));
    }

    AfishaQueryString(obj: any) {
        var parts = [];
        for (var property in obj) {
            var value = obj[property];
            if (value != null && value != undefined) {
                parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
            }
        }
        return '?' + parts.join('&');
    }
}
