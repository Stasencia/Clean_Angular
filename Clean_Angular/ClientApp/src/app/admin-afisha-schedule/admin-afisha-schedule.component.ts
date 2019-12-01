import { Component, OnInit } from '@angular/core';
import { ScheduledEvent } from '../models/scheduledevent';
import { ScheduleService } from '../services/schedule.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-afisha-schedule',
  templateUrl: './admin-afisha-schedule.component.html',
  styleUrls: ['./admin-afisha-schedule.component.css']
})
export class AdminAfishaScheduleComponent implements OnInit {

    scheduledevent: ScheduledEvent;

    constructor(private route: ActivatedRoute, private router: Router, private dataService: ScheduleService) {
        route.params.subscribe(p => {
            this.scheduledevent.id = +p['id'];
        }, err => {
            if (err.status == 404)
                this.router.navigate(['/admin-afisha']);
        });
    }

    ngOnInit() {
        this.getScheduledEvent(this.scheduledevent.id);
    }

    getScheduledEvent(id: number) {
        this.dataService.getScheduledEvent(id)
            .subscribe((data: ScheduledEvent) => this.scheduledevent = data);
    }

}
