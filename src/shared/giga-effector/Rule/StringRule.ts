import { TRuleFunctionByType } from "../interfaces";
import { getIsValid, getNotValid } from "../lib/utils";

export class StringRuleContainer {
  #rules: TRuleFunctionByType<string>[] = [];

  min(minLength: number, message: string = "") {
    this.#rules.push((value) => {
      if (value.length < minLength) {
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

export function StringRule() {
  return new StringRuleContainer();
}
