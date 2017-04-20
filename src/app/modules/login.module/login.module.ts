//main modules
import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component/login.component';
import { GeneralModule } from '../general.module/general.module';
import { RegistrationComponent } from './registration.component/registration.component';
@NgModule({
    declarations: [
        LoginComponent,
        RegistrationComponent
    ],
    entryComponents: [RegistrationComponent],
    imports: [
    	GeneralModule
    ],
    providers: [],
    bootstrap: [LoginComponent]
})
export class LoginModule { }
