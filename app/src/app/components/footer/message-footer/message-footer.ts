import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { LucideAngularModule, Plus } from 'lucide-angular';
import { MessageProps } from '../../../types';
import { RouteService } from '../../../services/route/route-service';
import { AuthService } from '../../../services/auth/auth-service';
import { v4 as uuidv4 } from 'uuid';
import { ChatService } from '../../../services/chat/chat-service';
import { RoomService } from '../../../services/room/room-service';
import { messageOrMediaRequired } from '../../../validators/form-validators';
import { ToastService } from '../../../services/toast/toast-service';
@Component({
  selector: 'app-message-footer',
  standalone: true,
  imports: [ReactiveFormsModule, LucideAngularModule],
  templateUrl:'./message-footer.html',
  styleUrl: './message-footer.scss',
})
export class MessageFooterComponent {
  protected readonly Plus = Plus;

  private authService = inject(AuthService);
  private routeService = inject(RouteService);
  private chatService = inject(ChatService);
  private roomService = inject(RoomService);
  private toastService = inject(ToastService);

  protected currentChat = this.chatService.currentChat;

  protected messageDisabled = this.routeService.messageDisabled;

  protected roomId = this.roomService.roomId;
  protected chatId = this.chatService.chatId;

  protected messageForm = new FormGroup(
    {
      message: new FormControl<string>('', {
        validators: [Validators.maxLength(2000)],
        nonNullable: true,
      }),
      media: new FormControl<string | null>(null),
    },
    {
      validators: [messageOrMediaRequired('message', 'media')],
    },
  );

  protected onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files!;
    const fileUrl = `/assets/uploads/${files[0].name}`;
    this.messageForm.patchValue({ media: fileUrl });
  }
  protected send(): void {
    if (this.messageForm.invalid) {
      this.messageForm.markAllAsTouched();
      this.toastService.error('Type a message or attach media', 'Cannot send');
      
return;
    }
    const chatId = this.chatId();
    const roomId = this.roomId();
    const message: MessageProps = {
        id: uuidv4(),
      ...this.messageForm.getRawValue(),
        userId: this.authService.user()!.id,
        createdAt: new Date().toISOString(),
        chatId: chatId ?? null,
        roomId: roomId ?? null
      };
    if (chatId) {
      this.chatService.sendMessage(message).subscribe({
        next: ()=> {
          this.messageForm.reset();
        },
        error: (err) => this.toastService.errorFrom(err, 'Could not send message', 'Send failed')
        
      });
    }
    if (roomId) {
      this.roomService.sendMessage(message).subscribe({
        next: ()=> {
          this.messageForm.reset();
        },
        error: (err) => this.toastService.errorFrom(err, 'Could not send message', 'Send failed')
      });
    }
    };
  }
