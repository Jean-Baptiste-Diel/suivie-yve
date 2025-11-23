import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-navigation',
  imports: [],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss'
})
export class Navigation {
  @Input() activeSection: string = 'soutenance';
  @Output() activeSectionChange = new EventEmitter<string>();

  setActiveSection(section: string) {
    this.activeSection = section;
    this.activeSectionChange.emit(section);
  }
}
