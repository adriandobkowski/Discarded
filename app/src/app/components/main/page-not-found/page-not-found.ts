import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ArrowLeft, House, LucideAngularModule, TriangleAlert } from 'lucide-angular';

@Component({
  selector: 'app-page-not-found',
  imports: [LucideAngularModule],
  standalone: true,
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.scss',
})
export class PageNotFoundComponent {
  protected readonly TriangleAlert = TriangleAlert;
  protected readonly ArrowLeft = ArrowLeft;
  protected readonly House = House;

  private location = inject(Location);
  private router = inject(Router);

  protected goBack(): void {
    this.location.back();
  }

  protected goHome(): void {
    void this.router.navigateByUrl('/');
  }
}
