//main modules
import { NgModule } from '@angular/core';
//material modules
import 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdInputModule, MdCheckboxModule, MdToolbarModule, MdSidenavModule } from '@angular/material';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        MdInputModule,
        MdButtonModule,
        MdCheckboxModule,
        MdToolbarModule,
        MdSidenavModule
    ],
    exports: [
        BrowserAnimationsModule,
        MdInputModule,
        MdButtonModule,
        MdCheckboxModule,
        MdToolbarModule,
        MdSidenavModule
    ]
})
export class MaterialModule { }
