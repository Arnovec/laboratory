import { TRuleFunctionByType } from "../interfaces";
import { getIsValid, getNotValid } from "../lib/utils";

export class NumberRuleContainer {
  #rules: TRuleFunctionByType<number>[] = [];

  min(minValue: number, message: string = "", canBeEqual: boolean = true) {
    this.#rules.push((value) => {
      if (value < minValue || (value === minValue && !canBeEqual)) {
        return getNotValid(message);
      }

      return getIsValid();
    });

    return this;
  }

  get value() {
    return this.#rules;
  }
}

export function NumberRule() {
  return new NumberRuleContainer();
}
