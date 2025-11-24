import {Component, OnInit} from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {SoutenanceService} from '../service/soutenance-service';
import {FullCalendarModule} from '@fullcalendar/angular';

@Component({
  selector: 'app-liste-soutenance-encadrant-component',
  imports: [
    FullCalendarModule
  ],
  templateUrl: './liste-soutenance-encadrant-component.html',
  styleUrl: './liste-soutenance-encadrant-component.scss'
})
export class ListeSoutenanceEncadrantComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: [],

    eventContent: function(arg) {
      // arg.event.extendedProps contient salle, jury, etc.
      return {
        html: `
        <b>${arg.event.title}</b><br/>
        ${arg.event.extendedProps["jury"]?.join(', ') || 'N/A'}<br/>
        ${arg.event.extendedProps["salle"] || 'N/A'}
      `
      };
    }
  };

  constructor(private readonly soutenanceService: SoutenanceService) {}
  ngOnInit() {
    this.soutenanceService.listeSoutenances().subscribe(data => {
      const events = data.map(s => ({
        title: s.projet_titre,          // Titre du projet
        date: s.date,                   // Date de la soutenance
        extendedProps: {
          salle: s.salle?.nom || 'N/A', // Salle
          jury: s.jury?.map((j: { specialite: any; }) => j.specialite) || [] // Liste des spécialités du jury
        }
      }));

      this.calendarOptions = {
        ...this.calendarOptions,
        events: events
      };

      console.log(this.calendarOptions);
    });

  }

}
