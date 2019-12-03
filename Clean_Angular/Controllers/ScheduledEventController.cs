using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ANGULARRRR.DTOs;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ANGULARRRR.Controllers
{
    [Route("api/admin-afisha/schedule")]
    [ApiController]
    public class ScheduledEventController : ControllerBase
    {
        ApplicationDbContext db;
        public ScheduledEventController(ApplicationDbContext context)
        {
            db = context;
        }
        [HttpGet("{id}")]
        public ScheduledEventDTO Get(int id)
        {
            TheatricalEvent theatricalEvent = db.TheatricalEvents.Find(id);

            ScheduledEventDTO scheduledEventDto = new ScheduledEventDTO()
            {
                /*TheatricalEventId = theatricalEvent.Id,
                Name = theatricalEvent.Name,
                Image = theatricalEvent.Image*/
                TheatricalEvent = theatricalEvent
            };

            IQueryable<ScheduledEvent> scheduledEvents = db.ScheduledEvents.Where(x => x.TheatricalEventId == id);

            if (scheduledEvents.Any())
            {
                scheduledEventDto.Dates = scheduledEvents.Select(x => x.Date).ToArray();
            }
            
            return scheduledEventDto;
        }

        [HttpPost]
        public IActionResult Post([FromBody]ScheduledEventDTO scheduledEventDTO)
        {
            if (ModelState.IsValid)
            {
                var scheduledEvents = db.ScheduledEvents
                    .Where(x => x.TheatricalEventId == scheduledEventDTO.TheatricalEvent.Id);
                var old_scheduledEvents = scheduledEvents
                                .Where(x => !scheduledEventDTO.Dates.Contains(x.Date));
                var new_scheduledEvents = scheduledEventDTO.Dates.Except(scheduledEvents.Select(x => x.Date));

                if (old_scheduledEvents.Any())
                {
                    db.ScheduledEvents.RemoveRange(old_scheduledEvents);
                }

                if (new_scheduledEvents.Any())
                {
                    foreach (DateTime d in new_scheduledEvents)
                    {
                        ScheduledEvent scheduledEvent = new ScheduledEvent()
                        {
                            TheatricalEventId = scheduledEventDTO.TheatricalEvent.Id,
                            Date = d
                        };
                        db.ScheduledEvents.Add(scheduledEvent);
                    }
                }
                db.SaveChanges();
                return Ok(scheduledEventDTO);
            }
            return BadRequest(ModelState);
        }
    }
}