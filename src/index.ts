import kleur from 'kleur';
import readline from 'readline';
import { Calculator, DefaultFunctions, TokenizerImpl } from './calculator';

const main = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const prompt = (query: string): Promise<string> =>
    new Promise(resolve => rl.question(query, resolve));

  const fnm = new DefaultFunctions();
  const tok = new TokenizerImpl();
  const calculator = new Calculator(fnm, tok);

  console.log(
    `Enter an expression (${kleur.dim().yellow('h')} for help, ${kleur.dim().yellow('ctrl+d')} to exit)`,
  );
  while (true) {
    const rawInput = await prompt('> ');
    const input = rawInput.trim();

    if (input === 'h') {
      console.log(
        'Give expressions starting with the operator and then the arguments, for example:',
      );
      console.log(`\t> ${kleur.grey('+ 2 2')}`);
      console.log(`\t${kleur.green('4')}`);
      continue;
    }

    try {
      const result = calculator.run(input);
      console.log(`${kleur.green(result)}`);
    } catch (e) {
      console.log(`Error: ${kleur.red().bold((e as any).toString())}`);
    }
  }
};

main();
