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
  goodSave;
  showMessage;
  constructor(private requestService: RepositoryService) { }

  ngOnInit() {
    this.modal = document.getElementById("myModal");
    this.button = document.getElementById('btn-save');
  }

  validateField(){
    this.fields = false;
    this.button.className = 'btn-login-block';
    if(this.residentDto.cellphone && this.residentDto.debt
      && this.residentDto.documentNumber && this.residentDto.months
      && this.residentDto.name && this.residentDto.towerNumberHome){
      this.fields = true;
      this.button.className = 'btn-send';
    }
    return this.fields;
  }

  saveResident(residentDto: ResidentDto){
    this.textButton = 'Guardando';
    this.loading = true;
    console.log('residentdto: ', residentDto);
    residentDto.cellphone = '+57'+residentDto.cellphone;
    this.requestService.saveResident(residentDto).then(response =>{
      this.setValuesWhenSave();
      console.log('Residente guardado');
      this.goodSave=true;
    }, error =>{
      this.setValuesWhenSave();
      this.goodSave=false;
    });
  }

  setValuesWhenSave(){
    this.loading=false;
    this.textButton = 'Guardar';
    this.showMessage=true;
  }

    
  spanClick() {
    this.closeModalEvent();
  }

  closeModalEvent(){
    this.modal.style.display = "none";
    this.closeModalAddResident.emit(false);
  }

}
