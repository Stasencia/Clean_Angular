using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Filters
{
    public class MyDateFilter
    {
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }

        public DateTime[] FilterRange(List<DateTime> dates)
        {
            List<DateTime> filteredDates = dates;
            if (FromDate.HasValue && ToDate.HasValue)
            {
                filteredDates.RemoveAll(d => !(d >= FromDate.Value && d <= ToDate.Value));
            }
            return filteredDates.ToArray();
        }

        /*public bool Compare(MyDateFilter data)
        {
            if(FromDate.HasValue && ToDate.HasValue)
            {
                bool frombool = data.FromDate.Value >= FromDate.Value && data.FromDate.Value <= ToDate.Value;
                bool tobool = data.ToDate.Value <= ToDate.Value && data.ToDate.Value >= FromDate.Value;
                return frombool || tobool;
            }
            return false;
        }*/
    }
}
