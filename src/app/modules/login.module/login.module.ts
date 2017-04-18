import { NgModule } from '@angular/core';
import {LoginComponent} from './login.component/login.component';
import {MaterialModule} from '../material.module/material.module';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
    	MaterialModule
    ],
    providers: [],
    bootstrap: [LoginComponent]
})
export class LoginModule { }
