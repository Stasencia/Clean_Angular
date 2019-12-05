using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities
{
    public class Ticket
    {
        public int Id { get; set; }
        public ApplicationUser User { get; set; }
        public ScheduledEvent ScheduledEvent { get; set; }

        public ICollection<TicketSeat> TicketSeats { get; set; }
    }
}
