import {Component, OnInit} from '@angular/core';
import {KeycloakService} from "../../services/keycloak/keycloak.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  constructor(
    private ks: KeycloakService
  ) {
  }

  async ngOnInit(): Promise<void> {
    await this.ks.init();
    await this.ks.login();
  }

}
