import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { FileUploader } from 'ng2-file-upload';
import { API } from '../../../general/constants/api.constant';
@Component({
 	selector: 'avatar',
	templateUrl: './avatar.component.html',
 	styleUrls: ['./avatar.component.css']
})
export class AvatarComponent {
	imageSrc : string;
	uploader : FileUploader;
	constructor(private dialogRef : MdDialogRef<AvatarComponent>){
		this.imageSrc = this.dialogRef._containerInstance.dialogConfig.data.imageSrc;
		this.uploader = new FileUploader({url: API.host + API.routes.avatar.url });
	}
}
