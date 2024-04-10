import { NumberRuleContainer } from "./NumberRule";
import { StringRuleContainer } from "./StringRule";

export function Rule() {
  return {
    string: () => {
      return new StringRuleContainer();
    },

    number: () => {
      return new NumberRuleContainer();
    },
  };
}

export type TRuleByType = StringRuleContainer | NumberRuleContainer;
