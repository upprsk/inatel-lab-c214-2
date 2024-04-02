export type BinaryFunc = (a: number, b: number) => number;
export type UnaryFunc = (a: number) => number;

export interface FunctionMatrix {
  getFunc: (id: string) => BinaryFunc | UnaryFunc;
}

export interface Tokenizer {
  tokenize: (input: string) => string[];
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

export class TokenizerImpl {
  tokenize(input: string) {
    return input.split(' ');
  }
}

export class Calculator {
  functions: FunctionMatrix;
  tokenizer: Tokenizer;

  constructor(functions: FunctionMatrix, tokenizer: Tokenizer) {
    this.functions = functions;
    this.tokenizer = tokenizer;
  }

  run(input: string): number {
    const tokens = this.tokenizer.tokenize(input);
    if (tokens.length < 1) return NaN;

    const fn = this.functions.getFunc(tokens[0]);
    const arity = fn.length + 1;
    if (arity != tokens.length) {
      throw new Error(
        `Invalid arity for function, expected ${arity}, got ${tokens.length}`,
      );
    }

    return fn(parseFloat(tokens[1]), parseFloat(tokens[2]));
  }
}
