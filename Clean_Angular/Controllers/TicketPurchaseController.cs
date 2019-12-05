using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ANGULARRRR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketPurchaseController : ControllerBase
    {
        ApplicationDbContext db;
        public TicketPurchaseController(ApplicationDbContext context)
        {
            db = context;
        }
        /*[HttpGet]
        public IEnumerable<ScheduledEventDTO> Get([FromQuery] DateTime date)
        {
            List<ScheduledEventDTO> result = new List<ScheduledEventDTO>();
            var theatricalevents = db.TheatricalEvents;

            foreach (TheatricalEvent te in theatricalevents)
            {
                ScheduledEventDTO scheduledEventDTO = new ScheduledEventDTO();
                scheduledEventDTO.TheatricalEvent = te;
                var scheduledEvents = db.ScheduledEvents.Where(x => x.TheatricalEventId == te.Id);
                scheduledEventDTO.Dates = dateFilter.FilterRange(scheduledEvents.Select(se => se.Date).ToList());
                if (scheduledEventDTO.Dates.Any())
                    result.Add(scheduledEventDTO);
            }

            return result;
        }*/
    }
}