//main modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component/app.component';

//material modules
import 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCheckboxModule } from '@angular/material';

//internal modules
import {WorkflowModule} from '../workflow.module/workflow.module';
import {LoginModule} from '../login.module/login.module';
//routing
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './app.routes';

//custom services
import { HttpWrapperService } from '../../general/services/httpWrapper.service';
import { LocalStorageWrapperService } from '../../general/services/localStorageWrapper.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        RouterModule.forRoot(appRoutes),
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        MdCheckboxModule,
        WorkflowModule,
        LoginModule
    ],
    exports : [
        WorkflowModule,
        LoginModule
    ],
    providers: [
        HttpWrapperService,
        LocalStorageWrapperService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
