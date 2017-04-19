import { NgModule } from '@angular/core';
import {WorkflowComponent} from './workflow.component/workflow.component';
import {GeneralModule} from '../general.module/general.module';

@NgModule({
    declarations: [
        WorkflowComponent
    ],
    imports: [
    	GeneralModule
    ],
    providers: [],
    bootstrap: [WorkflowComponent]
})
export class WorkflowModule { }
