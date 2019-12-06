import { Component, OnInit } from '@angular/core';
import { TicketPurchaseService } from '../services/ticket-purchase.service';
import { Ticket } from '../models/ticket';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ticket-purchase',
  templateUrl: './ticket-purchase.component.html',
    styleUrls: ['./ticket-purchase.component.css'],
    providers: [TicketPurchaseService, DatePipe]
})
export class TicketPurchaseComponent implements OnInit {

    ticket: Ticket;
    event = {
        id: 0,
        date: new Date()
    };
    seats = {
        row: [1,2,3],
        place: [1,2,3,4,5]
    }
    chosenSeats = {
        row: [],
        place: []
    }

    constructor(private dataService: TicketPurchaseService, private route: ActivatedRoute,
        private router: Router) { 
        route.params.subscribe(p => {
            this.event.id = +p['id'];
        }, err => {
            if (err.status == 404)
                this.router.navigate(['/afisha', this.event.id]);
        })
        route.queryParams.subscribe(p => {
            this.event.date = p['date'];
        });
    }

    ngOnInit() {
        this.loadTicket(this.event.id, this.event.date);
    }

    seatClicked(row: number, place: number) {
        if (this.chosenSeats.row.indexOf(row) < 0 || this.chosenSeats.place.indexOf(place) < 0) {
            this.chosenSeats.row.push(row);
            this.chosenSeats.place.push(place);
        }
    }

    loadTicket(id: number, date: any) {
        this.dataService.getTicket(id, date)
            .subscribe((data: Ticket) => {
                this.ticket = data;
            });
    }
}
