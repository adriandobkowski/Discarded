import { Component, model } from '@angular/core';
import { Search as SearchIcon, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class SearchComponent {
  protected readonly SearchIcon = SearchIcon;
  public search = model<string>('');
}
