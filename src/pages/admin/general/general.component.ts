import { CommonModule } from '@angular/common';
import { Component, inject, effect } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-admin-general',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">General Profile</h1>
        <p class="text-gray-500 font-medium">Manage your personal information and portfolio metadata.</p>
      </div>

      <form [formGroup]="profileForm" (ngSubmit)="save()" class="space-y-6">
        <div class="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100 space-y-8">
          <div class="grid md:grid-cols-2 gap-8">
            <div class="space-y-3">
              <label class="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
              <input type="text" formControlName="name" 
                class="w-full px-5 py-4 rounded-2xl bg-gray-50 border-0 focus:ring-2 focus:ring-blue-500 transition-all font-medium text-gray-900">
            </div>
            <div class="space-y-3">
              <label class="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Professional Role</label>
              <input type="text" formControlName="role" 
                class="w-full px-5 py-4 rounded-2xl bg-gray-50 border-0 focus:ring-2 focus:ring-blue-500 transition-all font-medium text-gray-900">
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-8">
            <div class="space-y-3">
              <label class="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
              <input type="email" formControlName="email" 
                class="w-full px-5 py-4 rounded-2xl bg-gray-50 border-0 focus:ring-2 focus:ring-blue-500 transition-all font-medium text-gray-900">
            </div>
            <div class="space-y-3">
              <label class="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Phone Number</label>
              <input type="text" formControlName="phone" 
                class="w-full px-5 py-4 rounded-2xl bg-gray-50 border-0 focus:ring-2 focus:ring-blue-500 transition-all font-medium text-gray-900">
            </div>
          </div>

          <div class="space-y-3">
            <label class="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Location / Address</label>
            <input type="text" formControlName="address" 
              class="w-full px-5 py-4 rounded-2xl bg-gray-50 border-0 focus:ring-2 focus:ring-blue-500 transition-all font-medium text-gray-900">
          </div>

          <div class="space-y-3 pt-4">
            <label class="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Professional Mission (Hero Content)</label>
            <textarea formControlName="mission" rows="6"
              class="w-full px-5 py-4 rounded-2xl bg-gray-50 border-0 focus:ring-2 focus:ring-blue-500 transition-all font-medium text-gray-900 leading-relaxed"></textarea>
          </div>
        </div>

        <div class="flex justify-end pt-4">
          <button type="submit" [disabled]="profileForm.invalid"
            class="px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/25 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  `
})
export class AdminGeneralComponent {
  private dataService = inject(DataService);
  private fb = inject(FormBuilder);
  private notificationService = inject(NotificationService);

  profileForm = this.fb.group({
    name: ['', Validators.required],
    role: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    mission: ['', Validators.required]
  });

  constructor() {
    effect(() => {
      const p = this.dataService.profile();
      const m = this.dataService.mission();
      this.profileForm.patchValue({
        name: p.name,
        role: p.role,
        email: p.email,
        phone: p.phone,
        address: p.address,
        mission: m
      }, { emitEvent: false });
    });
  }

  save() {
    if (this.profileForm.valid) {
      const formValue = this.profileForm.getRawValue();
      const updatedProfile = {
        name: formValue.name!,
        role: formValue.role!,
        email: formValue.email!,
        phone: formValue.phone!,
        address: formValue.address!,
        github: this.dataService.profile().github
      };

      this.dataService.updateProfile(updatedProfile, formValue.mission!).subscribe({
        next: () => {
          this.notificationService.success('Profile updated successfully!');
        },
        error: (err) => {
          console.error('Failed to update profile', err);
          this.notificationService.error('Failed to update profile. Please try again.');
        }
      });
    }
  }
}
