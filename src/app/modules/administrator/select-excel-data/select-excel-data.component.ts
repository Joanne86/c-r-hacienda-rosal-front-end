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
  public uploadObj: UploaderComponent;
  @ViewChild('grid', {static: false})
  public gridObj: GridComponent;
  public dialog: Dialog;

  public path: object = {
    saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
    removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
  };

  public dropElement: HTMLElement = document.getElementsByClassName('control-fluid')[0] as HTMLElement;

  public onFileRemove(args): void {
    args.cancel = true;
  }

  ngOnInit(): void {

    this.dialog = new Dialog({
      // Enables the header
      header: 'Dialog',
      // Enables the close icon button in header
      showCloseIcon: true,
      visible: false,
      // Dialog content
      content: this.uploadObj.element,
      // The Dialog shows within the target element
      target: document.getElementById('container'),
      // Dialog width
      width: '250px'
    });
    this.dialog.appendTo('#dialog');
  }

  parseExcel(file) {
    // tslint:disable-next-line:prefer-const
    let reader = new FileReader();
    reader.onload = (e) => {
      const data = ( e.target as any).result;
      const workbook = XLSX.read(data, {
        type: 'binary'
      });
      workbook.SheetNames.forEach((function(sheetName) {
        // Here is your object
        // tslint:disable-next-line:variable-name
        const XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        // tslint:disable-next-line:variable-name
        const json_object = JSON.stringify(XL_row_object);
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
    const files = args.target.files; // FileList object
    this.parseExcel(files[0]);
  }

  importFile(e) {
    this.dialog.show();
  }

}
