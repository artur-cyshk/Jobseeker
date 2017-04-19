import { NgModule } from '@angular/core';
import {LoginComponent} from './login.component/login.component';
import {MaterialModule} from '../material.module/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
    	MaterialModule,
    	FormsModule
    ],
    providers: [],
    bootstrap: [LoginComponent]
})
export class LoginModule { }
