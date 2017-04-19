//main modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//material modules
import 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdProgressBarModule, MdButtonModule, MdInputModule, MdCheckboxModule, MdToolbarModule, MdSidenavModule, MdSnackBarModule } from '@angular/material';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        MdInputModule,
        MdButtonModule,
        MdCheckboxModule,
        MdToolbarModule,
        MdSidenavModule,
        MdSnackBarModule,
        MdProgressBarModule
    ],
    exports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        MdInputModule,
        MdButtonModule,
        MdCheckboxModule,
        MdToolbarModule,
        MdSidenavModule,
        MdSnackBarModule,
        MdProgressBarModule
    ]
})
export class GeneralModule { }
