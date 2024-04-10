import { TAllowedTypes, TRuleFunctionByType } from "../interfaces";

class Rule<T extends TAllowedTypes> {
  #rules: TRuleFunctionByType<T>[] = [];

  validate(value: TAllowedTypes) {
    for (const nextRule of this.#rules) {
      validation = nextRule(value);
    }
  }
}

function isString(obj: unknown): obj is string {
  if (typeof obj === "string") {
    return true;
  }

  return false;
}

function isNumber(obj: unknown): obj is number {
  if (typeof obj === "number") {
    return true;
  }

  return false;
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
