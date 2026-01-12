import { Component, model } from '@angular/core';
import { Search as SearchIcon, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <div class="relative px-2">
      <lucide-icon
        [img]="SearchIcon"
        class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none"
      />
      <input
        type="text"
        (input)="search.set($event.target.value)"
        class="w-full  border border-slate-600 rounded px-10 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
        placeholder="Search..."
      />
    </div>
  `,
  styleUrl: './search.scss',
})
export class Search {
  readonly SearchIcon = SearchIcon;
  search = model<string>('');

}
