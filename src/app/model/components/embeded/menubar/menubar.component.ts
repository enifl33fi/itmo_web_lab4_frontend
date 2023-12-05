import { Component } from '@angular/core';
import {AuthApiService} from "../../../../core/service/server/auth/auth-api.service";

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent {

  constructor(protected authApiService: AuthApiService) {
  }
}
