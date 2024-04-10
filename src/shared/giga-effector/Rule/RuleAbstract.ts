import {
  IValidateResult,
  TAllowedTypes,
  TRuleFunctionByType,
} from "../interfaces";
import { getIsValid } from "../lib/utils";

export abstract class RuleAbstract<T extends TAllowedTypes> {
  protected rules: TRuleFunctionByType<T>[] = [];

  validate(value: T): IValidateResult {
    let validation: IValidateResult | undefined;

    for (const nextRule of this.rules) {
      validation = nextRule(value);
      if (!validation.isValid) {
        break;
      }
    }

    return validation || getIsValid();
  }
}

// export class RuleContainer {
//   #rules: Partial<RuleMap> = {};

//   min(value: number, message?: string) {
//     this.#rules.min = {
//       value,
//       message,
//     };

//     return this;
//   }

//   max(value: number, message?: string) {
//     this.#rules.max = {
//       value,
//       message,
//     };

//     return this;
//   }

//   equal(value: number | string, message?: string) {
//     this.#rules.equal = {
//       value,
//       message,
//     };

//     return this;
//   }

//   match(fn: (value: string) => boolean, message?: string) {
//     this.#rules.match = {
//       fn,
//       message,
//     };

//     return this;
//   }

//   get value() {
//     return this.#rules;
//   }
// }

// export function Rule() {
//   return new RuleContainer();
// }
