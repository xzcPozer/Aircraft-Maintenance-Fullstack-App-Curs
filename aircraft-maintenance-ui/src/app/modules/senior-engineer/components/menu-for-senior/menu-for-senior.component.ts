import {AfterViewInit, Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {KeycloakService} from "../../../../services/keycloak/keycloak.service";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-menu-for-senior',
  templateUrl: './menu-for-senior.component.html',
  styleUrls: ['./menu-for-senior.component.scss']
})
export class MenuForSeniorComponent implements OnInit, AfterViewInit {


  constructor(
    private router: Router,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private ks: KeycloakService
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setActiveLinks();
    });
  }

  ngAfterViewInit(): void {
    this.setActiveLinks();
  }

  setActiveLinks(): void {
    const links = this.elementRef.nativeElement.querySelectorAll('.nav-btn');
    const currentUrl = this.router.url;

    links.forEach((link: HTMLElement) => {
      const linkUrl = link.getAttribute('routerLink');
      if (linkUrl && currentUrl.includes(linkUrl)) {
        this.renderer.addClass(link, 'active');
      } else {
        this.renderer.removeClass(link, 'active');
      }
    });
  }

  async account(): Promise<void>{
    await this.ks.keycloak?.accountManagement();
  }

  async logout(): Promise<void> {
    await this.ks.keycloak.logout();
  }
}
