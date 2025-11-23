import { Component, OnInit } from '@angular/core';
import { Soutenance, SoutenanceService } from '../service/soutenance-service';
import { CreateSoutenanceComponent } from '../create/create-soutenance-component';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';

@Component({
  selector: 'app-list-soutenance',
  standalone: true,
  imports: [
    CreateSoutenanceComponent,
    FullCalendarModule,
  ],
  templateUrl: './list-soutenance-component.html',
  styleUrls: ['./list-soutenance-component.scss']
})
export class ListSoutenanceComponent implements OnInit {

  public soutenances: Soutenance[] = [];
  activeSection: string = 'listeSoutenance';
  calendarOptions!: CalendarOptions;

  constructor( private readonly soutenanceService: SoutenanceService) {}

  ngOnInit() {
    this.loadSoutenances();
  }

  setActiveSection(section: 'listeSoutenance' | 'planifier') {
    this.activeSection = section;
  }

  loadSoutenances() {
    this.soutenanceService.liste().subscribe({
      next: (data) => {
        this.soutenances = data;

        // Transformer la liste en événements FullCalendar
        this.calendarOptions = {
          plugins: [dayGridPlugin, interactionPlugin],
          initialView: 'dayGridMonth',
          initialDate: new Date(),
          selectable: true,

          // Griser visuellement les jours passés
          dayCellDidMount: (info) => {
            const today = new Date();
            today.setHours(0,0,0,0);
            if (info.date < today) {
              info.el.classList.add('fc-day-disabled');
            }
          },

          // événements
          events: this.soutenances.map(s => ({
            //title: 'Salle ' + s.salle,
            date: new Date(s.date).toISOString().substring(0, 10)
          }))
        };
      },
      error: (err) => console.error('Erreur lors du chargement', err)
    });
  }
  telechagerPDF() {
    this.soutenanceService.exportPdf().subscribe(blob => {
      const url = globalThis.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'planning_soutenances.pdf';
      a.click();
      globalThis.URL.revokeObjectURL(url);
    });
  }
}
