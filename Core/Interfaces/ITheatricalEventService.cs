using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Interfaces
{
    interface ITheatricalEventService
    {
        IEnumerable<TheatricalEvent> GetTheatricalEvents();
        TheatricalEvent GetTheatricalEvent(int id);

    }
}
