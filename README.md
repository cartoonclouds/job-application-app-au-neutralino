# job-application-app-au-neutralino

<!-- vscode-markdown-toc -->

- 1. [Binding Behaviours](#BindingBehaviours)
- 2. [Custom Attributes](#CustomAttributes)
  - 2.1. [Tooltip](#Tooltip)
  - 2.2. [Ellipsis](#Ellipsis)
  - 2.3. [Animate-on-Change](#Animate-on-Change)
- 3. [Components](#Components)
- 4. [Components](#Components-1)
- 5. [General](#General)
- 6. [Custom Attributes](#CustomAttributes-1)
- 7. [Value Convertors](#ValueConvertors)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

---

## 1. <a name='BindingBehaviours'></a>Binding Behaviours

## 2. <a name='CustomAttributes'></a>Custom Attributes

### 2.1. <a name='Tooltip'></a>Tooltip

```ts
tooltip =
  "content.bind: `HEADER: ${tabHeader.options.label}`;options.bind: {placement: 'bottom'};";
```

### 2.2. <a name='Ellipsis'></a>Ellipsis

```ts
ellipsis = "lines: 1;";
```

### 2.3. <a name='Animate-on-Change'></a>Animate-on-Change

```ts
animate-on-change="value.bind: applicationRepository.jobApplicationCount; duration: 10s; delay: 5s;repeat: 'infinity'"
```

## 3. <a name='Components'></a>Components

# TODO

## 4. <a name='Components-1'></a>Components

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

## 5. <a name='General'></a>General

- Form validation
- i18n
- Storage
- ConfigServiceProvider
- AureliaServiceProvider
- GeoServiceProvider
- UserActivityServiceProvider
- IdleServiceProvider

## 6. <a name='CustomAttributes-1'></a>Custom Attributes

- StickyHeader (for table)
- Typeahead
- CascadeDisabled
- CascadeReadonly
- WCAGCheck (`wcag-check` - looks at the tag the attribute is added to and check for WCAG compatibility. `level.bind: 'A'|'AA'|'AAA'`)
- ARIACheck (`aria-check` - looks at the tag the attribute is added to and check for ARIA compatibility)

## 7. <a name='ValueConvertors'></a>Value Convertors

- NumberFormat
- CurrencyFormat
- DateFormat
- Unique
- Sort
- Filter
- Joiner

---

|                  | Unchecked | Checked | Not Checked | Tick     | Cross   |
| ---------------- | --------- | ------- | ----------- | -------- | ------- |
| **HTML Entites** | &#9744;   | &#9745; | &#9746;     | &#10004; | &cross; |
| **GitHub**       |           |         |             |          |         |

- https://www.markdownguide.org/extended-syntax/
- https://gist.github.com/rxaviers/7360908
