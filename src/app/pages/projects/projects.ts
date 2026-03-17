import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'safe', standalone: true })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

interface Project {
  title: string;
  shortDesc: string;
  description: string;
  category: string;
  year: string;
  tags: string[];
  previewTech: string[];
  images: string[];
  currentImageIndex: number;
  languages: string[];
  frameworks: string[];
  tools: string[];
  videoUrl?: string;
  webUrl?: string
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, SafePipe],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects implements OnDestroy {

  selectedProject: Project | null = null;
  videoOpen = false;
  currentVideoUrl: string | null = null;
  private slideshowIntervals: ReturnType<typeof setInterval>[] = [];

  projects: Project[] = [
    {
      title: 'Página Web Corporativa — EJECUTA CONSTRUCCIÓN S.A.C.',
      shortDesc: 'Sitio web corporativo enfocado en servicios de Instalaciones Eléctricas, Sanitarias, Comunicaciones y Contraincendios, con diseño moderno y formulario de contacto funcional.',
      description: 'Desarrollo de sitio web corporativo para la empresa, orientado en sus servicios de instalaciones Eléctricas, Sanitarias, Comunicaciones y Contraincendios. El proyecto incluyó diseño de interfaz moderna, animaciones visuales, estructura clara según la marca y formulario de contacto funcional conectado a servicios externos.',
      category: 'Web App · Ingeniería',
      year: '2026',
      tags: ['Web App', 'FRONT END'],
      previewTech: ['React', 'Vite', 'EmailJS'],
      images: [
        'assets/images/vistaEjecutaConstruccion/imagen01.png',
        'assets/images/vistaEjecutaConstruccion/imagen02.png',
        'assets/images/vistaEjecutaConstruccion/imagen03.png',
        'assets/images/vistaEjecutaConstruccion/imagen04.png'
      ],
      currentImageIndex: 0,
      languages: ['HTML5', 'CSS3', 'JavaScript', 'JSX'],
      frameworks: ['React', 'Vite'],
      tools: ['EmailJS', 'Supabase', 'GitHub Actions', 'Figma', 'Visual Studio Code'],
      videoUrl: 'assets/video/proyectoEjecuta.mp4',
      webUrl: 'https://joecueva.github.io/Ejecuta/'
    },
    {
      title: 'Sistema de Gestión de Biblioteca — Arquitectura de Microservicios',
      shortDesc: 'Sistema de gestión de biblioteca con panel de administrador y vista de trabajadores, orientado a la administración de libros, usuarios y control de préstamos, con una interfaz bien organizada.',
      description: 'Desarrollo de plataforma digital enfocado en la administracion de libros, usuarios y prestamos. El sistema cuenta con un control de roles mediantes las vistas Admin y Trabajador, permitiendo organizar el catálogo bibliográfico, endpoints mediante postman y mejorar el control de información de manera eficiente',
      category: 'App Web · Microservicios',
      year: '2026',
      tags: [
        'API REST', 'FULL STACK'
      ],
      previewTech: ['Spring Boot', 'Angular', 'Docker', 'MySQL'],
      images: [
        'assets/images/vistaBibliotecaMicroservice/imagen1.png',
        'assets/images/vistaBibliotecaMicroservice/imagen2.png',
        'assets/images/vistaBibliotecaMicroservice/imagen3.png',
        'assets/images/vistaBibliotecaMicroservice/imagen4.png',
        'assets/images/vistaBibliotecaMicroservice/imagen5.png',
        'assets/images/vistaBibliotecaMicroservice/imagen6.png',
        'assets/images/vistaBibliotecaMicroservice/imagen7.png',
        'assets/images/vistaBibliotecaMicroservice/imagen8.png',
        'assets/images/vistaBibliotecaMicroservice/imagen9.png',
        'assets/images/vistaBibliotecaMicroservice/imagen10.png',
        'assets/images/vistaBibliotecaMicroservice/imagen11.png',
        'assets/images/vistaBibliotecaMicroservice/imagen12.png',
      ],
      currentImageIndex: 0,
      languages: ['Java', 'TypeScript', 'MYSQL'],
      frameworks: ['Spring Boot', 'Spring Cloud', 'Angular'],
      tools: ['Docker', 'Docker Compose', 'Eureka Server', 'Spring Cloud Config', 'API Gateway', 'Prometheus', 'Grafana', 'MySQL', 'JasperReports', 'Postman'],
      videoUrl: 'assets/video/proyectoSistemaGestionBiblio.mp4'
    },
    {
      title: 'OpenLibrary — Biblioteca Virtual y Gestión de Libros',
      shortDesc: 'Aplicación móvil y portal web administrativo que permite consultar, descargar y gestionar libros digitales mediante un catálogo organizado por categorías.',
      description: 'Desarrollo de una aplicación móvil Android orientada a la gestión de una biblioteca virtual. El sistema permite consultar el catálogo de libros, visualizar detalles y organizar la información bibliográfica mediante una interfaz intuitiva. La aplicación fue desarrollada con Kotlin en Android Studio, utilizando Android SDK para la estructura de la app, SQLite para almacenamiento local de datos y Firebase para la gestión de logueo. El proyecto busca mejorar el acceso y organización de los recursos bibliográficos desde dispositivos móviles.',
      category: 'Mobile App · Biblioteca Digital',
      year: '2025',
      tags: ['Mobile App', 'Biblioteca Digital'],
      previewTech: ['Kotlin', 'Android', 'Firebase', 'SQLite'],
      images: ['assets/images/vistaBibliotecaMobile/Imagen01.png', 'assets/images/vistaBibliotecaMobile/imagen02.png', 'assets/images/vistaBibliotecaMobile/imagen03.png', '/images/vistaBibliotecaMobile/imagen04.png'],
      currentImageIndex: 0,
      languages: ['Kotlin', 'SQL'],
      frameworks: ['Android SDK'],
      tools: ['Android Studio', 'Firebase', 'SQLite', 'Git'
      ],

      videoUrl: 'https://www.youtube.com/embed/...',
      webUrl: './assets/files/Diseño y Portal Web.pdf'
    }
  ];

  constructor() {
    this.startSlideshows();
  }

  startSlideshows(): void {
    this.projects.forEach((project, i) => {
      if (project.images.length > 1) {
        const interval = setInterval(() => {
          project.currentImageIndex = (project.currentImageIndex + 1) % project.images.length;
        }, 3000);
        this.slideshowIntervals.push(interval);
      }
    });
  }

  openModal(project: Project): void {
    this.selectedProject = project;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.selectedProject = null;
    if (!this.videoOpen) {
      document.body.style.overflow = '';
    }
  }

  openVideo(project: Project): void {
    if (project.videoUrl) {
      this.currentVideoUrl = project.videoUrl;
      this.videoOpen = true;
    }
  }

  closeVideo(): void {
    this.videoOpen = false;
    this.currentVideoUrl = null;
  }

  isLocalVideo(url: string): boolean {
    return url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg') || url.startsWith('/video/') || url.startsWith('/images/');
  }

  ngOnDestroy(): void {
    this.slideshowIntervals.forEach(clearInterval);
    document.body.style.overflow = '';
  }
}