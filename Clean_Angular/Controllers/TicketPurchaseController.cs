using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ANGULARRRR.Controllers
{
    [Route("api/ticket-purchase")]
    [ApiController]
    public class TicketPurchaseController : ControllerBase
    {
        ApplicationDbContext db;
        IHttpContextAccessor _httpContextAccessor;
        UserManager<ApplicationUser> _userManager;
        public TicketPurchaseController(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor,
            UserManager<ApplicationUser> userManager)
        {
            db = context;
            _httpContextAccessor = httpContextAccessor;
            _userManager = userManager;
        }
        [HttpGet("{id}")]
        public async Task<Ticket> GetAsync(int id, [FromQuery] DateTime date)
        {
            Ticket ticket = new Ticket()
            {
                User = await _userManager.FindByIdAsync(_httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value),
                //ScheduledEvent = db.ScheduledEvents.FirstOrDefault(x => x.TheatricalEventId == id && x.Date == date)
            };
            /*List<ScheduledEventDTO> result = new List<ScheduledEventDTO>();
            var theatricalevents = db.TheatricalEvents;

            foreach (TheatricalEvent te in theatricalevents)
            {
                ScheduledEventDTO scheduledEventDTO = new ScheduledEventDTO();
                scheduledEventDTO.TheatricalEvent = te;
                var scheduledEvents = db.ScheduledEvents.Where(x => x.TheatricalEventId == te.Id);
                scheduledEventDTO.Dates = dateFilter.FilterRange(scheduledEvents.Select(se => se.Date).ToList());
                if (scheduledEventDTO.Dates.Any())
                    result.Add(scheduledEventDTO);
            }*/

            return ticket;
        }
    }
}