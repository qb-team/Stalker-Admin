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
  private responses: Array<any>; // date of cloudinary
  hasBaseDropZoneOver = false;
  uploader: FileUploader; // contain the image got to HTML form
  private flag = false; // for check form load img
  private flagError = false; // for check that the values are corrects
  private name: string; // contain name of organization
  private street: string; // contain street of organization
  private number: string; // contain number of organization
  private postCode: number; // contain postCode of organization
  private city: string; // contain city of organization
  private country: string; // contain country of organization
  private descr: string; // contain description of organization
  private descrR: string; // contain description the request for delete a organization
  private indIPLDAP: string; // contain IP address for LDAP server
  private currentOrganization: Organization; // contain current organization
  private change = 'modify'; // allow to show the correct form
  modifyForm: FormGroup; // for check form
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

    /*
     Update model on completion of uploading a file
     */
    this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) =>
      upsertResponse(
        {
          file: item.file,
          status,
          data: JSON.parse(response)
        }
      );

    /*
     Update model on upload progress event
     */
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

  /*
   Setup form for modify data of organization
   */
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
        Validators.minLength(100),
        Validators.maxLength(512)
        ]),
    });
  }

  /*
   change value of this.change
   */
  onChange(val: string) {
    this.change = val;
  }

  /*
   Modify data of organization through API method
   */
  onModify() {
      const d = new Date();
      const tmp = [];
      tmp.push(this.currentOrganization.name);
      tmp.push(this.currentOrganization.description);
      tmp.push(this.currentOrganization.image);
      tmp.push(this.currentOrganization.street);
      tmp.push(this.currentOrganization.number);
      tmp.push(this.currentOrganization.postCode);
      tmp.push(this.currentOrganization.city);
      tmp.push(this.currentOrganization.country);
      tmp.push(this.currentOrganization.authenticationServerURL);
      tmp.push(this.currentOrganization.lastChangeDate);

      if (this.checkStringValidity(this.name)) {
        this.currentOrganization.name = this.name;
      } else {
        this.flagError = true;
      }

      if (this.checkStringValidity(this.street)) {
        this.currentOrganization.street = this.street;
      } else {
        this.flagError = true;
      }

      if (this.checkStringValidity(this.number)) {
        this.currentOrganization.number = this.number;
      } else {
        this.flagError = true;
      }

      if (this.checkNumberValidity(this.postCode)) {
        this.currentOrganization.postCode = this.postCode;
      } else {
        this.flagError = true;
      }

      if (this.checkStringValidity(this.city)) {
        this.currentOrganization.city = this.city;
      } else {
        this.flagError = true;
      }

      if (this.checkStringValidity(this.country)) {
        this.currentOrganization.country = this.country;
      } else {
        this.flagError = true;
      }

      if (this.checkStringValidity(this.descr)) {
        this.currentOrganization.description = this.descr;
      } else {
        this.flagError = true;
      }

      if (this.currentOrganization.trackingMode === 'authenticated') {
        if (this.checkStringValidity(this.indIPLDAP)) {
          this.currentOrganization.authenticationServerURL = this.indIPLDAP;
        } else {
          this.flagError = true;
        }
      }

      if (this.responses[0] != null && this.flag) {
        this.currentOrganization.image = this.responses[0].data.secure_url;
        if (this.currentOrganization.image === undefined) {
          alert('immagine inserita troppo pesante, per favore carica un immagine meno pesante');
          this.flagError = true;
        }
      }
      if (!this.flagError) {
        this.currentOrganization.lastChangeDate = d;
        this.orgS.updateOrganization(this.currentOrganization).subscribe(() => {
          alert('Modifica all\'organizzazione effettuata.');
        }, (err: HttpErrorResponse) => {
          this.currentOrganization.name = tmp[0];
          this.currentOrganization.description = tmp[1];
          this.currentOrganization.image = tmp[2];
          this.currentOrganization.street = tmp[3];
          this.currentOrganization.number = tmp[4];
          this.currentOrganization.postCode = tmp[5];
          this.currentOrganization.city = tmp[6];
          this.currentOrganization.country = tmp[7];
          this.currentOrganization.authenticationServerURL = tmp[8];
          this.currentOrganization.lastChangeDate = tmp[9];
          if (err.status === 400) {
            alert('Errore. I dati inseriti non sono validi');
          } else {
            alert(err.message);
          }
          this.name = this.currentOrganization.name;
          this.street = this.currentOrganization.street;
          this.number = this.currentOrganization.number;
          this.postCode = this.currentOrganization.postCode;
          this.city = this.currentOrganization.city;
          this.country = this.currentOrganization.country;
          this.descr = this.currentOrganization.description;
          this.indIPLDAP = this.currentOrganization.authenticationServerURL;
        });
      } else {
        this.currentOrganization.name = tmp[0];
        this.currentOrganization.description = tmp[1];
        this.currentOrganization.image = tmp[2];
        this.currentOrganization.street = tmp[3];
        this.currentOrganization.number = tmp[4];
        this.currentOrganization.postCode = tmp[5];
        this.currentOrganization.city = tmp[6];
        this.currentOrganization.country = tmp[7];
        this.currentOrganization.authenticationServerURL = tmp[8];
        this.currentOrganization.lastChangeDate = tmp[9];
      }
      this.flagError = false;
      this.flag = false;
  }

  /*
  Check if the input string is valid
   */
  checkStringValidity(str: string) {
    return str !== undefined && str !== null && str.trim().length > 0;
  }

  /*
   Check if the input number is valid
   */
  checkNumberValidity(x: number) {
    return x !== undefined && x !== null && x > 0;
  }
  /*
  Remove data of organization through API method
   */
  onRemove() {
    const delReq: OrganizationDeletionRequest = {
      organizationId: this.currentOrganization.id,
      requestReason: this.descrR,
      administratorId: localStorage.getItem('uid')
    };
    this.orgS.requestDeletionOfOrganization(delReq).subscribe(() => { alert('Richiesta di eliminazione inviata.'); }, (err: HttpErrorResponse) => {
      if (err.status === 400) {
        alert('Errore. I dati inseriti non sono validi' + err.message);
      } else {
        if (err.status === 403) {
          alert('Errore. Non hai i permessi per cancellare l\'organizzazione');
        } else {
          alert(err.message);
        }
      }
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
