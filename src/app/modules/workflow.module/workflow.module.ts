import { NgModule } from '@angular/core';
import { GeneralModule } from '../general.module/general.module';

import { WorkflowComponent } from './workflow.component/workflow.component';
import { BoardComponent } from './board.component/board.component';
import { SidebarComponent } from './sidebar.component/sidebar.component';
import { ColumnComponent } from './column.component/column.component';

@NgModule({
    declarations: [
        WorkflowComponent,
        SidebarComponent,
        BoardComponent,
        ColumnComponent
    ],
    imports: [
    	GeneralModule
    ],
    providers: [],
    bootstrap: [WorkflowComponent]
})
export class WorkflowModule { }
