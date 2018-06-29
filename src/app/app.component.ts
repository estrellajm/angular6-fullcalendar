import { Component, OnInit } from '@angular/core';
declare const FullCalendar: any;
declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  ngOnInit() {
    this.calendar();
    this.schedule();
  }

  calendar() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      now: '2018-04-07',
      editable: true,
      aspectRatio: 1.8,
      scrollTime: '00:00',
      header: {
        left: 'promptResource today prev,next',
        center: 'title',
        right: 'timelineDay,timelineThreeDays,agendaWeek,month'
      },
      customButtons: {
        promptResource: {
          text: '+ room',
          click: function() {
            var title = prompt('Room name');
            if (title) {
              calendar.addResource({ title: title }, true); // true = scroll to new resource
            }
          }
        }
      },
      defaultView: 'timelineDay',
      views: {
        timelineThreeDays: {
          type: 'timeline',
          duration: { days: 3 }
        }
      },
      resourceLabelText: 'Rooms',
      resourceRender: function(resource, tr) {
        tr.addEventListener('click', function() {
          if (confirm('Are you sure you want to delete ' + resource.title + '?')) {
            calendar.removeResource(resource);
          }
        });
      },
      height: 'auto',
      resources: [
        { id: 'a', title: 'Auditorium A' },
        { id: 'b', title: 'Auditorium B', eventColor: 'green' },
        { id: 'c', title: 'Auditorium C', eventColor: 'orange' },
        { id: 'd', title: 'Auditorium D', children: [
          { id: 'd1', title: 'Room D1' },
          { id: 'd2', title: 'Room D2' }
        ] },
        { id: 'e', title: 'Auditorium E' },
        { id: 'f', title: 'Auditorium F', eventColor: 'red' },
        { id: 'g', title: 'Auditorium G' },
        { id: 'h', title: 'Auditorium H' },
        { id: 'i', title: 'Auditorium I' },
        { id: 'j', title: 'Auditorium J' },
        { id: 'k', title: 'Auditorium K' },
        { id: 'l', title: 'Auditorium L' },
        { id: 'm', title: 'Auditorium M' }
      ],
      events: [
        { id: '1', resourceId: 'b', start: '2018-04-07T02:00:00', end: '2018-04-07T07:00:00', title: 'event 1' },
        { id: '2', resourceId: 'c', start: '2018-04-07T05:00:00', end: '2018-04-07T22:00:00', title: 'event 2' },
        { id: '3', resourceId: 'd', start: '2018-04-06', end: '2018-04-08', title: 'event 3' },
        { id: '4', resourceId: 'e', start: '2018-04-07T03:00:00', end: '2018-04-07T08:00:00', title: 'event 4' },
        { id: '5', resourceId: 'f', start: '2018-04-07T00:30:00', end: '2018-04-07T02:30:00', title: 'event 5' }
      ]
    });
    calendar.render();
  }
  schedule() {
    var scheduleEl = document.getElementById('schedule');
    var schedule = new FullCalendar.Calendar(scheduleEl, {
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate: '2018-04-12',
      navLinks: true, // can click day/week names to navigate views
      selectable: true,
      selectHelper: true,
      select: function(start, end) {
        var title = prompt('Event Title:');
        var eventData;
        if (title) {
          eventData = {
            title: title,
            start: start,
            end: end
          };
          $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
        }
        $('#calendar').fullCalendar('unselect');
      },
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: [
        {
          title: 'All Day Event',
          start: '2018-04-01'
        },
        {
          title: 'Long Event',
          start: '2018-04-07',
          end: '2018-04-10'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2018-04-09T16:00:00'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2018-04-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2018-04-11',
          end: '2018-04-13'
        },
        {
          title: 'Meeting',
          start: '2018-04-12T10:30:00',
          end: '2018-04-12T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2018-04-12T12:00:00'
        },
        {
          title: 'Meeting',
          start: '2018-04-12T14:30:00'
        },
        {
          title: 'Happy Hour',
          start: '2018-04-12T17:30:00'
        },
        {
          title: 'Dinner',
          start: '2018-04-12T20:00:00'
        },
        {
          title: 'Birthday Party',
          start: '2018-04-13T07:00:00'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2018-04-28'
        }
      ]
    });
    schedule.render();
  }
}
