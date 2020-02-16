import { Component, ViewChild, OnInit, ViewEncapsulation} from '@angular/core';
import { UploaderComponent} from '@syncfusion/ej2-angular-inputs';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import * as XLSX from 'xlsx';
import { Dialog } from '@syncfusion/ej2-popups';

@Component({
  selector: 'app-select-excel-data',
  templateUrl: './select-excel-data.component.html',
  styleUrls: ['./select-excel-data.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SelectExcelDataComponent implements OnInit {

  @ViewChild('defaultupload', {static: false})
  uploadObj: UploaderComponent;
  @ViewChild('grid', {static: false})
  gridObj: GridComponent;
  dialog: Dialog;
  debt: boolean;
  public dropEle: HTMLElement ;
  files;

  // tslint:disable-next-line:ban-types
  public path: Object = {
    saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
    removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove' };
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

  ngOnInit(): void {
    this.dropEle = document.getElementById('droparea');
    // borrar esto
    this.dialog = new Dialog({
      // Enables the header
      header: 'Dialog',
      // Enables the close icon button in header
      showCloseIcon: true,
      visible: false,
      // Dialog content
      //content: this.uploadObj.element,
      // The Dialog shows within the target element
      target: document.getElementById('container'),
      // Dialog width
      width: '250px'
    });
    this.dialog.appendTo('#dialog');
  }

  parseExcel(file) {
    console.log('file: ', file);
    // tslint:disable-next-line:prefer-const
    let reader = new FileReader();
    reader.onload = (e) => {
      const data = ( e.target as any).result;
      const workbook = XLSX.read(data, {
        type: 'binary'
      });
      workbook.SheetNames.forEach((function(sheetName) {
        const XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        // tslint:disable-next-line:variable-name
        console.log('response: ', XL_row_object);
        const json_object = JSON.stringify(XL_row_object);
        // este objeto tiene que ser una clase json_object hay que hacer validaciones
        console.log(json_object);
        this.gridObj.dataSource = JSON.parse(json_object);
        this.uploadObj.clearAll();
        this.dialog.hide();

      }).bind(this), this);
    };

    // tslint:disable-next-line:only-arrow-functions
    reader.onerror = function(ex) {
      console.log(ex);
    };
    reader.readAsBinaryString(file);
  }

  public onSuccess(args: any): void {
    console.log('args: ', args);
    this.files = args.target.files;
  }
}
