const prompts = require('prompts');
const chalk = require('chalk');
const cryptoRandomString = require('crypto-random-string');
const log = console.log;

const actions = ['create', 'store', 'help'];
const types = ['base64', 'url-safe', 'numeric', 'distinguishable', 'hex']

function arrayFormat(array) {
    formattedArray = array.join(', ');
    return formattedArray;
}

(async () => {
    const action = await prompts({
        type: 'text',
        name: 'value',
        message: 'What would you like to do?',
        validate: value => actions.indexOf(value) < 0 ? `Please enter a valid action: ${chalk.bold(arrayFormat(actions))}` : true
    });

    if (action.value == 'help') {
        log(chalk.green.bold.underline('Help:'))
        log(chalk.green('create: Creates a new secure password.'))
        log(chalk.green('store: Stores password securely to a database.'))
        log(chalk.green('help: Brings up this screen!'))
    }

    if (action.value == 'create') {
        const type = await prompts({
            type: 'text',
            name: 'value',
            message: 'Which type of password would you like to generate?',
            validate: value => types.indexOf(value) < 0 ? `Please enter a valid type:\n${chalk.bold(arrayFormat(types))}` : true
        });
        const len = await prompts({
            type: 'number',
            name: 'value',
            message: 'How long do you want your password to be?',
            validate: value => value > 75 ? `Please enter a number less than 72 (for bcrypt purposes), and greater than 0.` : true
        });
        if (len.value < 1) {
            len.value = 1;
        }
        var password = cryptoRandomString({length: len.value, type: type.value});
        log(chalk.green.bold('\n√') + chalk.yellow.bold(` Generated a new password:\n${password}`));
    }
})();