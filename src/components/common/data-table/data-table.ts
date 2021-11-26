import { BindingMode, bindable, EventAggregator } from "aurelia";
import * as _ from "underscore";
import { ArrayUtility } from "../../../utilities/array-utility";
import {
  FilterValueConverter,
  SortValueConverter,
} from "../../../resources/value-converters/array";

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

export class DataTable {
  @bindable({ mode: BindingMode.toView }) dataModel: any[];
  @bindable({ mode: BindingMode.toView }) tableHeaders: DataTableHeader[];

  @bindable({ mode: BindingMode.twoWay }) selectedRowModel: any;
  @bindable({ mode: BindingMode.toView }) selectable: boolean = true;
  @bindable({ mode: BindingMode.oneTime }) onSelect = (i, event?) => true;

  @bindable({ mode: BindingMode.twoWay }) sortAscending: boolean = true;
  @bindable({ mode: BindingMode.toView }) sortingHeader: DataTableHeader;

  @bindable({ mode: BindingMode.twoWay }) search: string = "";
  @bindable({ mode: BindingMode.oneTime }) searchFunction;

  @bindable({ mode: BindingMode.toView }) filters: DataTableFilter[] = [];

  @bindable({ mode: BindingMode.toView }) tableClass = "";
  @bindable({ mode: BindingMode.toView }) tableBodyRowClass = "";

  @bindable({ mode: BindingMode.toView }) hoverable: boolean = true;
  @bindable({ mode: BindingMode.oneTime }) showEmptyState: boolean = false;

  public table: HTMLTableElement;
  public wrapper: HTMLDivElement;

  constructor(
    private readonly eventAggregator: EventAggregator,
    private readonly filterValueConverter: FilterValueConverter,
    private readonly sortValueConverter: SortValueConverter
  ) {}

  public binding() {
    this.headersChanged([], this.tableHeaders);
    this.filtersChanged(this.filters);
  }

  public attached() {
    this.search = "";
  }

  public selectRow(rowModel, event) {
    if (!this.onSelect) {
      return;
    }

    if (this.selectedRowModel === rowModel) {
      return;
    }

    return this.onSelect(rowModel, event);
  }

  public keyboardHandler(rowModel, event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.selectRow(rowModel, event);
    }

    return true;
  }

  public dataModelChanged(newValue, oldValue) {
    this.eventAggregator.publish("update-search");
  }

  public searchChanged(newValue) {
    this.eventAggregator.publish("update-search");
  }

  public scrollTop() {
    this.wrapper.scrollTop = 0;
  }

  public sortOn(newSortingHeader: any) {
    if (!newSortingHeader.isSortable) {
      return;
    }

    // if clicking the same header, toggle ascending
    if ((this.sortingHeader = newSortingHeader)) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortingHeader = newSortingHeader;
    }

    this.eventAggregator.publish("update-search");
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
    if (!this.search) {
      return true;
    }

    if (this.searchFunction) {
      return this.searchFunction(rowModel, this.search);
    }

    return _.some(this.tableHeaders, (header: DataTableHeader) => {
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
    let displayedDataModel = ArrayUtility.cloneArray(this.getDataModel());

    displayedDataModel = <any[]>(
      this.filterValueConverter.toView(
        displayedDataModel,
        this.filterOn.bind(this),
        null
      )
    );

    displayedDataModel = <any[]>(
      this.filterValueConverter.toView(
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
    this.eventAggregator.publish("update-headers");
  }

  private filtersChanged(filters: DataTableFilter[]) {
    this.eventAggregator.publish("update-search");
  }
}

/**
 * @TODO
 * <sort-icon ascending.bind="sortAscending"></sort-icon>
 * filter b/c
 * sort b/c
 *
 */
