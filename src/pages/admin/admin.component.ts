import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-100 flex flex-col md:flex-row relative">
      <!-- Mobile Header Toggle -->
      <div class="md:hidden bg-gray-900 p-4 flex items-center justify-between sticky top-0 z-50">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <span class="text-xl font-black text-white">Admin CMS</span>
        </div>
        <button (click)="isSidebarOpen.set(!isSidebarOpen())" class="p-2 text-gray-400 hover:text-white transition-colors">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path *ngIf="!isSidebarOpen()" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            <path *ngIf="isSidebarOpen()" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Admin Sidebar Overlay (Mobile) -->
      <div *ngIf="isSidebarOpen()" (click)="isSidebarOpen.set(false)" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-fade-in"></div>

      <!-- Admin Sidebar -->
      <aside 
        [class.translate-x-0]="isSidebarOpen()" 
        [class.-translate-x-full]="!isSidebarOpen()"
        class="fixed md:static inset-y-0 left-0 w-72 bg-gray-900 p-8 space-y-10 no-print shadow-2xl z-50 transition-transform duration-300 md:translate-x-0 overflow-y-auto">
        
        <div class="hidden md:flex items-center gap-4 mb-4">
          <div class="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h2 class="text-2xl font-black text-white tracking-tight">Admin CMS</h2>
        </div>

        <nav class="space-y-3">
          <a routerLink="general" (click)="isSidebarOpen.set(false)" routerLinkActive="bg-blue-600 text-white shadow-lg shadow-blue-500/20" class="flex items-center gap-4 p-4 rounded-2xl text-gray-400 hover:bg-gray-800 transition-all font-semibold">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            General Profile
          </a>
          <a routerLink="projects" (click)="isSidebarOpen.set(false)" routerLinkActive="bg-blue-600 text-white shadow-lg shadow-blue-500/20" class="flex items-center gap-4 p-4 rounded-2xl text-gray-400 hover:bg-gray-800 transition-all font-semibold">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            Manage Projects
          </a>
          <a routerLink="skills" (click)="isSidebarOpen.set(false)" routerLinkActive="bg-blue-600 text-white shadow-lg shadow-blue-500/20" class="flex items-center gap-4 p-4 rounded-2xl text-gray-400 hover:bg-gray-800 transition-all font-semibold">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            Manage Skills
          </a>
          <a routerLink="messages" (click)="isSidebarOpen.set(false)" routerLinkActive="bg-blue-600 text-white shadow-lg shadow-blue-500/20" class="flex items-center gap-4 p-4 rounded-2xl text-gray-400 hover:bg-gray-800 transition-all font-semibold">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
            Contact Messages
          </a>
          <div class="pt-8 space-y-4">
            <div class="bg-gray-800/50 p-6 rounded-[2rem] border border-gray-700/50 space-y-4">
               <div class="flex justify-between items-center">
                  <span class="text-[10px] font-black text-gray-500 uppercase tracking-widest">Session Expiry</span>
                  <span class="text-sm font-black" [ngClass]="auth.sessionTimeLeft() < 60 ? 'text-red-500 animate-pulse' : 'text-blue-400'">
                    {{ formatTime(auth.sessionTimeLeft()) }}
                  </span>
               </div>
               <button (click)="auth.refreshSession()" 
                 class="w-full py-3 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white text-xs font-black rounded-xl transition-all border border-blue-500/20">
                 Renew Session
               </button>
            </div>

            <div class="flex flex-col gap-3">
              <a routerLink="/" (click)="isSidebarOpen.set(false)" class="flex items-center gap-4 p-4 rounded-2xl text-blue-400 hover:bg-blue-500/10 transition-all font-bold border-2 border-blue-500/20">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                Portfolio
              </a>
              <button (click)="auth.logout()" class="flex items-center gap-4 p-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all font-bold border-2 border-red-500/20">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                Logout
              </button>
            </div>
          </div>
        </nav>
      </aside>

      <!-- Main Admin Content Area -->
      <main class="flex-1 p-6 md:p-10 lg:p-14 overflow-y-auto bg-gray-50/50 h-screen">
        <div class="max-w-6xl mx-auto space-y-10 animate-fade-in">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class AdminComponent {
  auth = inject(AuthService);
  isSidebarOpen = signal(false);

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}
