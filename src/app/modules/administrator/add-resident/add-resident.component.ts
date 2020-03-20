import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ResidentDto } from 'src/app/core/models/ResidentDto.model';
import { RepositoryService } from 'src/app/core/services/repository.service';

@Component({
  selector: 'app-add-resident',
  templateUrl: './add-resident.component.html',
  styleUrls: ['./add-resident.component.css']
})
export class AddResidentComponent implements OnInit {

  @Output() closeModalAddResident = new EventEmitter<any>();
  residentDto: ResidentDto = new ResidentDto();
  button;
  modal: HTMLElement;
  fields;
  loading;
  textButton = 'Guardar';
  messageGood = 'El residente se acaba de guardar con exito!';
  messageFail = 'Ocurrio un error al guardar el residente';
  goodSave;
  showMessage;
  constructor(private requestService: RepositoryService) { }

  ngOnInit() {
    this.modal = document.getElementById("myModal");
    this.button = document.getElementById('btn-save');
  }

  validateButton(){
    this.fields = false;
    this.button.className = 'btn-login-block';

    const patternTowel = /[0-9]{1,2}-[0-9][0-9][0-9]/g;
    let towelPass = patternTowel.test(String(this.residentDto.towerNumberHome));

    const patternDocument = /^[0-9]+$/g;
    let documentPass = patternDocument.test(String(this.residentDto.documentNumber));

    const patternCellphone = '^[3].{2}[1-9]\\d{6}$';
    let validCellphone = false;

    if (this.residentDto.cellphone) {
      validCellphone = !!this.residentDto.cellphone.match(patternCellphone);
    }

    if(validCellphone && this.residentDto.debt
      && documentPass && this.residentDto.months
      && this.residentDto.name && towelPass){
      this.fields = true;
      this.button.className = 'btn-send';
    }
    return this.fields;
  }

  saveResident(residentDto: ResidentDto){
    this.setValuesBeforeSave();
    console.log('residentdto: ', residentDto);
    residentDto.cellphone = '+57'+residentDto.cellphone;
    this.requestService.saveResident(residentDto).then(response =>{
      this.setValuesWhenSave();
      console.log('Residente guardado');
      this.goodSave=true;
    }, error =>{
      this.setValuesWhenSave(error);
      this.goodSave=false;
    });
  }

  setValuesBeforeSave(){
    this.messageGood = 'El residente se acaba de guardar con exito!';
    this.messageFail = 'Ocurrio un error al guardar el residente';
    this.textButton = 'Guardando';
    this.loading = true;
  }

  setValuesWhenSave(error?){
    this.loading=false;
    this.textButton = 'Guardar';
    this.showMessage=true;
    if(!error){
      this.residentDto.cellphone = '';
      this.residentDto.debt = undefined;
      this.residentDto.documentNumber = '';
      this.residentDto.months = undefined;
      this.residentDto.name = '';
      this.residentDto.towerNumberHome = '';
    }
    setTimeout(() => {
      this.messageGood = '';
      this.messageFail = '';
    }, 6000);
  }


  spanClick() {
    this.closeModalEvent();
  }

  closeModalEvent(){
    this.modal.style.display = "none";
    this.closeModalAddResident.emit(false);
  }

}
