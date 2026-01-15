import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { LucideAngularModule, Plus } from 'lucide-angular';
import { MessageProps } from '../../../types';
import { RouteService } from '../../../services/route/route-service';
import { AuthService } from '../../../services/auth/auth-service';
import { v4 as uuidv4 } from 'uuid';
import { ChatService } from '../../../services/chat/chat-service';
import { RoomService } from '../../../services/room/room-service';
@Component({
  selector: 'app-message-footer',
  standalone: true,
  imports: [ReactiveFormsModule, LucideAngularModule],
  template: `
    <form [formGroup]="messageForm" class="px-4 pb-6 pt-2" (ngSubmit)="send()">
      <footer class="flex items-center">
        <div class="relative flex items-center bg-[#383A40] rounded-lg w-full">
          <label
            class="px-4 py-2.5 text-gray-400 hover:text-white cursor-pointer transition-colors flex-shrink-0"
          >
            <div class="bg-[#2B2D31] rounded-full p-0.5">
              <lucide-icon [img]="Plus" class="w-4 h-4" />
            </div>
            <input type="file" accept="image/*, video/*" hidden (change)="onFileSelected($event)" formControlName="media"/>
          </label>
          <input
            type="text"
            placeholder="Message"
            [disabled]="messageDisabled()"
            formControlName="message"
            class="flex-1 bg-transparent text-gray-100 placeholder-gray-500 py-2.5 text-sm focus:outline-none transition-colors font-normal"
          />
          <button type="submit" hidden></button>
        </div>
      </footer>
    </form>
  `,
  styleUrl: './message-footer.scss',
})
export class MessageFooter {
  readonly Plus = Plus;

  private authService = inject(AuthService);
  private routeService = inject(RouteService);
  private chatService = inject(ChatService)
  private roomService = inject(RoomService)

  currentChat = this.chatService.currentChat

  messageDisabled = this.routeService.messageDisabled;

  roomId = this.roomService.roomId
  chatId = this.chatService.chatId

  messageForm = new FormGroup({
    message: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable:true
    }),
    media: new FormControl<string | null>(null),
  });

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files!;
    if (files[0]) {
      const fileUrl = `/assets/uploads/${files[0].name}`;
      this.messageForm.patchValue({ media: fileUrl });
    }
  }
  send(): void {
    const chatId = this.chatId()
    const roomId = this.roomId()

    console.log(chatId, roomId)
    const message: MessageProps = {
        id: uuidv4(),
      ...this.messageForm.getRawValue(),
        userId: this.authService.user()!.id,
        createdAt: new Date().toString(),
        chatId: chatId ?? null,
        roomId: roomId ?? null
      }
    if (chatId) {
      this.chatService.sendMessage(message).subscribe({
        next: ()=> {
          this.messageForm.reset()
          console.log("message sent")
        },
        error: (err)=>console.log(err)
        
      })
    }
    if (roomId) {
      this.roomService.sendMessage(message).subscribe({
        next: ()=> {
          this.messageForm.reset()
          console.log("message sent")
        },
        error: (err)=>console.log(err)
      })
    }
    };
  }
