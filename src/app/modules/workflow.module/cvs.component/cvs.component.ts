import { Component } from '@angular/core';
import { SharedService } from '../../../general/services/shared.service';
import { HttpWrapperService } from '../../../general/services/httpWrapper.service';

@Component({
 	selector: 'cvs',
	templateUrl: './cvs.component.html',
 	styleUrls: ['./cvs.component.css']
})
export class CvsComponent {
	cvs : Array<any> = [];
	selectedCv : any;
	currentCv : any;
	cvForm : any;
	formData : any = {
		languages : [],
		skills : []
	};

	constructor(private httpWrapperService : HttpWrapperService, private sharedService : SharedService) {
		this.getAllLanguages();
		this.getAllSkills();
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

	addCv(cv) {
		if(cv && cv.value) {
			this.httpWrapperService.sendRequest({
				route : 'postCv',
				body : {
					name : cv.value
				},
				callback : (cv, error) => {
					if(!error && this.cvs) {
						this.cvs.push(cv);
					}
				}
			})			
		}
	}

	removedItemResponseHandler(result, error) {
		console.log(result, error);
	}

	removeItem(ev, id, field, list) {
		ev.stopPropagation();
		this[field] = null;
		this.httpWrapperService.sendRequest({
			route : 'removeCv',
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
		if(this[current]) {
				this.currentCv = null;
		}else{
			this.getCvById( selected.id ); 
		}
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

	getCvResponseHandler(result, error) {
		if(!error){
			this.currentCv = result;
		}
	}

	getCvById(cvId : number) {
		this.httpWrapperService.sendRequest({
			route : 'getCvById',
			callback : this.getCvResponseHandler.bind(this),
			urlParams : {
				id : cvId
			}
		})
	}

	saveCv(form, cv) {
		if(form && form.valid) {
			cv.ready = 1;
			this.httpWrapperService.sendRequest({
				route : 'putCv',
				body : cv,
				callback : (result, error) => {
					if(!error) {
						console.log(result);
					}
				}
			})
		}
	}

	itemsChanged(value, field) {
		if(this.currentCv && this.currentCv[field]){
			this.currentCv[field] = value;
		}
	}

	languagesChanged(value) {
		this.itemsChanged(value, 'languages');
	}

	skillsChanged(value) {
		this.itemsChanged(value, 'skills');
	}

	additionalSkillsChanged(value) {
		this.itemsChanged(value, 'additionalSkills');
	}		



}