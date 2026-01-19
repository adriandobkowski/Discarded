import { Component } from '@angular/core';
import { HatGlasses, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-chat-header',
  imports: [LucideAngularModule],
  standalone: true,
  templateUrl: './chat-header.html',
  styleUrl: './chat-header.scss',
})
export class ChatHeaderComponent {
  protected readonly HatGlasses = HatGlasses;
}
