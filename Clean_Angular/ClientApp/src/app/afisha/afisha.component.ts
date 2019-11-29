import { Component, OnInit } from '@angular/core';
import { AfishaService } from '../services/afisha.service';
import { TheatricalEvent } from '../models/theatricalevent';

@Component({
    selector: 'app-afisha',
    templateUrl: './afisha.component.html',
    styleUrls: ['./afisha.component.css'],
    providers: [AfishaService]
})
export class AfishaComponent implements OnInit {

    theatricalevent: TheatricalEvent;
    theatricalevents: TheatricalEvent[];
    tableMode: boolean = true;

    constructor(private dataService: AfishaService) { }

    ngOnInit() {
        this.loadTheatricalEvents();
    }

    loadTheatricalEvents() {
        this.dataService.getTheatricalEvents()
            .subscribe((data: TheatricalEvent[]) => this.theatricalevents = data);
    }

}
