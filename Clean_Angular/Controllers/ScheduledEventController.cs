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
            ScheduledEvent scheduledEvent = db.ScheduledEvents.FirstOrDefault(x => x.TheatricalEventId == id);
            if(scheduledEvent == null)
            {
                scheduledEvent = new ScheduledEvent()
                {
                    TheatricalEvent = db.TheatricalEvents.Find(id)
                };

            }

            ScheduledEventDTO scheduledEventDto = new ScheduledEventDTO()
            {
                Id = scheduledEvent.Id,
                TheatricalEventId = scheduledEvent.TheatricalEventId,
                Name = scheduledEvent.TheatricalEvent.Name,
                Image = scheduledEvent.TheatricalEvent.Image
            };
            return scheduledEventDto;
        }
    }
}