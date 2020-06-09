import {Component, Input, NgZone, OnInit} from '@angular/core';
import {AdministratorOrganizationDataService} from '../../../services/AdministratorOrganizationData.service';
import {Organization, OrganizationDeletionRequest, OrganizationService} from '../../../../index';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {FileUploader, FileUploaderOptions, ParsedResponseHeaders} from 'ng2-file-upload';
import {Cloudinary} from '@cloudinary/angular-5.x';



@Component({
  selector: 'app-organization-management-content',
  templateUrl: './organization-management-content.component.html',
  styleUrls: ['./organization-management-content.component.css']
})
export class OrganizationManagementContentComponent implements OnInit {
  @Input()
  private responses: Array<any>;
  hasBaseDropZoneOver = false;
  uploader: FileUploader;
  private flag = false;
  private name: string;
  private street: string;
  private number: string;
  private postCode: number;
  private city: string;
  private country: string;
  private descr: string;
  private descrR: string;
  private indIPLDAP: string;
  private currentOrganization: Organization;
  private change = 'modify';
  modifyForm: FormGroup;
  constructor(private ads: AdministratorOrganizationDataService, private orgS: OrganizationService, private cloudinary: Cloudinary, private zone: NgZone) {
    this.responses = [];
  }

  ngOnInit(): void {
    this.setupModifyForm();
    this.ads.getOrganization.subscribe((org: Organization) => {
      this.currentOrganization = org;
      this.name = this.currentOrganization.name;
      this.street = this.currentOrganization.street;
      this.number = this.currentOrganization.number;
      this.postCode = this.currentOrganization.postCode;
      this.city = this.currentOrganization.city;
      this.country = this.currentOrganization.country;
      this.descr = this.currentOrganization.description;
      this.indIPLDAP = this.currentOrganization.authenticationServerURL;
    });
    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`,
      // Upload files automatically upon addition to upload queue
      autoUpload: true,
      // Use xhrTransport in favor of iframeTransport
      isHTML5: true,
      // Calculate progress independently for each uploaded file
      removeAfterUpload: true,
      // XHR request headers
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    };
    this.uploader = new FileUploader(uploaderOptions);

    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      // Add Cloudinary's unsigned upload preset to the upload form
      form.append('upload_preset', this.cloudinary.config().upload_preset);
      // Add built-in and custom tags for displaying the uploaded photo in the list
      const tags = 'myphotoalbum';
      // Upload to a custom folder
      // Note that by default, when uploading via the API, folders are not automatically created in your Media Library.
      // In order to automatically create the folders based on the API requests,
      // please go to your account upload settings and set the 'Auto-create folders' option to enabled.
      form.append('folder', 'angular_sample');
      // Add custom tags
      form.append('tags', tags);
      // Add file to upload
      form.append('file', fileItem);

      // Use default "withCredentials" value for CORS requests
      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    // Insert or update an entry in the responses array
    const upsertResponse = fileItem => {

      // Run the update in a custom zone since for some reason change detection isn't performed
      // as part of the XHR request to upload the files.
      // Running in a custom zone forces change detection
      this.zone.run(() => {
        // Update an existing entry if it's upload hasn't completed yet
        // Find the id of an existing item
        const existingId = this.responses.reduce((prev, current, index) => {
          if (current.file.name === fileItem.file.name && !current.status) {
            return index;
          }
          return prev;
        }, -1);
        if (existingId > -1) {
          // Update existing item with new data
          this.responses[existingId] = Object.assign(this.responses[existingId], fileItem);
        } else {
          // Create new response
          this.responses.push(fileItem);
        }
      });

    };

    // Update model on completion of uploading a file
    this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) =>
      upsertResponse(
        {
          file: item.file,
          status,
          data: JSON.parse(response)
        }
      );

    // Update model on upload progress event
    this.uploader.onProgressItem = (fileItem: any, progress: any) =>
      upsertResponse(
        {
          file: fileItem.file,
          progress,
          data: {}
        }
      );
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  private setupModifyForm() {
    this.modifyForm = new FormGroup({
      Name: new FormControl(this.name),
      Street: new FormControl(this.street),
      Number: new FormControl(this.number),
      PostCode: new FormControl(this.postCode),
      City: new FormControl(this.city),
      Country: new FormControl(this.country),
      IndIPLDAP: new FormControl(this.indIPLDAP),
      Descr: new FormControl(this.descr),
      DescrR: new FormControl(this.descrR, [
        Validators.required,
        Validators.minLength(100)
        ]),
    });
  }

  onChange(val: string) {
    this.change = val;
  }

  onModify() {
      const d = new Date();
      const modOrg = this.currentOrganization;
      if (this.checkStringValidity(this.name)) {
        modOrg.name = this.name;
      }

      if (this.checkStringValidity(this.street)) {
        modOrg.street = this.street;
      }

      if (this.checkStringValidity(this.number)) {
        modOrg.number = this.number;
      }

      if (this.checkNumberValidity(this.postCode)) {
        modOrg.postCode = this.postCode;
      }

      if (this.checkStringValidity(this.city)) {
        modOrg.city = this.city;
      }

      if (this.checkStringValidity(this.city)) {
        modOrg.country = this.country;
      }

      if (this.checkStringValidity(this.descr)) {
        modOrg.description = this.descr;
      }

      if (this.checkStringValidity(this.indIPLDAP)) {
        modOrg.authenticationServerURL = this.indIPLDAP;
      }

      if (this.responses[0] != null && this.flag) {
          modOrg.image = this.responses[0].data.secure_url;
      }

      this.orgS.updateOrganization(modOrg).subscribe(() => {
        alert('Modifica all\'organizzazione effettuata.');
        this.currentOrganization = modOrg;
        this.currentOrganization.lastChangeDate = d;
      }, (err: HttpErrorResponse) => {
        if (err.status === 400) {
          alert('Errore. I dati inseriti non sono validi' + err.message);
        } else {
          alert(err.message);
        }
      });

      this.name = this.currentOrganization.name;
      this.street = this.currentOrganization.street;
      this.number = this.currentOrganization.number;
      this.postCode = this.currentOrganization.postCode;
      this.city = this.currentOrganization.city;
      this.country = this.currentOrganization.country;
      this.descr = this.currentOrganization.description;
      this.indIPLDAP = this.currentOrganization.authenticationServerURL;
      this.flag = false;
  }

  checkStringValidity(str: string) {
    return str !== undefined && str !== null && str.trim().length > 0;
  }

  checkNumberValidity(x: number) {
    return x !== undefined && x !== null && x > 0;
  }

  onRemove() {
    const delReq: OrganizationDeletionRequest = {
      organizationId: this.currentOrganization.id,
      requestReason: this.descrR,
      administratorId: localStorage.getItem('uid')
    };
// metti controlo max 512
    this.orgS.requestDeletionOfOrganization(delReq).subscribe(() => { alert('Richiesta di eliminazione inviata.'); }, (err: HttpErrorResponse) => {
        alert(err.message);
      } );
    this.descrR = null;
  }
  get Name(): string {
    return this.name;
  }

  set Name(value: string) {
    this.name = value;
  }

  get Street(): string {
    return this.street;
  }

  set Street(value: string) {
    this.street = value;
  }

  get Number(): string {
    return this.number;
  }

  set Number(value: string) {
    this.number = value;
  }

  get PostCode(): number {
    return this.postCode;
  }

  set PostCode(value: number) {
    this.postCode = value;
  }

  get City(): string {
    return this.city;
  }

  set City(value: string) {
    this.city = value;
  }

  get Country(): string {
    return this.country;
  }

  set Country(value: string) {
    this.country = value;
  }

  get Descr(): string {
    return this.descr;
  }

  set Descr(value: string) {
    this.descr = value;
  }
  get DescrR(): string {
    return this.descrR;
  }

  set DescrR(value: string) {
    this.descrR = value;
  }
  get getCurrentOrg(): Organization {
    return this.currentOrganization;
  }

  get Change(): string {
    return this.change;
  }

  set Change(value: string) {
    this.change = value;
  }

  get IndIPLDAP(): string {
    return this.indIPLDAP;
  }

  set IndIPLDAP(value: string) {
    this.indIPLDAP = value;
  }

  get Flag(): boolean {
    return this.flag;
  }

  set Flag(value: boolean) {
    this.flag = value;
  }

  get Responses(): Array<any> {
    return this.responses;
  }

  set Responses(value: Array<any>) {
    this.responses = value;
  }
}
