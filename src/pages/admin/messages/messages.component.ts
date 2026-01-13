import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-admin-messages',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-8">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">Contact Messages</h1>
          <p class="text-gray-500 font-medium">View and manage messages from your portfolio visitors.</p>
        </div>
        <button (click)="dataService.fetchMessages()" 
          class="w-full sm:w-auto p-4 bg-gray-900 text-white rounded-2xl hover:bg-black transition-all shadow-lg flex items-center justify-center gap-2 group">
          <svg class="w-5 h-5 group-active:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          <span class="font-bold">Refresh Inbox</span>
        </button>
      </div>

      <div class="space-y-4">
        @if (dataService.messages().length === 0) {
          <div class="bg-white p-12 rounded-3xl border border-gray-100 text-center space-y-4">
            <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-400">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
            </div>
            <p class="text-gray-500 font-medium text-lg">No messages yet. Keep up the good work!</p>
          </div>
        } @else {
          <div class="grid gap-6">
            @for (msg of dataService.messages(); track msg.id) {
              <div class="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all space-y-4 relative group">
                <div class="flex justify-between items-start">
                  <div class="space-y-1">
                    <h3 class="text-xl font-bold text-gray-900">{{ msg.name }}</h3>
                    <p class="text-blue-600 font-medium text-sm">{{ msg.email }}</p>
                  </div>
                  <div class="text-right flex flex-col items-end gap-2">
                    <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">{{ msg.created_at | date:'medium' }}</span>
                    <div class="flex gap-2">
                      <a [href]="'mailto:' + msg.email + '?subject=RE: Message from Portfolio&body=Hello ' + msg.name + ',\n\nIn response to your message: ' + msg.message"
                        class="p-3 bg-blue-50 text-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded-xl transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
                        title="Reply via Email">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      </a>
                      <button (click)="deleteMessage(msg.id)" 
                        class="p-3 bg-red-50 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-xl transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
                        title="Delete Message">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 p-6 rounded-2xl text-gray-700 leading-relaxed italic border-l-4 border-blue-500">
                  "{{ msg.message }}"
                </div>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `
})
export class AdminMessagesComponent implements OnInit {
  dataService = inject(DataService);
  private notificationService = inject(NotificationService);

  ngOnInit() {
    this.dataService.fetchMessages();
  }

  deleteMessage(id: number) {
    if (confirm('Are you sure you want to delete this message?')) {
      this.dataService.deleteMessage(id).subscribe({
        next: () => this.notificationService.success('Message deleted'),
        error: (err) => {
          console.error('Failed to delete message', err);
          this.notificationService.error('Error deleting message.');
        }
      });
    }
  }
}
