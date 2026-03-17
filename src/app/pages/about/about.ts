import { CommonModule } from '@angular/common';
import { Component, Host, HostListener } from '@angular/core';


@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {

  syllabusOpen = false;
  modalCertificado = false;
  certificadoActivo = '';

  toggleSyllabus() {
    this.syllabusOpen = !this.syllabusOpen;
  }


  abrirCertificado(ruta : string) {
    this.certificadoActivo = ruta;
    this.modalCertificado = true;
  }

  cerrarCertificado() {
    this.modalCertificado = false;
    this.certificadoActivo = '';
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.cerrarCertificado();
  }

}
