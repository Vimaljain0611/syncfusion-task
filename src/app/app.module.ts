
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ToolbarModule, ToolbarAllModule } from '@syncfusion/ej2-angular-navigations';

import { ButtonAllModule, CheckBoxAllModule } from '@syncfusion/ej2-angular-buttons';
import { TreeGridAllModule } from '@syncfusion/ej2-angular-treegrid';

import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from '../app.component';

@NgModule({
    declarations: [AppComponent], imports: [CommonModule, HttpModule, TreeGridAllModule, ToolbarModule, ButtonAllModule, DialogModule, CheckBoxAllModule, ReactiveFormsModule, FormsModule, BrowserModule], providers: [], bootstrap: [AppComponent]
})
export class AppModule { }
