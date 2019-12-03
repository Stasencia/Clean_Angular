import { Component, OnInit } from '@angular/core';
import { ScheduledEvent } from '../models/scheduledevent';
import { ScheduleService } from '../services/schedule.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-afisha-schedule',
  templateUrl: './admin-afisha-schedule.component.html',
  styleUrls: ['./admin-afisha-schedule.component.css']
})
export class AdminAfishaScheduleComponent implements OnInit {

    event = {
        id: 0,
    };
    scheduledevent: ScheduledEvent;
    datesSelected: NgbDateStruct[] = [];

    constructor(private route: ActivatedRoute, private router: Router, private dataService: ScheduleService) {
        route.params.subscribe(p => {
            this.event.id = +p['id'];
        }, err => {
            if (err.status == 404)
                this.router.navigate(['/admin-afisha']);
        });
    }

    ngOnInit() {
        this.getScheduledEvent(this.event.id);
    }

    change(value: NgbDateStruct[]) {
        this.datesSelected = value;
    }

    getScheduledEvent(id: number) {
        this.dataService.getScheduledEvent(id)
            .subscribe((data: ScheduledEvent) => {
                this.scheduledevent = data;
                if (data.dates) {
                    
                    this.datesSelected = data.dates.map(function (x) {
                        x = new Date(x);
                        return { year: x.getFullYear(), month: x.getMonth() + 1, day: x.getDate() }
                    });  
                }
                /*for (var i = 0; i < data.dates.length; i++) {
                    var x = new Date(data.dates[i]);
                    var y = x.getUTCFullYear();
                    this.datesSelected.push({ year: x.getFullYear(), month: x.getMonth() + 1, day: x.getDate() });
                }*/
            });
    }
    saveDates() {
        this.scheduledevent.dates = this.datesSelected.map(function (x) {
            var d = new Date(x.year, x.month - 1, x.day);
            return d;
        });
        this.dataService.createScheduledEvent(this.scheduledevent)
            .subscribe((data: ScheduledEvent) => this.getScheduledEvent(data.id));;
    }
}
