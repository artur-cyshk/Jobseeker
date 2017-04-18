import { NgModule } from '@angular/core';
import {WorkflowComponent} from './workflow.component/workflow.component';
import {MaterialModule} from '../material.module/material.module';

@NgModule({
    declarations: [
        WorkflowComponent
    ],
    imports: [
    	MaterialModule
    ],
    providers: [],
    bootstrap: [WorkflowComponent]
})
export class WorkflowModule { }
