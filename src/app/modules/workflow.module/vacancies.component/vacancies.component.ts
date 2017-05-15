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
	currentVacancy : any;
	formData : any = {
		languages : [],
		skills : []
	};

	constructor(private httpWrapperService : HttpWrapperService, private sharedService : SharedService) {
		this.getAllCompanies();
		this.getAllLanguages();
		this.getAllSkills();
	}
	
	getCompaniesResponseHandler(response, error) {
		if(!error) {
			this.companies = response;			
		}
	}

	getSkillsResponseHandler(response, error) {
		if(!error) {
			this.formData.skills = response;			
		}
	}

	getLanguagesResponseHandler(response, error) {
		if(!error) {
			this.formData.languages = response;			
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


	toggleItem(selected, current, vacancyFlag) {
		this[current] = (this[current] == selected) ? null : selected;
		if(vacancyFlag) {
			if(this.currentVacancy){
				this.currentVacancy = null;
			}else{
				this.getVacancyById( selected.id ); 
			}
		}
	}

	getAllCompanies() {
		this.httpWrapperService.sendRequest({
			route : 'getCompanies',
			callback : this.getCompaniesResponseHandler.bind(this)
		})
	}

	getAllSkills() {
		this.httpWrapperService.sendRequest({
			route : 'getSkills',
			callback : this.getSkillsResponseHandler.bind(this)
		})
	}

	getAllLanguages() {
		this.httpWrapperService.sendRequest({
			route : 'getLanguages',
			callback : this.getLanguagesResponseHandler.bind(this)
		})
	}

	getVacancyResponseHandler(result, error) {
		if(!error){
			this.currentVacancy = result;
		}
	}

	getVacancyById(vacancyId : number) {
		this.httpWrapperService.sendRequest({
			route : 'getVacancyById',
			callback : this.getVacancyResponseHandler.bind(this),
			urlParams : {
				id : vacancyId
			}
		})
	}
}