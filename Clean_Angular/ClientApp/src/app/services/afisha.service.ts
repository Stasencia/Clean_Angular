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

    getTheatricalEvents() {
        return this.http.get(this.url);
    }
}
