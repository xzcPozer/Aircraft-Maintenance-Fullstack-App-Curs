import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {KeycloakService} from "../../../../services/keycloak/keycloak.service";
import * as SockJS from "sockjs-client";
import * as Stomp from 'stompjs';
import {ToastrService} from "ngx-toastr";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit, OnDestroy {

  socketClient: any = null;
  private notificationSubscription: any;

  constructor(
    private router: Router,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private ks: KeycloakService,
    private keycloakService: KeycloakService,
    private toastService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setActiveLinks();
    });

    if (this.keycloakService.keycloak.tokenParsed?.sub) {
      let ws = new SockJS('http://localhost:8088/ws');
      this.socketClient = Stomp.over(ws);
      this.socketClient.connect({'Authorization': 'Bearer ' + this.keycloakService.keycloak.token}, () => {
          this.notificationSubscription = this.socketClient.subscribe(
            `/user/${this.keycloakService.keycloak.tokenParsed?.sub}/notifications`,
            (message: any) => {
              const notification = JSON.parse(message.body);
              const datePipe = new DatePipe('en-US'); // Укажите локаль, если нужно
              const formattedDate = datePipe.transform(notification.date, 'dd-MM-yyyy HH:mm');
              if (notification) {
                this.toastService.info(`
                            <strong>Дата:</strong> ${formattedDate}<br>
                            <strong>Серийный номер:</strong> ${notification.serialNumber}<br>
                            <strong>Статус:</strong> ${notification.status}
                            `,
                  'Информация о запланированной проверке',
                  {enableHtml: true})
              }
            }, () => {
              console.error('Error while connecting to webSocket');
            });
        }
      );
    }
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

  ngOnDestroy(): void {
    if (this.socketClient !== null) {
      this.socketClient.disconnect();
      this.notificationSubscription.unsubscribe();
      this.socketClient = null;
    }
  }

  async account(): Promise<void> {
    await this.ks.keycloak?.accountManagement();
  }

  async logout(): Promise<void> {
    await this.ks.keycloak.logout();
  }
}
