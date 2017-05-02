import { Routes } from '@angular/router';
import { WorkflowComponent } from '../workflow.module/workflow.component/workflow.component';
import { LoginComponent } from '../login.module/login.component/login.component';
import { BoardComponent } from '../workflow.module/board.component/board.component';

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
			}
		]
	},
	{ 
		path: '',
		redirectTo: '/workflow',
		pathMatch: 'full'
	},
	{ 
		path: '**',
		redirectTo: '/workflow',
		pathMatch: 'full'
	}
]
