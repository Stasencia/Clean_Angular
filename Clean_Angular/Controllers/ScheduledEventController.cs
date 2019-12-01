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
                TheatricalEventId = theatricalEvent.Id,
                Name = theatricalEvent.Name,
                Image = theatricalEvent.Image
            };

            IQueryable<ScheduledEvent> scheduledEvents = db.ScheduledEvents.Where(x => x.TheatricalEventId == id);

            if (scheduledEvents.Any())
            {
                scheduledEventDto.Dates = scheduledEvents.Select(x => x.Date).ToArray();
            }
            
            return scheduledEventDto;
        }
    }
}