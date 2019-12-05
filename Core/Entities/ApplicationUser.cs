using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public ICollection<Ticket> Tickets { get; set; }
    }
}
