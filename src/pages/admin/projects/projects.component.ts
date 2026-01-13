import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService, Project } from '../../../services/data.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-admin-projects',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="space-y-8">
      <div class="flex justify-between items-end">
        <div>
          <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">Manage Projects</h1>
          <p class="text-gray-500 font-medium">Add, edit, or remove projects from your showcase.</p>
        </div>
        <button (click)="openModal()" 
          class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg transition-all scale-100 active:scale-95">
          Add New Project
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        @for (project of dataService.projects(); track $index) {
          <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-5 group hover:shadow-md transition-all">
            <div class="aspect-video rounded-2xl overflow-hidden bg-gray-100 shadow-inner">
              <img [src]="project.imageUrl" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            </div>
            <div class="space-y-2">
              <h3 class="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{{ project.title }}</h3>
              <p class="text-gray-500 text-sm line-clamp-2 leading-relaxed">{{ project.description }}</p>
            </div>
            <div class="flex gap-3 pt-2">
              <button (click)="openModal(project, $index)" 
                class="flex-1 px-4 py-3 bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 font-bold rounded-xl transition-all">
                Edit Details
              </button>
              <button (click)="deleteProject($index)" 
                class="px-5 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all"
                title="Delete Project">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          </div>
        }
      </div>

      <!-- Project Modal (Overlay) -->
      @if (showModal) {
        <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-0 sm:p-4 transition-all duration-300">
          <div class="bg-white w-full h-full sm:h-auto sm:max-w-4xl sm:rounded-[2.5rem] shadow-2xl p-6 md:p-12 space-y-8 overflow-y-auto animate-fadescale">
            <div class="flex justify-between items-center border-b border-gray-100 pb-6">
              <div>
                <h2 class="text-3xl font-black text-gray-900 tracking-tight">{{ editingId === null ? 'Add New Project' : 'Edit Project' }}</h2>
                <p class="text-gray-500 font-medium">Please fill in the project information below.</p>
              </div>
              <button (click)="closeModal()" class="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl text-gray-400 hover:text-gray-600 transition-all"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>

            <form [formGroup]="projectForm" (ngSubmit)="saveProject()" class="space-y-8">
              <div class="space-y-3">
                <label class="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Project Title</label>
                <input type="text" formControlName="title" class="w-full px-5 py-4 rounded-2xl bg-gray-50 border-0 focus:ring-2 focus:ring-blue-500 transition-all font-medium">
              </div>
              
              <div class="space-y-3">
                <label class="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Description</label>
                <textarea formControlName="description" rows="4" class="w-full px-5 py-4 rounded-2xl bg-gray-50 border-0 focus:ring-2 focus:ring-blue-500 transition-all font-medium leading-relaxed"></textarea>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="space-y-3">
                  <label class="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Project Image</label>
                  <div class="flex gap-3">
                    <div class="flex-1 relative">
                      <input type="text" formControlName="imageUrl" 
                        class="w-full px-5 py-4 rounded-2xl bg-gray-50 border-0 focus:ring-2 focus:ring-blue-500 transition-all font-medium text-sm"
                        placeholder="/assets/images/project.png">
                    </div>
                    <input type="file" #fileInput (change)="onFileSelected($event)" accept="image/*" class="hidden">
                    <button type="button" (click)="fileInput.click()" 
                      class="px-5 py-4 bg-gray-900 text-white rounded-2xl hover:bg-black transition-all shadow-lg flex items-center gap-2 group">
                      <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      <span class="hidden sm:inline">Upload</span>
                    </button>
                  </div>
                  <!-- Image Preview Small -->
                  @if (projectForm.get('imageUrl')?.value) {
                    <div class="mt-4 relative group w-full aspect-video rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
                      <img [src]="projectForm.get('imageUrl')?.value" class="w-full h-full object-cover">
                      <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span class="text-white text-xs font-bold">Image Preview</span>
                      </div>
                    </div>
                  }
                </div>
                <div class="space-y-3">
                  <label class="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Project Link / URL</label>
                  <input type="text" formControlName="link" class="w-full px-5 py-4 rounded-2xl bg-gray-50 border-0 focus:ring-2 focus:ring-blue-500 transition-all font-medium" placeholder="https://example.com">
                </div>
              </div>

              <div class="space-y-3">
                <label class="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Button Action Text</label>
                <input type="text" formControlName="linkText" class="w-full px-5 py-4 rounded-2xl bg-gray-50 border-0 focus:ring-2 focus:ring-blue-500 transition-all font-medium" placeholder="e.g. View Live Demo">
              </div>

              <div class="flex justify-end gap-5 pt-6 border-t border-gray-100">
                <button type="button" (click)="closeModal()" class="px-10 py-5 font-bold text-gray-600 hover:bg-gray-100 rounded-2xl transition-all">Cancel</button>
                <button type="submit" [disabled]="projectForm.invalid" class="px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/25 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50">
                  {{ editingIndex === null ? 'Create Project' : 'Save Changes' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </div>
  `
})
export class AdminProjectsComponent {
  dataService = inject(DataService);
  private fb = inject(FormBuilder);
  private notificationService = inject(NotificationService);

  showModal = false;
  editingId: number | null = null;

  projectForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    imageUrl: ['', Validators.required],
    link: ['', Validators.required],
    linkText: ['', Validators.required]
  });

  openModal(project?: Project, index?: number) {
    if (project) {
      this.editingId = project.id ?? null;
      this.projectForm.patchValue(project);
    } else {
      this.editingId = null;
      this.projectForm.reset({
        linkText: 'Explore Project',
        imageUrl: '/assets/images/'
      });
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingId = null;
  }

  saveProject() {
    if (this.projectForm.valid) {
      const formValue = this.projectForm.getRawValue() as Project;
      const obs = this.editingId !== null
        ? this.dataService.updateProject(this.editingId, formValue)
        : this.dataService.addProject(formValue);

      obs.subscribe({
        next: () => {
          this.closeModal();
          this.notificationService.success('Project saved successfully!');
        },
        error: (err) => {
          console.error('Failed to save project', err);
          this.notificationService.error('Failed to save project. Please try again.');
        }
      });
    }
  }

  deleteProject(index: number) {
    const project = this.dataService.projects()[index];
    if (project && confirm(`Are you sure you want to delete "${project.title}"?`)) {
      this.dataService.deleteProject(index).subscribe({
        next: () => this.notificationService.success('Project deleted successfully'),
        error: (err) => {
          console.error('Failed to delete project', err);
          this.notificationService.error('Failed to delete project.');
        }
      });
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        this.projectForm.patchValue({
          imageUrl: base64String
        });
      };

      reader.readAsDataURL(file);
    }
  }
}
