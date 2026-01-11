import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ArrowLeft, House, LucideAngularModule, TriangleAlert } from 'lucide-angular';

@Component({
  selector: 'app-page-not-found',
  imports: [LucideAngularModule],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.scss',
})
export class PageNotFound {
  readonly TriangleAlert = TriangleAlert;
  readonly ArrowLeft = ArrowLeft;
  readonly House = House;

  private location = inject(Location);
  private router = inject(Router);

  goBack(): void {
    this.location.back();
  }

  goHome(): void {
    this.router.navigateByUrl('/');
  }
}
