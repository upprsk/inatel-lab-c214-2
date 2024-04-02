export type BinaryFunc = (a: number, b: number) => number;
export type UnaryFunc = (a: number) => number;

export interface FunctionMatrix {
  getFunc: (id: string) => BinaryFunc | UnaryFunc;
}

export class DefaultFunctions {
  getFunc(id: string) {
    switch (id) {
      case '+':
        return (a: number, b: number) => a + b;
      case '-':
        return (a: number, b: number) => a - b;
      case '*':
        return (a: number, b: number) => a * b;
      case '/':
        return (a: number, b: number) => a / b;
      case '^':
        return (a: number, b: number) => Math.pow(a, b);
      case 'sqrt':
        return (a: number) => Math.sqrt(a);
    }

    throw new Error(`invalid function: ${id}`);
  }
}

export class Calculator {
  functions: FunctionMatrix;

  constructor(functions: FunctionMatrix) {
    this.functions = functions;
  }

  run(input: string): number {
    const tokens = input.split(' ');
    if (tokens.length < 1 || tokens[0] === '') return NaN;

    const fn = this.functions.getFunc(tokens[0]);
    const arity = fn.length;
    const argCount = tokens.length - 1;
    if (arity != argCount) {
      throw new Error(
        `Invalid arity for function, expected ${arity}, got ${argCount}`,
      );
    }

    return fn(parseFloat(tokens[1]), parseFloat(tokens[2]));
  }
}
