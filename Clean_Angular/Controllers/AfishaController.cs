using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
        public IEnumerable<TheatricalEvent> Get()
        {
            return db.TheatricalEvents.ToList();
        }

        [HttpGet("{id}")]
        public TheatricalEvent Get(int id)
        {
            TheatricalEvent theatricalEvent = db.TheatricalEvents.FirstOrDefault(x => x.Id == id);
            return theatricalEvent;
        }
    }
}