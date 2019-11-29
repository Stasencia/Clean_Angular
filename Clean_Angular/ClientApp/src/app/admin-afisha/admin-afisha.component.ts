import { Component, OnInit } from '@angular/core';
import { AdminAfishaService } from '../services/admin-afisha.service';
import { TheatricalEvent } from '../models/theatricalevent';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';

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

    constructor(private dataService: AdminAfishaService,
        private ng2ImgMax: Ng2ImgMaxService,
        public sanitizer: DomSanitizer
    ) { }

    ngOnInit() {
        this.loadTheatricalEvents();
    }

    changeListener($event): void {
        this.readThis($event.target);
    }

    readThis(inputValue: any): void {
        var file: File = inputValue.files[0];
        var resizedimage: File = null;

        this.ng2ImgMax.resizeImage(file, 200, 200).subscribe(
            result => {
                resizedimage = new File([result], result.name);
                this.getImagePreview(resizedimage);
            },
            error => {
                console.log('image resizing failed', error);
            }
        );
    }

    getImagePreview(file: File) {
        const reader: FileReader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (reader.result === 'string')
                this.theatricalevent.image = reader.result;
            else
                this.theatricalevent.image = reader.result.toString();
        };
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
