import {Component} from '@angular/core';
import {KeycloakService} from "../../services/keycloak/keycloak.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private ks: KeycloakService,
    private router: Router
  ) {
  }

  login() {
    const roles = this.ks.getRoles();
    if (roles.includes('ENGINEER')) {
      this.router.navigate(['engineer']);
    } else if (roles.includes('SENIOR_ENGINEER')) {
       this.router.navigate(['/senior-engineer']);
    } else {
       this.router.navigate(['/forbidden']);
    }
  }


}
