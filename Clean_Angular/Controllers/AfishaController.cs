using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ANGULARRRR.DTOs;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ANGULARRRR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AfishaController : ControllerBase
    {
        ApplicationDbContext db;
        public AfishaController(ApplicationDbContext context)
        {
            db = context;
        }
        [HttpGet]
        public IEnumerable<ScheduledEventDTO> Get()
        {
            List<ScheduledEventDTO> result = new List<ScheduledEventDTO>();
            var theatricalevents = db.TheatricalEvents;
            foreach(TheatricalEvent te in theatricalevents)
            {
                ScheduledEventDTO scheduledEventDTO = new ScheduledEventDTO();
                scheduledEventDTO.TheatricalEvent = te;
                var scheduledEvents = db.ScheduledEvents.Where(x => x.TheatricalEventId == te.Id);
                scheduledEventDTO.Dates = scheduledEvents.Select(se => se.Date).ToArray();
                result.Add(scheduledEventDTO);
            }
            /*var scheduledevents = db.ScheduledEvents.AsEnumerable().GroupBy(x => x.TheatricalEventId);
            
            foreach(var se in scheduledevents)
            {
                ScheduledEventDTO scheduledEventDTO = new ScheduledEventDTO();
                foreach (var t in se)
                {
                    scheduledEventDTO.TheatricalEvent = t.TheatricalEvent;
                }
                scheduledEventDTO.Dates = se.Select(x => x.Date).ToArray();
                result.Add(scheduledEventDTO);
            }*/
           
            return result;
        }

        [HttpGet("{id}")]
        public TheatricalEvent Get(int id)
        {
            TheatricalEvent theatricalEvent = db.TheatricalEvents.FirstOrDefault(x => x.Id == id);
            return theatricalEvent;
        }
    }
}