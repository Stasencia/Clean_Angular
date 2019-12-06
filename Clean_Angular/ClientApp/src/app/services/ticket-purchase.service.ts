import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketPurchaseService {

    private url = "/api/ticket-purchase";

    constructor(private http: HttpClient) { }

    getTicket(id: number, date:any) {
        return this.http.get(this.url + '/' + id + '?date=' + date);
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
