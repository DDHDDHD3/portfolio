import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { DataService, SkillCategory, Skill } from '../../../services/data.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-admin-skills',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">Manage Skills</h1>
        <p class="text-gray-500 font-medium">Configure your core skills and traits categories.</p>
        <button (click)="saveSkills()" 
          class="mt-4 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg transition-all scale-100 active:scale-95">
          Save All Changes
        </button>
      </div>

      <div class="space-y-10">
        @for (category of dataService.skillCategories(); track catIndex; let catIndex = $index) {
          <div class="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-8 animate-fade-in" 
            [style.animation-delay]="(catIndex * 100) + 'ms'">
            <div class="flex justify-between items-start border-b border-gray-50 pb-6">
              <div class="space-y-2 group/title flex-1">
                <span class="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">Category #{{ catIndex + 1 }}</span>
                <div class="flex items-center gap-3">
                  <h3 class="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">{{ category.title }}</h3>
                  <button (click)="editCategoryTitle(catIndex)" class="opacity-100 md:opacity-0 md:group-hover/title:opacity-100 p-2 text-gray-400 hover:text-blue-500 transition-all">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </button>
                </div>
              </div>
              <button (click)="removeCategory(catIndex)" class="p-3 bg-red-50 hover:bg-red-100 text-red-400 hover:text-red-600 rounded-2xl transition-all shadow-sm" title="Remove Category">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
              @for (skill of category.skills; track skillIndex; let skillIndex = $index) {
                <div class="p-6 rounded-[2rem] bg-gray-50/50 border border-gray-100 flex items-center justify-between group hover:bg-white hover:shadow-2xl hover:shadow-blue-500/10 transition-all min-h-[100px] gap-4">
                  <span class="font-bold text-gray-800 text-base md:text-lg leading-snug flex-1">{{ skill.name }}</span>
                  <div class="flex items-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all">
                    <button (click)="editSkill(catIndex, skillIndex)" class="p-3 bg-blue-50 text-blue-500 rounded-xl hover:bg-blue-100" title="Edit Skill">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </button>
                    <button (click)="removeSkill(catIndex, skillIndex)" class="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100" title="Remove Skill">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                </div>
              }
              <button (click)="addSkillTo(catIndex)" 
                class="p-6 rounded-[2rem] border-2 border-dashed border-gray-200 text-gray-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/30 font-bold transition-all flex items-center justify-center gap-3 min-h-[90px]">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                <span>Add Skill</span>
              </button>
            </div>
          </div>
        }
      </div>

      <div class="flex justify-center pt-8">
        <button (click)="addCategory()"
          class="px-10 py-4 bg-gray-900 text-white font-bold rounded-2xl shadow-xl hover:bg-black transition-all transform hover:scale-105 active:scale-95">
          Add New Category
        </button>
      </div>
    </div>
  `
})
export class AdminSkillsComponent {
  dataService = inject(DataService);
  private notificationService = inject(NotificationService);

  addCategory() {
    const newCat: SkillCategory = {
      title: 'New Category',
      description: 'Description here',
      skills: []
    };
    this.dataService.skillCategories.update(c => [...c, newCat]);
  }

  removeCategory(index: number) {
    this.dataService.skillCategories.update(c => {
      const next = [...c];
      next.splice(index, 1);
      return next;
    });
  }

  addSkillTo(catIndex: number) {
    const name = prompt('Skill Name:');
    if (name) {
      this.dataService.skillCategories.update(c => {
        const next = [...c];
        next[catIndex].skills.push({
          name: name,
          icon: 'M13 10V3L4 14h7v7l9-11h-7z',
          color: 'blue'
        });
        return next;
      });
    }
  }

  removeSkill(catIndex: number, skillIndex: number) {
    this.dataService.skillCategories.update(c => {
      const next = [...c];
      next[catIndex].skills.splice(skillIndex, 1);
      return next;
    });
  }

  editCategoryTitle(catIndex: number) {
    const title = prompt('Category Title:', this.dataService.skillCategories()[catIndex].title);
    if (title) {
      this.dataService.skillCategories.update(c => {
        const next = [...c];
        next[catIndex].title = title;
        return next;
      });
    }
  }

  editSkill(catIndex: number, skillIndex: number) {
    const name = prompt('Skill Name:', this.dataService.skillCategories()[catIndex].skills[skillIndex].name);
    if (name) {
      this.dataService.skillCategories.update(c => {
        const next = [...c];
        next[catIndex].skills[skillIndex].name = name;
        return next;
      });
    }
  }

  saveSkills() {
    this.dataService.updateSkills(this.dataService.skillCategories()).subscribe({
      next: () => this.notificationService.success('Skills saved to database!'),
      error: (err) => {
        console.error('Failed to save skills', err);
        this.notificationService.error('Error saving skills. Please try again.');
      }
    });
  }
}
