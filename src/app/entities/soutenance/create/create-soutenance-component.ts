import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SoutenanceService } from '../service/soutenance-service';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

// <-- importer les types depuis service
import { CalendarOptions, DateSelectArg, DateSpanApi } from '@fullcalendar/core';

@Component({
  selector: 'app-create-soutenance',
  standalone: true,
  imports: [FullCalendarModule, ReactiveFormsModule],
  templateUrl: './create-soutenance-component.html',
  styleUrls: ['./create-soutenance-component.scss']
})
export class CreateSoutenanceComponent implements OnInit {
  soutenanceForm!: FormGroup;
  message: string | null = null;

  // typer calendarOptions pour plus de sécurité
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    initialDate: new Date(),
    selectable: true,

    // Bloquer la sélection de jours passés
    validRange: { start: new Date() },

    // Empêche de sélectionner une plage vide
    selectAllow: (span: DateSpanApi) => span.end > span.start,

    // Handler de sélection de plage
    select: this.handleDateSelect.bind(this),

    // Griser les jours passés
    dayCellDidMount: (info) => {
      const today = new Date();
      today.setHours(0,0,0,0);
      if (info.date < today) {
        info.el.classList.add('fc-day-disabled');
      }
    }
  };




  constructor(private readonly fb: FormBuilder, private readonly soutenanceService: SoutenanceService) {}

  ngOnInit(): void {
    this.soutenanceForm = this.fb.group({
      date_debut: [''],
      date_fin: ['']
    });
  }

  // handler typé avec DateSelectArg
  handleDateSelect(selectInfo: DateSelectArg) {
    const startStr = selectInfo.startStr;

    // FullCalendar renvoie end exclusif -> retirer 1 jour
    const end = new Date(selectInfo.endStr);
    end.setDate(end.getDate() - 1);
    const endStr = end.toISOString().split('T')[0];

    this.soutenanceForm.patchValue({
      date_debut: startStr,
      date_fin: endStr
    });
  }

  adjustEndDate(endStr: string): string {
    const date = new Date(endStr);
    date.setDate(date.getDate() - 1); // FullCalendar retourne la fin exclusive
    return date.toISOString().split('T')[0];
  }

  planifier() {
    const payload = {
      date_debut: this.soutenanceForm.value.date_debut,
      date_fin: this.soutenanceForm.value.date_fin
    };
    this.soutenanceService.planifier(payload).subscribe({
      next: () => this.message = 'Soutenances planifiées avec succès !',
      error: () => this.message = "Erreur lors de la planification."
    });
  }
}
