import { NumberFormatValueConverter } from "../value-converters/number-format";

export class NumberFormatBindingBehavior {
  // Implement number formatting with a binding behaviour rather than a value converter
  // This lets us adjust the cursor position when the value changes.
  // see https://github.com/aurelia/binding/issues/427
  bind(
    binding,
    scope,
    format?,
    defaultValue?,
    roundingFn: (v: number) => number = (v: number) => v
  ) {
    const formatter = new NumberFormatValueConverter();

    binding.standardUpdateSource = binding.updateSource;
    binding.updateSource = newValue => {
      binding.standardUpdateSource(
        formatter.fromView(newValue, format, defaultValue)
      );
    };

    binding.standardUpdateTarget = binding.updateTarget;
    let lastTargetValue: string | null = null;
    binding.updateTarget = newValue => {
      let selectionStart = binding.target.selectionStart;
      const newTargetValue: string | null = formatter.toView(
        newValue,
        format,
        defaultValue,
        roundingFn
      );
      binding.standardUpdateTarget(newTargetValue);

      if (lastTargetValue !== null) {
        // Adjust cursor position when it's changed in surprising ways
        // (formatting adding/removed, select all and replace with a single digit)
        let adjustSelection = true;
        if (newTargetValue.length === lastTargetValue.length - 2) {
          // length reduced, most likely by a digit and a punctuation symbol
          if (selectionStart === newTargetValue.length) {
            // cursor was at end, should stay at end of new value
            selectionStart = newTargetValue.length;
          } else {
            // move the cursor before the new content
            selectionStart = Math.max(0, selectionStart - 1);
          }
        } else if (newTargetValue.length > lastTargetValue.length + 1) {
          // length increased, most likely by a digit and a punctuation symbol
          selectionStart += 1;
        } else if (selectionStart === binding.target.selectionStart) {
          adjustSelection = false;
        }

        if (adjustSelection) {
          binding.target.setSelectionRange(selectionStart, selectionStart);
        }
      }

      lastTargetValue = newTargetValue;
    };
  }

  unbind(binding, scope) {
    binding.updateSource = binding.standardUpdateSource;
    binding.updateTarget = binding.standardUpdateTarget;
  }
}
