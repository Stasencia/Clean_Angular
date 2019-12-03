using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ANGULARRRR.DTOs
{
    public class ScheduledEventDTO
    {
        public int TheatricalEventId { get; set; }
        public string Name { get; set; }
        public byte[] Image { get; set; }
        public DateTime[] Dates { get; set; }
    }
}
