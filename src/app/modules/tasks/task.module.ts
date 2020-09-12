import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { TaskNotesComponent } from './task-notes/task-notes.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { EditTaskPopupComponent } from './edit-task-popup/edit-task-popup.component';
import { TaskRoutingModule } from './task-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    TasksComponent,
    TaskNotesComponent,
    TaskDetailsComponent,
    EditTaskPopupComponent,
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    SharedModule
  ]
})
export class TaskModule { }
