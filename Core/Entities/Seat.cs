using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities
{
    public class Seat
    {
        public int Id { get; set; }
        public int Row { get; set; }
        public int Place { get; set; }
        public ICollection<TicketSeat> TicketSeats { get; set; }
    }
}
