import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  mostrarModel = false;
  menuOpen = false;

  abrirModal() {
    this.mostrarModel = true;
  }

  cerrarModal() {
    this.mostrarModel = false;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  cerrarMenu() {
    this.menuOpen = false;
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.cerrarModal();
    this.cerrarMenu();
  }

}
