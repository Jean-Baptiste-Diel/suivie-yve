import { Injectable } from '@angular/core';
export interface Etudiant{
  id?: number;
  nom: string;
}
@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

}
