//main modules
import { NgModule } from '@angular/core';
import {LoginComponent} from './login.component/login.component';
import {GeneralModule} from '../general.module/general.module';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
    	GeneralModule
    ],
    providers: [],
    bootstrap: [LoginComponent]
})
export class LoginModule { }
