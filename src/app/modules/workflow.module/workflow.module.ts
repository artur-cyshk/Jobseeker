import { NgModule } from '@angular/core';
import { GeneralModule } from '../general.module/general.module';

import { WorkflowComponent } from './workflow.component/workflow.component';
import { BoardComponent } from './board.component/board.component';
import { SidebarComponent } from './sidebar.component/sidebar.component';
import { ColumnComponent } from './column.component/column.component';
import { SortablejsModule } from 'angular-sortablejs';
@NgModule({
    declarations: [
        WorkflowComponent,
        SidebarComponent,
        BoardComponent,
        ColumnComponent
    ],
    imports: [
    	GeneralModule,
        SortablejsModule
    ],
    providers: [],
    bootstrap: [WorkflowComponent]
})
export class WorkflowModule { }
