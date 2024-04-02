import { BinaryFunc, Calculator, UnaryFunc } from './calculator';

class MockFn {
  fn: BinaryFunc | UnaryFunc;
  constructor(fn: BinaryFunc | UnaryFunc) {
    this.fn = fn;
  }

  getFunc() {
    return this.fn;
  }
}

class MockFnRaising {
  getFunc(): BinaryFunc | UnaryFunc {
    throw new Error();
  }
}

describe('Calculator', () => {
  describe('Testing operator +', () => {
    test('Should perform addition', () => {
      const fns = new MockFn((a, b) => a + b);
      const calculator = new Calculator(fns);

      const result = calculator.run('+ 2 2');
      expect(result).toBe(4);
    });

    test('Negative numbers', () => {
      const fns = new MockFn((a, b) => a + b);
      const calculator = new Calculator(fns);

      const result = calculator.run('+ 2 -2');
      expect(result).toBe(0);
    });

    test('Missing one parameter', () => {
      const fns = new MockFn((a, b) => a + b);
      const calculator = new Calculator(fns);

      const doit = () => {
        calculator.run('+ 2');
      };

      expect(doit).toThrow('Invalid arity for function, expected 2, got 1');
    });

    test('Missing two parameters', () => {
      const fns = new MockFn((a, b) => a + b);
      const calculator = new Calculator(fns);

      const doit = () => {
        calculator.run('+');
      };

      expect(doit).toThrow('Invalid arity for function, expected 2, got 0');
    });

    test('Extra parameters', () => {
      const fns = new MockFn((a, b) => a + b);
      const calculator = new Calculator(fns);

      const doit = () => {
        calculator.run('+ 1 1 1');
      };

      expect(doit).toThrow('Invalid arity for function, expected 2, got 3');
    });

    test('Invalid input', () => {
      const fns = new MockFn((a, b) => a + b);
      const calculator = new Calculator(fns);

      const result = calculator.run('+ hello world');

      expect(result).toBeNaN();
    });

    test('Some invalid input', () => {
      const fns = new MockFn((a, b) => a + b);
      const calculator = new Calculator(fns);

      const result = calculator.run('+ hello 1');

      expect(result).toBeNaN();
    });
  });

  describe('Testing /', () => {
    test('Works', () => {
      const fns = new MockFn((a, b) => a / b);
      const calculator = new Calculator(fns);

      const result = calculator.run('/ 4 2');

      expect(result).toBe(2);
    });

    test('Division by 0', () => {
      const fns = new MockFn((a, b) => a / b);
      const calculator = new Calculator(fns);

      const result = calculator.run('/ 4 0');

      expect(result).toBe(Infinity);
    });
  });

  describe('Testing sqrt', () => {
    test('Should work', () => {
      const fns = new MockFn((a: number) => Math.sqrt(a));
      const calculator = new Calculator(fns);

      const result = calculator.run('sqrt 4');
      expect(result).toBe(2);
    });

    test('Missing argument', () => {
      const fns = new MockFn((a: number) => Math.sqrt(a));
      const calculator = new Calculator(fns);

      const doit = () => {
        calculator.run('sqrt');
      };

      expect(doit).toThrow('Invalid arity for function, expected 1, got 0');
    });

    test('Extra argument', () => {
      const fns = new MockFn((a: number) => Math.sqrt(a));
      const calculator = new Calculator(fns);

      const doit = () => {
        calculator.run('sqrt 5 1');
      };

      expect(doit).toThrow('Invalid arity for function, expected 1, got 2');
    });
  });

  test('Unknown function identifier', () => {
    const fns = new MockFnRaising();
    const calculator = new Calculator(fns);

    const doit = () => {
      calculator.run('multiply 2 3');
    };

    expect(doit).toThrow();
  });

  test('No input', () => {
    const fns = new MockFn((a, b) => a * b); // :)
    const calculator = new Calculator(fns);

    const result = calculator.run('');

    expect(result).toBeNaN();
  });
});
