import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  private router = inject(Router);

  public goToHorizon(): void {
    this.router.navigateByUrl('horizon-health');
  }
}
