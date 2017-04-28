import { Routes } from '@angular/router';
import { WorkflowComponent } from '../workflow.module/workflow.component/workflow.component';
import { LoginComponent } from '../login.module/login.component/login.component';
export const appRoutes : Routes = [
	{
		path : 'login',
		component : LoginComponent	
	},
	{
		path : 'workflow',
		component : WorkflowComponent	
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
