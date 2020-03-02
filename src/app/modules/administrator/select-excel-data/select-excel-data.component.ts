import { Component, ViewChild, OnInit, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import { UploaderComponent} from '@syncfusion/ej2-angular-inputs';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import * as XLSX from 'xlsx';
import { Dialog } from '@syncfusion/ej2-popups';
import { createElement } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-select-excel-data',
  templateUrl: './select-excel-data.component.html',
  styleUrls: ['./select-excel-data.component.css']
})
export class SelectExcelDataComponent implements OnInit {

  @Output() dataExcel = new EventEmitter<any>();
  @ViewChild('defaultupload', {static: false})
  uploadObj: UploaderComponent;
  @ViewChild('grid', {static: false})

  gridObj: GridComponent;
  dialog: Dialog;
  debt: boolean;
  public dropEle: HTMLElement ;
  files;
  XL_row_object;

  public path: Object = {
    saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
    removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
  };

  public uploadEle: HTMLElement = createElement('span', { className: 'upload e-icons', innerHTML : 'Browse...'});
   public clearEle = createElement('span', { className: 'remove e-icons', innerHTML : 'Clear All' });
   public buttons: Object = {
    browse: 'Subir',
    clear: this.clearEle,
    upload: this.uploadEle
   };

  ngOnInit(): void {
    this.dropEle = document.getElementById('droparea');
    // borrar esto
    this.dialog = new Dialog({
      header: 'Dialog',
      showCloseIcon: true,
      visible: true,
      target: document.getElementById('container'),
    });
    this.dialog.appendTo('#dialog');
  }

  public onUploadSuccess(args: any): void  {
    if (args.operation === 'upload') {
      console.log('Archivo subido correctamente!');
      this.parseExcel(this.files[0]);
    }
  }

  public onUploadFailure(args: any): void  {
    console.log('Error al subir el archivo');
  }

  public onFileRemove(args): void {
    args.cancel = true;
  }

  parseExcel(file) {
    console.log('dataExcelEvent1: ', this.dataExcel);
    console.log('file: ', file);
    let reader = new FileReader();
    reader.onload = (e) => {
      const data = ( e.target as any).result;
      const workbook = XLSX.read(data, {
        type: 'binary'
      });
      workbook.SheetNames.forEach((function(sheetName) {
        this.XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        this.sendEvent();
      }).bind(this), this);
    };

    reader.onerror = function(ex) {
      console.log(ex);
    };
    reader.readAsBinaryString(file);
  }

  sendEvent(){
    this.dataExcel.emit(this.XL_row_object);
  }

  public onSuccess(args: any): void {
    console.log('args: ', args);
    this.files = args.target.files;
  }
}
