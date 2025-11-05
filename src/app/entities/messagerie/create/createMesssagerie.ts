import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'; // ✅ Input, Output, OnInit ajoutés
import { CommonModule } from '@angular/common'; // ✅ Pour *ngIf etc. dans le template
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms'; // ✅ Pour formulaire réactif (FormGroup, validation)

@Component({
  selector: 'app-create-messagerie',
  standalone: true,
  imports: [
    CommonModule, // ✅ Basics
    ReactiveFormsModule // ✅ Pour FormGroup et [formGroup] dans le template
  ],
  templateUrl: './createMesssagerie.html',
  styleUrls: ['./createMesssagerie.scss'] // ✅ Corrigé : pluriel et array
})
export class CreateMesssagerie implements OnInit {
  @Input() conversationId!: number; // ✅ Fix NG8002 : Reçoit l'ID du parent

  messagerieForm!: FormGroup; // ✅ Ajouté : Formulaire réactif (fixe l'erreur TS2339 sur messagerieForm)

  @Output() messageCreated = new EventEmitter<{ content: string; conversationId: number }>(); // ✅ Émet le message + ID

  constructor(private fb: FormBuilder) {} // ✅ FormBuilder pour créer le FormGroup

  ngOnInit(): void {
    // ✅ Initialise le formulaire avec validation (requis et min length 1)
    this.messagerieForm = this.fb.group({
      newMessage: ['', [Validators.required, Validators.minLength(1)]] // ✅ Champ obligatoire, au moins 1 char
    });

    // Optionnel : Log l'ID reçu pour debug
    if (this.conversationId) {
      console.log('ID de conversation reçu:', this.conversationId);
    }
  }

  sendMessage(): void {
    if (this.messagerieForm.valid && this.conversationId) { // ✅ Utilise la validation du form
      const messageContent = this.messagerieForm.get('newMessage')?.value;
      this.messageCreated.emit({
        content: messageContent || '',
        conversationId: this.conversationId
      });
      this.messagerieForm.reset(); // ✅ Reset le formulaire au lieu de newMessage seul
    } else {
      console.warn('Formulaire invalide ou pas d\'ID de conversation !');
      this.messagerieForm.markAllAsTouched(); // ✅ Force l'affichage des erreurs si besoin
    }
  }
}
