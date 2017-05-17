//main modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
//material modules
import 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdProgressBarModule, MdSliderModule, MdSlideToggleModule, MdAutocompleteModule, MdRadioModule, MdMenuModule, MdButtonModule, MdDialogModule, MdInputModule, MdCheckboxModule, MdToolbarModule, MdSidenavModule, MdSnackBarModule } from '@angular/material';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        BrowserAnimationsModule,
        MdInputModule,
        MdMenuModule,
        MdRadioModule,
        MdButtonModule,
        MdCheckboxModule,
        MdToolbarModule,
        MdAutocompleteModule,
        MdSidenavModule,
        MdSnackBarModule,
        MdProgressBarModule,
        MdSlideToggleModule,
        MdDialogModule,
        MdSliderModule
    ],
    exports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        BrowserAnimationsModule,
        MdAutocompleteModule,
        MdInputModule,
        MdMenuModule,
        MdRadioModule,
        MdButtonModule,
        MdCheckboxModule,
        MdToolbarModule,
        MdSidenavModule,
        MdSnackBarModule,
        MdSlideToggleModule,
        MdProgressBarModule,
        MdDialogModule,
        MdSliderModule
    ]
})
export class GeneralModule { }
