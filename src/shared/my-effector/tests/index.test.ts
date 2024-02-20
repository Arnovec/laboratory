import { describe } from "vitest";
import { stringTest } from "./string";
import { numberTest } from "./number";
import { booleanTest } from "./boolean";

describe("Проверка библиотеки", () => {
  stringTest();
  numberTest();
  booleanTest(); 
});
