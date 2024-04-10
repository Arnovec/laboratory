import { TRuleFunctionByType } from "../interfaces";
import { getIsValid, getNotValid } from "../lib/utils";
import { RuleAbstract } from "./RuleAbstract";

export class StringRuleContainer extends RuleAbstract<string> {
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
}

export function StringRule() {
  return new StringRuleContainer();
}
