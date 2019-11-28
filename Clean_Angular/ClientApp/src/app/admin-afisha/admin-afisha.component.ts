import { Component, OnInit } from '@angular/core';
import { AdminAfishaService } from '../services/admin-afisha.service';
import { TheatricalEvent } from '../models/theatricalevent';

@Component({
    selector: 'app-admin-afisha',
    templateUrl: './admin-afisha.component.html',
    styleUrls: ['./admin-afisha.component.css'],
    providers: [AdminAfishaService]
})
export class AdminAfishaComponent implements OnInit {

    theatricalevent: TheatricalEvent;
    theatricalevents: TheatricalEvent[];
    tableMode: boolean = true;

    constructor(private dataService: AdminAfishaService) { }

    ngOnInit() {
        this.loadTheatricalEvents();
    }

    changeListener($event): void {
        this.readThis($event.target);
    }

    readThis(inputValue: any): void {
        var file: File = inputValue.files[0];
        var myReader: FileReader = new FileReader();

        myReader.onloadend = (e) => {
            if (myReader.result === 'string')
                this.theatricalevent.image = myReader.result;
            else
                this.theatricalevent.image = myReader.result.toString();
        }
        myReader.readAsDataURL(file);
    }

    loadTheatricalEvents() {
        this.dataService.getTheatricalEvents()
            .subscribe((data: TheatricalEvent[]) => this.theatricalevents = data);
    }
    save() {
        if (this.theatricalevent.id == null) {
            this.dataService.createTheatricalEvent(this.theatricalevent)
                .subscribe((data: TheatricalEvent) => this.theatricalevents.push(data));
        } else {
            this.dataService.updateTheatricalEvent(this.theatricalevent)
                .subscribe(data => this.loadTheatricalEvents());
        }
        this.cancel();
    }
    editTheatricalEvent(te: TheatricalEvent) {
        this.theatricalevent = te;
    }
    cancel() {
        this.theatricalevent = null;
        this.tableMode = true;
    }
    delete(te: TheatricalEvent) {
        this.dataService.deleteTheatricalEvent(te.id)
            .subscribe(data => this.loadTheatricalEvents());
    }
    add() {
        this.cancel();
        this.tableMode = false;
    }

}
