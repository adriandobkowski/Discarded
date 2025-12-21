import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chat-navbar',
  standalone: true,
  imports: [],
  template: `
    <nav>
      @if (!id()) {
        <div>
          <div>
            <img src="" alt="" />
            <div>Friends</div>
          </div>
          <button>Active</button>
          <button>All</button>
          <button>Add friend</button>
        </div>
      } @else {}
    </nav>
  `,
  styleUrl: './chat-navbar.scss',
})
export class ChatNavbar {
  private route = inject(ActivatedRoute);

  id = toSignal(this.route.paramMap.pipe(map((params) => params.get('id'))));
}
