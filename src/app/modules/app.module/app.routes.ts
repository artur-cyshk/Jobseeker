import { Routes } from '@angular/router';
import { WorkflowComponent } from '../workflow.module/workflow.component/workflow.component';
import { LoginComponent } from '../login.module/login.component/login.component';
import { BoardComponent } from '../workflow.module/board.component/board.component';
import { ProfileComponent } from '../workflow.module/profile.component/profile.component';
import { FavoritesComponent } from '../workflow.module/favorites.component/favorites.component';
import { CvsComponent } from '../workflow.module/cvs.component/cvs.component';
import { VacanciesComponent } from '../workflow.module/vacancies.component/vacancies.component';

export const appRoutes : Routes = [
	{
		path : 'login',
		component : LoginComponent	
	},
	{
		path : 'workflow',
		component : WorkflowComponent,
		children : [
			{
				path : 'board',
				component : BoardComponent
			},
			{
				path : 'profile',
				component : ProfileComponent
			},
			{
				path : 'cvs',
				component : CvsComponent
			},
			{
				path : 'vacancies',
				component : VacanciesComponent
			},
			{
				path : 'favorites',
				component : FavoritesComponent
			},
			{
				path : '',
				pathMatch: 'full',
				redirectTo: 'board'
			}			
		]
	},
	{ 
		path: '',
		redirectTo: '/workflow/board',
		pathMatch: 'full'
	},
	{ 
		path: '**',
		redirectTo: '/workflow/board',
		pathMatch: 'full'
	}
]
