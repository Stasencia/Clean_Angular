import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AfishaService } from '../services/afisha.service';
import { ScheduledEvent } from '../models/scheduledevent';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct, NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-theatricalevent-details',
  templateUrl: './theatricalevent-details.component.html',
  styleUrls: ['./theatricalevent-details.component.css']
})
export class TheatricaleventDetailsComponent implements OnInit {

    scheduledevent: ScheduledEvent;
    event = {
        id: 0,
    };
    datesSelected: NgbDateStruct[] = [];
    dateSelected: NgbDateStruct;

    constructor(private dataService: AfishaService, private route: ActivatedRoute, private router: Router, private calendar: NgbCalendar) {
        route.params.subscribe(p => {
            this.event.id = +p['id'];
        }, err => {
            if (err.status == 404)
                this.router.navigate(['/afisha']);
        });
    }

    isDisabled = (date: NgbDate, current: { month: number }) => date.month !== current.month;
    isDateSelected(date: NgbDateStruct) {
        return (this.datesSelected.findIndex(f => f.day == date.day && f.month == date.month && f.year == date.year) >= 0);
    }

    onDateSelection(date: NgbDateStruct) {
        this.dateSelected = date;        
    }

    buyTicket() {
        if (!this.dateSelected)
            alert("Выберите подходящую дату.");
        else if (!(this.datesSelected.findIndex(f => f.day == this.dateSelected.day && f.month == this.dateSelected.month && f.year == this.dateSelected.year) >= 0))
            alert("Выберите одну из указанных дат. В выбранную вами дату нет представлений.");
        else
            this.router.navigate(['/afisha']);
    }

    ngOnInit() {
        this.loadTheatricalEvent(this.event.id);
    }

    loadTheatricalEvent(id: number) {
        this.dataService.getTheatricalEvent(id)
          .subscribe((data: ScheduledEvent) => {
              this.scheduledevent = data;
              if (data.dates) {

                  this.datesSelected = data.dates.map(function (x) {
                      x = new Date(x);
                      return { year: x.getFullYear(), month: x.getMonth() + 1, day: x.getDate() }
                  });
              }
          });
    }

}
