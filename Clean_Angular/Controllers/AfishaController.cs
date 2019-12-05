using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ANGULARRRR.DTOs;
using Core.Entities;
using Core.Filters;
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
        public IEnumerable<ScheduledEventDTO> Get([FromQuery] MyDateFilter dateFilter)
        {
            List<ScheduledEventDTO> result = new List<ScheduledEventDTO>();
            var theatricalevents = db.TheatricalEvents;
            
            foreach(TheatricalEvent te in theatricalevents)
            {
                ScheduledEventDTO scheduledEventDTO = new ScheduledEventDTO();
                scheduledEventDTO.TheatricalEvent = te;
                var scheduledEvents = db.ScheduledEvents.Where(x => x.TheatricalEventId == te.Id);
                scheduledEventDTO.Dates = dateFilter.FilterRange(scheduledEvents.Select(se => se.Date).ToList());
                if(scheduledEventDTO.Dates.Any())
                    result.Add(scheduledEventDTO);
            }

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