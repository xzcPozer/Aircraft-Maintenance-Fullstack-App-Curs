import {Component, OnInit} from '@angular/core';
import {KeycloakService} from "../../services/keycloak/keycloak.service";

@Component({
  selector: 'app-keycloak-login',
  templateUrl: './keycloak-login.component.html',
  styleUrls: ['./keycloak-login.component.scss']
})
export class KeycloakLoginComponent implements OnInit{

  constructor(
    private ks: KeycloakService,
  ) {
  }
  async ngOnInit(): Promise<void> {
    await this.ks.init();
    await this.ks.login();
  }
}
