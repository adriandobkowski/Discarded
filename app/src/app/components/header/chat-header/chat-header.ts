import { Component } from '@angular/core';
import { HatGlasses, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-chat-header',
  imports: [LucideAngularModule],
  template: `
    <header class="bg-slate-950 w-full h-12 flex items-center justify-center gap-4 px-6">
      <lucide-icon [img]="HatGlasses" class="w-10 h-10 text-white rounded-full" />
      <div class="text-white font-semibold text-lg">Private messages</div>
    </header>
  `,
  styleUrl: './chat-header.scss',
})
export class ChatHeader {
  readonly HatGlasses = HatGlasses;
}
