import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;

  columnDefs = [
    {headerName: 'Make', field: 'make', sortable: true, filter: true, checkboxSelection: true},
    {headerName: 'Model', field: 'model', sortable: true, filter: true},
    {headerName: 'Price', field: 'price', sortable: true, filter: true}
  ];

  rowData: any
  constructor(private http: HttpClient)
  { }

  ngOnInit(): void {
    this.rowData = this.http.get('https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/sample-data/smallRowData.json');
  }
  getSelectedRows() {
       const selectedNodes = this.agGrid.api.getSelectedNodes();
       const selectedData = selectedNodes.map( node => node.data );
       const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ');
       alert(`Selected nodes: ${selectedDataStringPresentation}`);
   }

}
