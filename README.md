# job-application-app-au-neutralino

<!-- vscode-markdown-toc -->
* 1. [Binding Behaviours](#BindingBehaviours)
* 2. [Custom Attributes](#CustomAttributes)
	* 2.1. [Tooltip](#Tooltip)
	* 2.2. [Ellipsis](#Ellipsis)
	* 2.3. [Animate-on-Change](#Animate-on-Change)
* 3. [Value Convertors](#ValueConvertors)
	* 3.1. [Sort](#Sort)
	* 3.2. [Filter](#Filter)
* 4. [Components](#Components)
* 5. [Still to do](#Stilltodo)
	* 5.1. [Components](#Components-1)
	* 5.2. [General](#General)
	* 5.3. [Custom Attributes](#CustomAttributes-1)
	* 5.4. [Value Convertors](#ValueConvertors-1)
	* 5.5. [Binding Behaviours](#BindingBehaviours-1)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

---

##  1. <a name='BindingBehaviours'></a>Binding Behaviours

##  2. <a name='CustomAttributes'></a>Custom Attributes

###  2.1. <a name='Tooltip'></a>Tooltip

```ts
tooltip =
  "content.bind: `HEADER: ${tabHeader.options.label}`;options.bind: {placement: 'bottom'};";
```

###  2.2. <a name='Ellipsis'></a>Ellipsis

```ts
ellipsis = "lines: 1;";
```

###  2.3. <a name='Animate-on-Change'></a>Animate-on-Change

```ts
animate-on-change="value.bind: applicationRepository.jobApplicationCount; duration: 10s; delay: 5s;repeat: 'infinity'"
```

##  3. <a name='ValueConvertors'></a>Value Convertors

###  3.1. <a name='Sort'></a>Sort

```ts
| sort
```

###  3.2. <a name='Filter'></a>Filter

```ts
| filter
```

##  4. <a name='Components'></a>Components

##  5. <a name='Stilltodo'></a>Still to do

###  5.1. <a name='Components-1'></a>Components

- Table
  - DataTable
  - TreeTable
- Dialogs
  - Actions
- DatePicker
- IconMenu (ellipsis)
- ToggleHeader (ToggleCollapsible custom attribute)
- Checkbox (3-valued)
- Notification

###  5.2. <a name='General'></a>General

- Form validation
- i18n
- Storage
- ConfigServiceProvider
- AureliaServiceProvider
- GeoServiceProvider
- UserActivityServiceProvider
- IdleServiceProvider

###  5.3. <a name='CustomAttributes-1'></a>Custom Attributes

- StickyHeader (for table)
- Typeahead
- CascadeDisabled
- CascadeReadonly
- WCAGCheck (`wcag-check` - looks at the tag the attribute is added to and check for WCAG compatibility. `level.bind: 'A'|'AA'|'AAA'`)
- ARIACheck (`aria-check` - looks at the tag the attribute is added to and check for ARIA compatibility)

###  5.4. <a name='ValueConvertors-1'></a>Value Convertors

- NumberFormat
- CurrencyFormat
- DateFormat
- Unique
- Joiner

###  5.5. <a name='BindingBehaviours-1'></a>Binding Behaviours

- NumberFormat

---

|                  | Unchecked | Checked | Not Checked | Tick     | Cross   |
| ---------------- | --------- | ------- | ----------- | -------- | ------- |
| **HTML Entites** | &#9744;   | &#9745; | &#9746;     | &#10004; | &cross; |
| **GitHub**       |           |         |             |          |         |

- https://www.markdownguide.org/extended-syntax/
- https://gist.github.com/rxaviers/7360908
