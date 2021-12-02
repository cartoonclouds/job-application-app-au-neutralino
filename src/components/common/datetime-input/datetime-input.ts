import "bootstrap-datepicker";

import { bindable, BindingMode, inject } from "aurelia";
import moment from "moment";

@inject()
export class DatetimeInput {
  @bindable({ mode: BindingMode.twoWay }) public datetime: moment.Moment;
  @bindable({ mode: BindingMode.toView }) public options: object = {};
  @bindable({ mode: BindingMode.toView }) public disabled: boolean = false;

  private datePickerInput;

  constructor(private readonly element: HTMLElement) {}

  public binding() {
    if (!this.datetime) {
      this.datetime = moment();
    }
  }

  public init() {
    this.datePickerInput
      .datepicker(this.datepickerOptions)
      .datepicker("setDate", this.datetime.toDate())
      .on("changeDate", (event) => (this.datetime = moment(event.date)));
  }

  protected optionsChanged() {
    this.init();
  }

  protected disabledChanged() {
    this.init();
  }

  public attached() {
    this.datePickerInput = $(this.element).find(".datepicker");

    this.init();
  }

  public detached() {
    this.datePickerInput?.off("changeDate");
    this.datePickerInput?.off(".datepicker.data-api");
    this.datePickerInput = null;
  }

  // public datetimeChanged(datetime: moment.Moment) {
  //   this.datePickerInput.datepicker("setDate", this.datetime.toDate());
  // }

  protected get datepickerOptions(): DatepickerOptions {
    return Object.assign(
      {},
      {
        format: "dd/mm/yyyy",
        autoclose: true,
      },
      this.options
    );
  }
}
