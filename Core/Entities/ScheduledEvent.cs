using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities
{
    public class ScheduledEvent
    {
        public int Id { get; set; }
        public int TheatricalEventId { get; set; }
        public TheatricalEvent TheatricalEvent { get; set; }
        public DateTime Date { get; set; }
        public ICollection<Ticket> Tickets { get; set; }
    }
}
