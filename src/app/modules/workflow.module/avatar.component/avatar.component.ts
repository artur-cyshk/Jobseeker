import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { FileUploader, FileUploaderOptions  } from 'ng2-file-upload';
import { API } from '../../../general/constants/api.constant';
import { JWTService } from '../../../general/services/jwt.service';
@Component({
 	selector: 'avatar',
	templateUrl: './avatar.component.html',
 	styleUrls: ['./avatar.component.css']
})
export class AvatarComponent {
	imageSrc : string;
	uploader : FileUploader;
	constructor(private dialogRef : MdDialogRef<AvatarComponent>, private jwtService : JWTService){
		this.imageSrc = this.dialogRef._containerInstance.dialogConfig.data.imageSrc;
		this.uploader = new FileUploader({url: API.host + API.routes.avatar.url } );
		this.uploader.onCompleteItem = this.onUploaderFinished.bind(this);
		const options : FileUploaderOptions = {};
		options.headers = [{ name : 'Authorization' , value : this.jwtService.getTokenWithSignature() }];
		this.uploader.setOptions(options);
	}

	onUploaderFinished(item:any, response:any, status:any, headers:any) {
	    if(response) {
	    	this.imageSrc = response;
	    }
   }

	closeDialog(value) {
		this.dialogRef.close(value);
	}
}
