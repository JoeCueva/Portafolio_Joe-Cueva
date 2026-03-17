import {
  Component, OnDestroy, OnInit,
  ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA,
  Inject, PLATFORM_ID
} from '@angular/core';
import { About } from "../about/about";
import { Skills } from "../skills/skills";
import { isPlatformBrowser } from '@angular/common';
import { Projects } from "../projects/projects";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [About, Skills, Projects],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {

  phrases: string[] = [
    'Desarrollador Web FullStack',
    'Arquitecto de soluciones web',
    'Apasionado por el código',
    'Construyo ideas en realidad',
  ];

  displayedText: string = '';
  phraseIndex: number = 0;
  charIndex: number = 0;

  typingSpeed: number = 80;
  deletingSpeed: number = 40;
  delayBetweenPhrases: number = 1200;

  private typingTimeout: any;

  robotVisible = false;
  private observer!: IntersectionObserver;

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('@splinetool/viewer');
      this.initRobotObserver();
    }
    this.typeEffect();
  }

  initRobotObserver(): void {
    const target = document.querySelector('.hero-section-spline-robot-container');
    if (!target) return;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.robotVisible = true;
          this.cdr.detectChanges();
          this.observer.disconnect();
        }
      });
    }, { threshold: 0.1 });

    this.observer.observe(target);
  }

  typeEffect(): void {
    const currentPhrase = this.phrases[this.phraseIndex];

    if (this.charIndex < currentPhrase.length) {
      this.displayedText += currentPhrase.charAt(this.charIndex);
      this.charIndex++;
      this.cdr.detectChanges();
      this.typingTimeout = setTimeout(() => this.typeEffect(), this.typingSpeed);
    } else {
      this.typingTimeout = setTimeout(() => this.deleteEffect(), this.delayBetweenPhrases);
    }
  }

  deleteEffect(): void {
    if (this.charIndex > 0) {
      this.displayedText = this.displayedText.slice(0, -1);
      this.charIndex--;
      this.cdr.detectChanges();
      this.typingTimeout = setTimeout(() => this.deleteEffect(), this.deletingSpeed);
    } else {
      this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
      this.typingTimeout = setTimeout(() => this.typeEffect(), 300);
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.typingTimeout);
    if (this.observer) this.observer.disconnect();
  }
}