using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class TheatricalEvent
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Duration { get; set; }
        public byte[] Image { get; set; }
        public List<ScheduledEvent> ScheduledEvents { get; set; }
    }
}
