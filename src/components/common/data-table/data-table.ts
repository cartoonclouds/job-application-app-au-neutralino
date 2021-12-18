import { bindable, BindingMode, inject } from "aurelia";
import { ISignaler } from "@aurelia/runtime-html";
import * as _ from "underscore";

import { FilterValueConverter } from "../../../resources/value-converters/array";
import { ArrayUtility } from "../../../utilities/array-utility";

export class DataTableHeader {
  public displayName: string = "";
  public class: string = "";
  public propertyGetter: (key: any, value?: any) => any;
  public sortValueGetter: (key: any, value?: any) => any;

  // function to calculate a total of a header column.
  public totalFn: (columnData) => any = (columnData) => null;

  public isSortable: boolean = true;
  public isSearchable: boolean = true;

  constructor(options?: Partial<DataTableHeader>) {
    if (options) {
      options = Object.assign(new DataTableHeader(), options);

      this.displayName = options.displayName;
      this.class = options.class;
      this.propertyGetter = options.propertyGetter;
      this.sortValueGetter = options.sortValueGetter;
      this.totalFn = options.totalFn;
      this.isSortable = options.isSortable;
      this.isSearchable = options.isSearchable;
    }
  }
}

export class DataTableFilter {
  constructor(
    public headerDisplayName: string,
    public value: any,
    public groupingString: string = ""
  ) {}
}

@inject(ISignaler)
export class DataTable {
  @bindable({ mode: BindingMode.toView }) dataModel: any[];
  @bindable({ mode: BindingMode.toView }) tableHeaders: DataTableHeader[];

  @bindable({ mode: BindingMode.twoWay }) selectedRowModel: any;
  @bindable({ mode: BindingMode.toView }) selectable: boolean = true;
  @bindable({ mode: BindingMode.oneTime }) onSelect = (i, event?) => true;
  @bindable({ mode: BindingMode.oneTime }) onDblClick = (i, event?) => true;

  @bindable({ mode: BindingMode.twoWay }) sortAscending: boolean = true;
  @bindable({ mode: BindingMode.twoWay }) sortingHeader: DataTableHeader;

  @bindable({ mode: BindingMode.twoWay }) search: string = "";
  @bindable({ mode: BindingMode.oneTime }) searchFunction;

  @bindable({ mode: BindingMode.toView }) filters: DataTableFilter[] = [];

  @bindable({ mode: BindingMode.toView }) tableClass = "";
  @bindable({ mode: BindingMode.toView }) tableBodyRowClass = "";
  @bindable({ mode: BindingMode.toView }) ignoreEventClass = "actions";

  @bindable({ mode: BindingMode.toView }) hoverable: boolean = true;
  @bindable({ mode: BindingMode.oneTime }) showEmptyState: boolean = false;

  public table: HTMLTableElement;
  public wrapper: HTMLDivElement;

  constructor(@ISignaler private readonly signaler: ISignaler) {}

  public binding() {
    this.headersChanged([], this.tableHeaders);
    this.filtersChanged(this.filters);
  }

  public attached() {
    this.search = "";
  }

  public selectRow(rowModel, event: MouseEvent | KeyboardEvent) {
    if (
      !this.onSelect ||
      (event.target as HTMLElement).classList.contains(this.ignoreEventClass)
    ) {
      return;
    }

    if (this.selectedRowModel === rowModel) {
      return;
    }

    return this.onSelect(rowModel, event);
  }

  public dblClickRow(rowModel, event: MouseEvent) {
    if (
      !this.onDblClick ||
      (event.target as HTMLElement).classList.contains(this.ignoreEventClass)
    ) {
      return;
    }

    if (this.selectedRowModel === rowModel) {
      return;
    }

    return this.onDblClick(rowModel, event);
  }

  public keyboardHandler(rowModel, event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.selectRow(rowModel, event);
    }

    return true;
  }

  public dataModelChanged(newValue, oldValue) {
    this.signaler.dispatchSignal("update-search");
  }

  public searchChanged(newValue) {
    console.log("search changed: " + newValue);

    this.signaler.dispatchSignal("update-search");
  }

  public scrollTop() {
    this.wrapper.scrollTop = 0;
  }

  public sortOn(newSortingHeader: DataTableHeader) {
    if (!newSortingHeader.isSortable) {
      return;
    }

    // if clicking the same header, toggle ascending
    if (this.sortingHeader == newSortingHeader) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortingHeader = newSortingHeader;
    }

    this.signaler.dispatchSignal("update-search");
  }

  public filterOn(rowModel: any) {
    if (this.filters.length === 0) {
      return true;
    }

    const headerMap = _.indexBy(this.tableHeaders, "displayName");

    // For every header - if it passes at least one filter, then it passes.
    const headersFiltered = _.some(this.filters, (filter: DataTableFilter) => {
      const value =
        headerMap[filter.headerDisplayName].propertyGetter(rowModel);

      if (_.isFunction(filter.value)) {
        return filter.value(value);
      }

      return value === filter.value;
    });
  }

  public searchOn(rowModel: any) {
    console.log("onSearch");
    if (!this.search) {
      return true;
    }

    console.log("search " + this.search);

    if (this.searchFunction) {
      return this.searchFunction(rowModel, this.search);
    }

    console.log("no searchFunction");

    return _.some(this.tableHeaders, (header: DataTableHeader) => {
      console.log(
        _.isFunction(header.propertyGetter),
        header.isSearchable,
        this.search.toLocaleLowerCase()
      );

      if (!_.isFunction(header.propertyGetter) || !header.isSearchable) {
        // skip this column
        return false;
      }
      const value = header.propertyGetter(rowModel);

      return (value ? `${value}` : "")
        .toLocaleLowerCase()
        .includes(this.search.toLocaleLowerCase());
    });
  }

  private getDataModel() {
    if (this.dataModel == null) {
      return [];
    }

    return this.dataModel;
  }

  /**
   * Returns a computed column total as calcuated by the header's `totalFn` function.
   *
   * Rows will first be passed through the filter and search functions.
   */
  protected getTotal(header: DataTableHeader) {
    const filterValueConverter = new FilterValueConverter();

    let displayedDataModel = ArrayUtility.cloneArray(this.getDataModel());

    displayedDataModel = <any[]>(
      filterValueConverter.toView(
        displayedDataModel,
        this.filterOn.bind(this),
        null
      )
    );

    displayedDataModel = <any[]>(
      filterValueConverter.toView(
        displayedDataModel,
        this.searchOn.bind(this),
        null
      )
    );

    const columnArray = _.map(displayedDataModel, (item) =>
      header.propertyGetter(item)
    );

    return header.totalFn(columnArray);
  }

  private headersChanged(
    oldValue: DataTableHeader[],
    nenwValue: DataTableHeader[]
  ) {
    this.signaler.dispatchSignal("update-headers");
  }

  private filtersChanged(filters: DataTableFilter[]) {
    this.signaler.dispatchSignal("update-search");
  }
}
