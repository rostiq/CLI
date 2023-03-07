const { Command } = require("commander");
const program = new Command();
const contactsActions = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        await contactsActions.listContacts();
        break;

      case "get":
        await contactsActions.getContactById(id);
        break;

      case "add":
        await contactsActions.addContact(name, email, phone);
        break;

      case "remove":
        await contactsActions.removeContact(id);
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (err) {
    console.error(err);
  }
}

invokeAction(argv);
