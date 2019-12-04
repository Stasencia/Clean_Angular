﻿using Core.Entities;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {

        public DbSet<TheatricalEvent> TheatricalEvents { get; set; }
        public DbSet<ScheduledEvent> ScheduledEvents { get; set; }
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ScheduledEvent>()
                .HasOne<TheatricalEvent>(e => e.TheatricalEvent)
                .WithMany(c => c.ScheduledEvents)
                .HasForeignKey(e => e.TheatricalEventId);
        }
    }
}
