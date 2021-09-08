import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { sampleData } from "./data";
import {
  SortService,
  ResizeService,
  PageService,
  EditService,
  ExcelExportService,
  PdfExportService,
  ContextMenuService,
  TreeGridComponent,
} from "@syncfusion/ej2-angular-treegrid";
import { ContextMenu } from "@syncfusion/ej2-navigations";
import { ContextMenuComponent } from "@syncfusion/ej2-angular-navigations";
import { EmitType, getInstance } from "@syncfusion/ej2-base";
import { ContextMenuClickEventArgs } from "@syncfusion/ej2-grids";
import { DialogComponent , ButtonPropsModel } from "@syncfusion/ej2-angular-popups";

import { Column } from "@syncfusion/ej2-grids";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.css"],
  providers: [
    SortService,
    ResizeService,
    PageService,
    EditService,
    ExcelExportService,
    PdfExportService,
    ContextMenuService,
  ],
})
export class AppComponent implements OnInit {
  @ViewChild("Dialog") public dialogObj: DialogComponent;

  @ViewChild("addColumn") public addColumnObj: DialogComponent;

  @ViewChild("editColumn") public EditColumnObj: DialogComponent;

  @ViewChild("deleteDialog") public DeleteDialog: DialogComponent;


  public data: Object[] = [];
  public contextMenuItems: Object[];
  // public editing: EditSettingsModel; [editSettings]="editing"
  public editparams: Object;

  public editSettings: Object;
  public toolbar: string[];

  allowRowDragAndDrop: boolean = true;

  selectedColumnFieldName: string;
  frozenColumns: number;
  allowSorting: boolean = false;
  allowFiltering: boolean = false;
  filterSettings: any = {
    type: "FilterBar",
    hierarchyMode: "Parent",
    mode: "Immediate",
  };
  public selectOptions: Object;
  // customAttributes = { taskID: {}, taskName: {}, startDate: {}, endDate: {}, duration: {}, progress: {}, priority: {} };
  customAttributes = { taskID: { class: "customcss" } };

  @ViewChild("treegrid")
  public treeGridObj: TreeGridComponent;

  @ViewChild("contextmenu")
  public cmenu: ContextMenuComponent;

  // style dialog
  public dialogAnimation: Object = { effect: "None" };
  public closeOnEscape: boolean = false;
  public width: string = "335px";
  public visible: boolean = false;
  public multiple: boolean = false;
  public showCloseIcon: Boolean = true;
  public formHeader: string = "Success";
  public contentData: string =
    "Your details have been updated successfully, Thank you.";
  public target: string = "#FormDialog";
  public isModal: boolean = true;
  public animationSettings: object = {
    effect: "Zoom",
  };
  public uploadInput: string = "";
  public dialogWidth = '330px';
  public dlgBtnClick: EmitType<object> = () => {
    this.dialogObj.hide();
    this.addColumnObj.hide();
    this.EditColumnObj.hide();
  };
  public dlgButtons: Object[] = [
    {
      click: this.dlgBtnClick.bind(this),
      buttonModel: { content: "Ok", isPrimary: true },
    },
  ];
  @ViewChild("formElement") element: any;

  // column style fields
  editHeaderTextWrap: string;
  dataType: string = "string";
  fontSize: number = 12;
  headerFontColor: string = "rgba(0,0,0,0.54)";
  rowFontColor: string = "#000000";
  headerBGColor: string = "#ffffff";
  rowBGColor: string = "#ffffff";
  alignment: string = "left";
  textWrap: boolean = false;

  allowTextWrap: boolean = false;

  isHeaderContextMneu: boolean = false;
  isRowContextMneu: boolean = false;
  public deleteDiaContentData = "Are you sure you want delete?";

  public buttons: Object = [
    {
      'click': this.deleteColumn.bind(this),
      // Accessing button component properties by buttonModel property
        buttonModel:{
        content: 'OK',
        // Enables the primary button
        isPrimary: true
      }
    },
    {
      'click': this.closeDialogMenu.bind(this),
      buttonModel: {
        content: 'Cancel'
      }
    }
      ];

  ngAfterViewInit() {
    // this.treeGridObj.allowTextWrap = true;
    // this.treeGridObj.selectionSettings = { type: 'Multiple', mode: 'Row', cellSelectionMode: 'Flow' };
    // this.treeGridObj.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Batch' };
  }

  ngOnInit(): void {
    this.data = sampleData;

    this.editSettings = {
      allowAdding: true,
      allowEditing: true,
      allowDeleting: true,
      mode: "Dialog",
    };
    this.toolbar = ["Add", "Edit", "Delete"];

    this.contextMenuItems = [
      // For columns
      {
        text: "Style",
        id: "style",
        //target: ".e-headercontent",
        // items: [
        //   {
        //     text: "Data Type",
        //     id: "data-type",
        //     items: [
        //       { text: "String", id: "string" },
        //       { text: "Number", id: "number" },
        //     ],
        //   },
        //   {
        //     text: "Font",
        //     id: "font",
        //     items: [
        //       { text: "Font Weight", id: "font-weight" },
        //       { text: "Font Size", id: "font-size" },
        //     ],
        //   },
        //   {
        //     text: "Color",
        //     id: "color",
        //     items: [
        //       { text: "Blue", id: "blue" },
        //       { text: "Default", id: "default" },
        //     ],
        //   },
        //   {
        //     text: "Alignment",
        //     id: "alignment",
        //     items: [
        //       { text: "Left", id: "left" },
        //       { text: "Right", id: "right" },
        //     ],
        //   },
        //   {
        //     text: "Text-wrap",
        //     id: "text-wrap",
        //     items: [
        //       { text: "Break", id: "break" },
        //       { text: "Normal", id: "normal" },
        //     ],
        //   },
        // ],
      },
      {
        text: "Freeze On/Off",
        id: "freeze",
        //target: ".e-headercontent",
        items: [
          { text: "Freeze On", id: "freeze-on" },
          { text: "Freeze Off", id: "freeze-off" },
        ],
      },
      {
        text: "Filter On/Off",
        //target: ".e-headercontent",
        id: "filter",
        items: [
          { text: "Filter On", target: ".e-content", id: "filter-on" },
          { text: "Filter Off", target: ".e-content", id: "filter-off" },
        ],
      },
      {
        text: "Multi-Sort On/Off",
        //target: ".e-headercontent",
        id: "multi-sort",
        items: [
          { text: "Multi-Sort On", target: ".e-content", id: "multi-sort-on" },
          {
            text: "Multi-Sort Off",
            target: ".e-content",
            id: "multi-sort-off",
          },
        ],
      },
      {
        text: "Action",
        // target: ".e-headercontent",
        id: "add-del-edit-column",
        items: [
          { text: "Add column", id: "add-column" },
          { text: "Edit column", id: "edit-column" },
          { text: "Delete column", id: "del-column" },
        ],
      },

      // For rows
      {
        text: "Multi-Select On/Off",
        id: "multi-select",
        items: [
          { text: "Multi-Select On", id: "multi-select-on" },
          {
            text: "Multi-Select Off",
            id: "multi-select-off",
          },
        ],
      },
      { text: "Copy & Cut", target: ".e-content", id: "copy-cut" },
      {
        text: "Paste as Sibling",
        target: ".e-content",
        id: "paste-as-sibling",
      },
      { text: "Paste as Child", id: "paste-as-child" },
      {
        text: "Action",
        id: "add-del-edit-row",
        items: [
          { text: "Add Row", id: "add-row" },
          {
            text: "Edit Row",
            id: "edit-row",
          },
          { text: "Delete Row", id: "delete-row" },
        ],
      },
    ];

    // this.editing = { allowDeleting: true, allowEditing: true, mode: "Row" };
    this.editparams = { params: { format: "n" } };
  }


  // createCustomStyles(styles: string): void {
  //   const style = document.createElement('style');
  //   style.innerHTML = `.e-treegrid .e-headercell.customcss {
  //     ${styles}
  //     }

  //     .e-treegrid .e-rowcell.customcss{
  //       background-color: #ecedee;
  //   }
  //   `;
  //   document.getElementsByTagName('head')[0].appendChild(style);
  // }

  closeDialogMenu(): void {
    if (this.dialogObj) {
      this.dialogObj.hide();
      this.addColumnObj.hide();
      this.EditColumnObj.hide();
      this.DeleteDialog.hide();
    }
  }

  closeContextMenu(): void {
    let contextmenuObj: ContextMenu = getInstance(
      document.getElementById("treegridcomp_gridcontrol_cmenu"),
      ContextMenu
    ) as ContextMenu;
    contextmenuObj.close();
  }

  setCellAlignment(position: string): void {
    const column = this.treeGridObj.getColumnByField(
      this.selectedColumnFieldName
    );
    const style = document.createElement("style");
    style.innerHTML = `.e-treegrid .${this.selectedColumnFieldName} .e-headercelldiv { 
      text-align: ${position};
      }

      .e-treegrid .${this.selectedColumnFieldName} .e-treecolumn-container{
        text-align: ${position};
    }
    `;
    document.getElementsByTagName("head")[0].appendChild(style);
    column.customAttributes = { class: "customcss" };
    column.type = "string";
    this.treeGridObj.refreshColumns();
  }

  onSubmitAddColumnForm(addColumnForm): void {
    this.closeDialogMenu();
    this.addColumn(addColumnForm.value);
  }

  onSubmitStyleForm(): void {
    this.closeDialogMenu();
    const column = this.treeGridObj.getColumnByField(
      this.selectedColumnFieldName
    );
    const style = document.createElement("style");
    style.innerHTML = `.e-treegrid .e-headercell.${
      this.selectedColumnFieldName
    } { 
            background-color: ${this.headerBGColor};
            color: ${this.headerFontColor};
            }

            .e-treegrid .${this.selectedColumnFieldName} .e-headercelldiv { 
              text-align: ${this.alignment} !important;
              font-size: ${this.fontSize}px;
              white-space: ${
                this.textWrap === (true || "true") ? "normal" : "nowrap"
              } !important;
            }

            .e-treegrid .e-rowcell.${this.selectedColumnFieldName} {
              background-color: ${this.rowBGColor};
              font-size: ${this.fontSize}px;
              text-align: ${this.alignment} !important;
              color: ${this.rowFontColor};
            }

            .e-treegrid .e-rowcell.${this.selectedColumnFieldName} .e-treecell {
              white-space: ${
                this.textWrap === (true || "true") ? "normal" : "nowrap"
              } !important;
            }
          `;
    document.getElementsByTagName("head")[0].appendChild(style);
    column.customAttributes = { class: this.selectedColumnFieldName };
    column.type = this.dataType;

    this.treeGridObj.refreshColumns();
    // this.treeGridObj.allowTextWrap = true;
  }

  contextMenuClick(args?: ContextMenuClickEventArgs): void {
    let ele: Element = args.event.target as Element;

    let eleId: string = ele.id;
    let rowInfo: any = args.rowInfo;
    const column = this.treeGridObj.getColumnByField(
      this.selectedColumnFieldName
    );

    const headercell: any = document.getElementsByClassName(
      `e-headercell ${this.selectedColumnFieldName}`
    );
    const headercelldivParent: any = document.getElementsByClassName(
      `${this.selectedColumnFieldName}`
    );
    const headercelldiv: any =
      headercelldivParent[0]?.getElementsByClassName("e-headercelldiv");
    const rowcellParent: any = document?.getElementsByClassName(
      `e-rowcell ${this.selectedColumnFieldName}`
    );
    const rowcell: any = rowcellParent[0]?.getElementsByClassName(`e-rowcell`);
    const treecell: any = document.getElementsByClassName(
      `${this.selectedColumnFieldName} e-treecell`
    );

    // if (headercell?.length) {
    //   const headerBGColor = headercell[0].style?.backgroundColor;
    //   const color = headercell[0].style?.backgroundColor;
    // }

    // if (headercelldiv?.length) {
    //   const alignment = headercelldiv[0].style?.textAlign;
    //   const fontSize = headercelldiv[0].style?.fontSize;
    // }

    if (eleId === "style") {
      this.dataType = column.type;
      this.fontSize = 12;
      this.headerFontColor = "rgba(0,0,0,0.54)";
      this.rowFontColor = "#000000";
      this.headerBGColor = "#ffffff";
      this.rowBGColor = "#ffffff";
      this.alignment = "left";
      this.textWrap = false;
      this.dialogObj.show();
      this.closeContextMenu();
      return;
    }

    switch (rowInfo.target.id) {
      case "color":
        {
          column.customAttributes = { class: "customcss" };
          this.treeGridObj.refreshColumns();

          if (eleId === "blue") {
            const style = document.createElement("style");
            style.innerHTML = `.e-treegrid .e-headercell.customcss { 
            background-color: #2382c3;
            color: white;
            }

            .e-treegrid .e-rowcell.customcss{
              background-color: #ecedee;
          }
          `;
            document.getElementsByTagName("head")[0].appendChild(style);
          }

          if (eleId === "default") {
            column.customAttributes = { class: "none" };
            this.treeGridObj.refreshColumns();
          }
        }
        break;

      case "freeze":
        {
          if (eleId === "freeze-on") {
            this.freezeOnColumns(args);
          } else if (eleId === "freeze-off") {
            this.freezeOffColumns();
          }
        }
        break;

      case "filter":
        {
          if (eleId === "filter-on") {
            this.allowFiltering = true;
          } else if (eleId === "filter-off") {
            this.allowFiltering = false;
          }
        }
        break;

      case "multi-sort":
        {
          if (eleId === "multi-sort-on") {
            this.allowSorting = true;
          } else if (eleId === "multi-sort-off") {
            this.allowSorting = false;
          }
        }
        break;

      case "multi-select":
        {
          if (eleId === "multi-select-on") {
            this.selectOptions = { type: "Multiple" };
          } else if (eleId === "multi-select-off") {
            this.selectOptions = { type: "Single" };
          }
        }
        break;

      case "add-del-edit-row": {
        if (eleId === "add-row") {
          document.getElementById("treegridcomp_gridcontrol_add").click();
        } else if (eleId === "edit-row") {
          document.getElementById("treegridcomp_gridcontrol_edit").click();
        } else if (eleId === "delete-row") {
          document.getElementById("treegridcomp_gridcontrol_delete").click();
        }
      }

      case "add-del-edit-column": {
        if (eleId === "add-column") {
          this.addColumnObj.show();
        } else if (eleId === "edit-column") {
          this.EditColumnObj.show();
          this.editHeaderTextWrap = column.headerText;
        } else if (eleId === "del-column") {
         this.DeleteDialog.show();
        }
      }
    }

    // if (elem.id === "freeze-on") {
    //   this.freezeOnColumns(args);
    // }
  }

  deleteColumn()
  {
    const column = this.treeGridObj.getColumnByField(
      this.selectedColumnFieldName
    );
    column.visible = false;
    this.treeGridObj.refreshColumns();
    this.DeleteDialog.hide();
  }

  onSubmitEditColumnForm(form) {
    this.EditColumnObj.hide();
    const column = this.treeGridObj.getColumnByField(
      this.selectedColumnFieldName
    );

    this.treeGridObj.columns[column["index"]]["headerText"] =
      form.value.editHeaderText;

    this.treeGridObj.refreshColumns();
  }

  setFilterSettings(): void {
    this.filterSettings = {
      type: "FilterBar",
      hierarchyMode: "Parent",
      mode: "Immediate",
    };
  }

  freezeOnColumns(args: any): void {
    const columnIndex = this.treeGridObj.getColumns().findIndex((col) => {
      return col.field === this.selectedColumnFieldName;
    });
    this.frozenColumns = columnIndex;
    // if (
    //   this.treeGridObj.getColumns().length - 1 >
    //   this.treeGridObj.getFrozenColumns()
    // ) {
    //   for (let i = 0; i < this.treeGridObj.getVisibleColumns().length; i++) {
    //     if (args.element.id === this.treeGridObj.getVisibleColumns()[i].field) {
    //       this.treeGridObj.getVisibleColumns()[i].isFrozen = true;
    //     }
    //   }
    //   this.treeGridObj.refreshColumns();
    // } else {
    //   args.cancel = true;
    // }
  }

  addColumn(value) {
    if (value.field && value.headerText) {
      let c = <Column[]>[
        {
          field: value.field,
          headerText: value.headerText,
          width: 80,
          textAlign: "Center",
        },
      ];
      for (let i: number = 0; i < c.length; i++) {
        (this.treeGridObj.columns as Column[]).push(c[i]);
        this.treeGridObj.refreshColumns();
      }
    }
  }

  freezeOffColumns(): void {
    this.frozenColumns = 0;
  }

  // contextMenuOpen1(arg?: any): void {
  //   let uid: string;
  //   let columnIndex: number;
  //   let columnFieldName: string;
  //   const classList = arg.rowInfo.target.className.split(" ");

  //   if (classList[0] === "e-headercell") {
  //     columnIndex = +arg.rowInfo.target.getAttribute("aria-colindex");
  //     columnFieldName = this.treeGridObj.getColumns()[columnIndex].field;
  //   } else if (classList[0] === "e-headercelldiv") {
  //     uid = arg.rowInfo.target.getAttribute("e-mappinguid");
  //     if (uid) {
  //       columnFieldName = this.treeGridObj.getColumnByUid(uid)?.field;
  //     }
  //   } else if (classList[0] === "e-headertext") {
  //     uid = arg.rowInfo.target.parentNode.getAttribute("e-mappinguid");
  //     if (uid) {
  //       columnFieldName = this.treeGridObj.getColumnByUid(uid)?.field;
  //     }
  //   }

  //   if (columnFieldName) {
  //     this.selectedColumnFieldName = columnFieldName;
  //   }

  //   let elem: Element = arg.event.target as Element;
  //   let items: Array<HTMLElement> = [].slice.call(
  //     document.querySelectorAll(".e-menu-item")
  //   );
  //   for (let i: number = 0; i < items.length; i++) {
  //     items[i].setAttribute("style", "display: none;");
  //   }
  //   // if (elem.closest(".e-row")) {
  //   // document
  //   //   .querySelectorAll("li#multi-select")[0]
  //   //   ?.setAttribute("style", "display: block;");
  //   // document
  //   //   .querySelectorAll("li#multi-select-on")[0]
  //   //   ?.setAttribute("style", "display: block;");
  //   // document
  //   //   .querySelectorAll("li#multi-select-off")[0]
  //   //   ?.setAttribute("style", "display: block;");

  //   // document
  //   //   .querySelectorAll("li#copy-cut")[0]
  //   //   ?.setAttribute("style", "display: block;");
  //   // document
  //   //   .querySelectorAll("li#paste-as-sibling")[0]
  //   //   ?.setAttribute("style", "display: block;");
  //   // document
  //   //   .querySelectorAll("li#paste-as-child")[0]
  //   //   ?.setAttribute("style", "display: block;");

  //   // document
  //   //   .querySelectorAll("li#add-del-edit-row")[0]
  //   //   ?.setAttribute("style", "display: block;");
  //   // document
  //   //   .querySelectorAll("li#add-row")[0]
  //   //   ?.setAttribute("style", "display: block;");
  //   // document
  //   //   .querySelectorAll("li#edit-row")[0]
  //   //   ?.setAttribute("style", "display: block;");
  //   // document
  //   //   .querySelectorAll("li#delete-row")[0]
  //   //   ?.setAttribute("style", "display: block;");

  //   // }
  //   if (elem.closest(".e-row")) {
  //     // column

  //     // style
  //     document
  //       .querySelectorAll("li#style")[0]
  //       ?.setAttribute("style", "display: block;");

  //     // data type
  //     document
  //       .querySelectorAll("li#data-type")[0]
  //       ?.setAttribute("style", "display: block;");
  //     document
  //       .querySelectorAll("li#string")[0]
  //       ?.setAttribute("style", "display: block;");
  //     document
  //       .querySelectorAll("li#number")[0]
  //       ?.setAttribute("style", "display: block;");

  //     // font
  //     document
  //       .querySelectorAll("li#font")[0]
  //       ?.setAttribute("style", "display: block;");
  //     document
  //       .querySelectorAll("li#font-weight")[0]
  //       ?.setAttribute("style", "display: block;");
  //     document
  //       .querySelectorAll("li#font-size")[0]
  //       ?.setAttribute("style", "display: block;");

  //     // color
  //     document
  //       .querySelectorAll("li#color")[0]
  //       ?.setAttribute("style", "display: block;");
  //     document
  //       .querySelectorAll("li#blue")[0]
  //       ?.setAttribute("style", "display: block;");
  //     document
  //       .querySelectorAll("li#default")[0]
  //       ?.setAttribute("style", "display: block;");

  //     // alignment
  //     document
  //       .querySelectorAll("li#alignment")[0]
  //       ?.setAttribute("style", "display: block;");
  //     document
  //       .querySelectorAll("li#left")[0]
  //       ?.setAttribute("style", "display: block;");
  //     document
  //       .querySelectorAll("li#right")[0]
  //       ?.setAttribute("style", "display: block;");

  //     document
  //       .querySelectorAll("li#text-wrap")[0]
  //       ?.setAttribute("style", "display: block;");

  //     // freeze
  //     document
  //       .querySelectorAll("li#freeze")[0]
  //       ?.setAttribute("style", "display: block;");
  //     document
  //       .querySelectorAll("li#freeze-on")[0]
  //       ?.setAttribute("style", "display: block;");
  //     document
  //       .querySelectorAll("li#freeze-off")[0]
  //       ?.setAttribute("style", "display: block;");

  //     // filter
  //     document
  //       .querySelectorAll("li#filter")[0]
  //       ?.setAttribute("style", "display: block;");
  //     document
  //       .querySelectorAll("li#filter-on")[0]
  //       ?.setAttribute("style", "display: block;");
  //     document
  //       .querySelectorAll("li#filter-off")[0]
  //       ?.setAttribute("style", "display: block;");

  //     // multi-sort
  //     document
  //       .querySelectorAll("li#multi-sort")[0]
  //       ?.setAttribute("style", "display: block;");
  //     document
  //       .querySelectorAll("li#multi-sort-on")[0]
  //       ?.setAttribute("style", "display: block;");
  //     document
  //       .querySelectorAll("li#multi-sort-off")[0]
  //       ?.setAttribute("style", "display: block;");

  //     document
  //       .querySelectorAll("li#add-del-edit-column")[0]
  //       ?.setAttribute("style", "display: block;");
  //   }
  // }

  contextMenuOpen(arg?: any): void {
    let uid: string;
    let columnIndex: number;
    let columnFieldName: string;
    const classList = arg.rowInfo.target.className.split(" ");

    if (classList[0] === "e-headercell") {
      columnIndex = +arg.rowInfo.target.getAttribute("aria-colindex");
      columnFieldName = this.treeGridObj.getColumns()[columnIndex].field;
    } else if (classList[0] === "e-headercelldiv") {
      uid = arg.rowInfo.target.getAttribute("e-mappinguid");
      if (uid) {
        columnFieldName = this.treeGridObj.getColumnByUid(uid)?.field;
      }
    } else if (classList[0] === "e-headertext") {
      uid = arg.rowInfo.target.parentNode.getAttribute("e-mappinguid");
      if (uid) {
        columnFieldName = this.treeGridObj.getColumnByUid(uid)?.field;
      }
    }

    if (columnFieldName) {
      this.selectedColumnFieldName = columnFieldName;
    }

    let elem: Element = arg.event.target as Element;
    let items: Array<HTMLElement> = [].slice.call(
      document.querySelectorAll(".e-menu-item")
    );
    for (let i: number = 0; i < items.length; i++) {
      items[i].setAttribute("style", "display: none;");
    }

    const column = this.treeGridObj.getColumnByField(
      this.selectedColumnFieldName
    );

    if (elem.closest(".e-row")) {
      this.isRowContextMneu = true;
      this.isHeaderContextMneu = false;
    }

    if (elem.closest(".e-headercell")) {
      this.isHeaderContextMneu = true;
      this.isRowContextMneu = false;
    }

    if (this.isRowContextMneu) {
      document
        .querySelectorAll("li#multi-select")[0]
        ?.setAttribute("style", "display: block;");
      document
        .querySelectorAll("li#multi-select-on")[0]
        ?.setAttribute("style", "display: block;");
      document
        .querySelectorAll("li#multi-select-off")[0]
        ?.setAttribute("style", "display: block;");

      document
        .querySelectorAll("li#copy-cut")[0]
        ?.setAttribute("style", "display: block;");
      document
        .querySelectorAll("li#paste-as-sibling")[0]
        ?.setAttribute("style", "display: block;");
      document
        .querySelectorAll("li#paste-as-child")[0]
        ?.setAttribute("style", "display: block;");

      document
        .querySelectorAll("li#add-del-edit-row")[0]
        ?.setAttribute("style", "display: block;");
      document
        .querySelectorAll("li#add-row")[0]
        ?.setAttribute("style", "display: block;");
      document
        .querySelectorAll("li#edit-row")[0]
        ?.setAttribute("style", "display: block;");
      document
        .querySelectorAll("li#delete-row")[0]
        ?.setAttribute("style", "display: block;");
    }

    if (this.isHeaderContextMneu) {
      // style
      document
        .querySelectorAll("li#style")[0]
        ?.setAttribute("style", "display: block;");

      // data type
      document
        .querySelectorAll("li#data-type")[0]
        ?.setAttribute("style", "display: block;");
      document
        .querySelectorAll("li#string")[0]
        ?.setAttribute("style", "display: block;");
      document
        .querySelectorAll("li#number")[0]
        ?.setAttribute("style", "display: block;");

      // font
      document
        .querySelectorAll("li#font")[0]
        ?.setAttribute("style", "display: block;");
      document
        .querySelectorAll("li#font-weight")[0]
        ?.setAttribute("style", "display: block;");
      document
        .querySelectorAll("li#font-size")[0]
        ?.setAttribute("style", "display: block;");

      // color
      document
        .querySelectorAll("li#color")[0]
        ?.setAttribute("style", "display: block;");
      document
        .querySelectorAll("li#blue")[0]
        ?.setAttribute("style", "display: block;");
      document
        .querySelectorAll("li#default")[0]
        ?.setAttribute("style", "display: block;");

      // alignment
      document
        .querySelectorAll("li#alignment")[0]
        ?.setAttribute("style", "display: block;");
      document
        .querySelectorAll("li#left")[0]
        ?.setAttribute("style", "display: block;");
      document
        .querySelectorAll("li#center")[0]
        ?.setAttribute("style", "display: block;");
      document
        .querySelectorAll("li#right")[0]
        ?.setAttribute("style", "display: block;");

      // text-wrap
      document
        .querySelectorAll("li#text-wrap")[0]
        ?.setAttribute("style", "display: block;");

      document
        .querySelectorAll("li#break")[0]
        ?.setAttribute("style", "display: block;");
      document
        .querySelectorAll("li#normal")[0]
        ?.setAttribute("style", "display: block;");

      // freeze
      document
        .querySelectorAll("li#freeze")[0]
        ?.setAttribute("style", "display: block;");
      document
        .querySelectorAll("li#freeze-on")[0]
        ?.setAttribute("style", "display: block;");
      document
        .querySelectorAll("li#freeze-off")[0]
        ?.setAttribute("style", "display: block;");

      // filter
      document
        .querySelectorAll("li#filter")[0]
        ?.setAttribute("style", "display: block;");
      document
        .querySelectorAll("li#filter-on")[0]
        ?.setAttribute("style", "display: block;");
      document
        .querySelectorAll("li#filter-off")[0]
        ?.setAttribute("style", "display: block;");

      // multi-sort
      document
        .querySelectorAll("li#multi-sort")[0]
        ?.setAttribute("style", "display: block;");
      document
        .querySelectorAll("li#multi-sort-on")[0]
        ?.setAttribute("style", "display: block;");
      document
        .querySelectorAll("li#multi-sort-off")[0]
        ?.setAttribute("style", "display: block;");

      document
        .querySelectorAll("li#add-del-edit-column")[0]
        ?.setAttribute("style", "display: block;");
      document
        .querySelectorAll("li#add-column")[0]
        ?.setAttribute("style", "display: block;");
      document
        .querySelectorAll("li#edit-column")[0]
        ?.setAttribute("style", "display: block;");
      document
        .querySelectorAll("li#del-column")[0]
        ?.setAttribute("style", "display: block;");
      // }
    }
  }
}
