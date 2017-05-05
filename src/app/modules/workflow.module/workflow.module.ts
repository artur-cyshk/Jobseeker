import { NgModule } from '@angular/core';
import { GeneralModule } from '../general.module/general.module';
import { SortablejsModule } from 'angular-sortablejs';

//routing
import { RouterModule } from '@angular/router';
import { appRoutes } from '../app.module/app.routes';

import { WorkflowComponent } from './workflow.component/workflow.component';
import { BoardComponent } from './board.component/board.component';
import { ColumnComponent } from './column.component/column.component';
import {SidebarComponent} from './sidebar.component/sidebar.component';
import {ProfileComponent} from './profile.component/profile.component';
import {FavoritesComponent} from './favorites.component/favorites.component';

import {CustomSelectComponent} from '../../general/components/customSelect.component/customSelect.component';
import {MultiselectComponent} from '../../general/components/multiselect.component/multiselect.component';

import {ImageCropperComponent} from 'ng2-img-cropper';
import {ImageCropperBoxComponent} from '../../general/components/imageCropper.component/imageCropper.component';

@NgModule({
    declarations: [
        WorkflowComponent,
        BoardComponent,
        ColumnComponent,
        SidebarComponent,
        ProfileComponent,
        FavoritesComponent,
        MultiselectComponent,
        CustomSelectComponent,
        ImageCropperComponent,
        ImageCropperBoxComponent
    ],
    imports: [
    	GeneralModule,
        RouterModule.forChild(appRoutes),
        SortablejsModule
    ],
    providers: [],
    bootstrap: [WorkflowComponent]
})
export class WorkflowModule { }
