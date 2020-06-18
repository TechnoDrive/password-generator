const prompts = require('prompts');
const chalk = require('chalk');
const log = console.log;

const actions = ['create', 'store', 'help'];

function arrayFormat(array) {
    formattedArray = array.join(', ');
    return formattedArray;
}

(async () => {
    const action = await prompts({
        type: 'text',
        name: 'value',
        message: 'Action?',
        validate: value => actions.indexOf(value) < 0 ? `Enter a valid action: ${arrayFormat(actions)}` : true
    });

    if (action.value == 'help') {
        log(chalk.green.bold.underline('Help:'))
        log(chalk.green('create: Creates a new secure password.'))
        log(chalk.green('store: Stores password securely to a database.'))
        log(chalk.green('help: Brings up this screen!'))
    }
})();