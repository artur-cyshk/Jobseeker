import { Component } from '@angular/core';
import { SharedService } from '../../../general/services/shared.service';
import { HttpWrapperService } from '../../../general/services/httpWrapper.service';

@Component({
 	selector: 'vacancies',
	templateUrl: './vacancies.component.html',
 	styleUrls: ['./vacancies.component.css']
})
export class VacanciesComponent {
	companies : Array<any> = [];
	selectedCompany : any;
	selectedVacancy : any;
	constructor(private httpWrapperService : HttpWrapperService, private sharedService : SharedService) {
		this.getAllCompanies();
	}
	
	getCompaniesResponseHandler(response, error) {
		if(!error) {
			this.companies = response;			
		}
	}

	addVacancy(vacancy) {
		if(vacancy.value && this.selectedCompany) {
			this.httpWrapperService.sendRequest({
				route : 'postVacancy',
				body : {
					companyId : this.selectedCompany.id,
					name : vacancy.value
				},
				callback : (vacancy, error) => {
					if(!error && this.selectedCompany && this.selectedCompany.vacancies) {
						this.selectedCompany.vacancies.push(vacancy);
					}
				}
			})			
		}
	}

	addCompany(company) {
		if(company.value) {
			this.httpWrapperService.sendRequest({
				route : 'postCompanies',
				body : {
					name : company.value
				},
				callback : (company, error) => {
					if(!error) {
						this.companies.push(company);
					}
				}
			})
		}
	}

	removedItemResponseHandler(result, error) {
		console.log(result, error);
	}

	removeItem(ev, id, field, toDo, list) {
		ev.stopPropagation();
		this[field] = null;
		this.httpWrapperService.sendRequest({
			route : toDo,
			callback : (result, error) => {
				if(!error) {
					const index = list.findIndex((item) => item.id == id);
					list.splice(index, 1);
				}
			},
			urlParams : {
				id : id
			}
		})
	}


	toggleItem(selected, current) {
		this[current] = (this[current] == selected) ? null : selected;
	}

	getAllCompanies() {
		this.httpWrapperService.sendRequest({
			route : 'getCompanies',
			callback : this.getCompaniesResponseHandler.bind(this)
		})
	}
}