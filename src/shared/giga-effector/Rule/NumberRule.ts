import { RuleAbstract } from "./RuleAbstract";
import { getIsValid, getNotValid } from "../lib/utils";

export class NumberRuleContainer extends RuleAbstract<number> {
  min(minValue: number, message: string = "", canBeEqual: boolean = true) {
    this.rules.push((value) => {
      if (value < minValue || (value === minValue && !canBeEqual)) {
        return getNotValid(message);
      }

      return getIsValid();
    });

    return this;
  }
}

export function NumberRule() {
  return new NumberRuleContainer();
}
