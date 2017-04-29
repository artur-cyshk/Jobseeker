//components
import { AppComponent } from './app.component/app.component';
import {LoadingSectionComponent} from './loadingSection.component/loadingSection.component';
import {HeaderComponent} from './header.component/header.component';

//general modules
import { NgModule } from '@angular/core';
import {GeneralModule} from '../general.module/general.module';

//internal modules
import {WorkflowModule} from '../workflow.module/workflow.module';
import {LoginModule} from '../login.module/login.module';
//routing
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './app.routes';

//custom services
import { HttpWrapperService } from '../../general/services/httpWrapper.service';
import { LocalStorageWrapperService } from '../../general/services/localStorageWrapper.service';
import { SharedService } from '../../general/services/shared.service';
import { JWTService } from '../../general/services/jwt.service';

@NgModule({
    declarations: [
        AppComponent,
        LoadingSectionComponent,
        HeaderComponent
    ],
    imports: [
        RouterModule.forRoot(appRoutes),
        GeneralModule,
        WorkflowModule,
        LoginModule
    ],
    exports : [],
    providers: [
        HttpWrapperService,
        JWTService,
        LocalStorageWrapperService,
        SharedService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
