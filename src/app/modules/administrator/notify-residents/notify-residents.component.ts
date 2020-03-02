import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/core/services/repository.service';
import { ResidentDto } from 'src/app/core/models/ResidentDto.model';

@Component({
  selector: 'app-notify-residents',
  templateUrl: './notify-residents.component.html',
  styleUrls: ['./notify-residents.component.css']
})
export class NotifyResidentsComponent implements OnInit {

  uploadFile: boolean;
  residentList = Array<ResidentDto>();
  showList: boolean;

  constructor(private requestService: RepositoryService) { }

  ngOnInit() {
    this.getAllResidents();
  }
  getAllResidents(){
    this.requestService.getAllResidents().then(response =>{
        console.log('residentes: ', response);
        this.residentList = response;
       this.uploadFile = (response === null);
       this.showList = (response !== null);
    }, error =>{
        console.log('entra al error');
    });
  }
  public getDataExcel(dataExcel){
    console.log('llego la data del excel: ', dataExcel);
    const dataLenght = Object.keys(dataExcel).length;

    this.showList =(dataLenght>=1);

    for(let i=0; i<dataLenght; i++){
      var residente = new ResidentDto();
      residente.towerNumberHome=dataExcel[i].torre + '-' + dataExcel[i].apartamento;
      residente.name = dataExcel[i].nombre;
      residente.cellphone = '+57'+dataExcel[i].celular+'';
      residente.documentNumber = dataExcel[i].documento+'';
      this.residentList.push(residente);
    }
    console.log('lista final: ',this.residentList);

    this.saveResideents();
  }
  saveResideents(){
    this.requestService.saveResidents(this.residentList).then(response =>{
      console.log('SE GUARDARON LOS RESIDENTES: ', response);
    }, error =>{

    });
  }
}
