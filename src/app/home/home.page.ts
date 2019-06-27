import { Component } from '@angular/core';

//opcional
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.transicionALogin();
  }

  // hace una transición a la página login despues de 5 segundos
  transicionALogin() {
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 3000);
  }

}
