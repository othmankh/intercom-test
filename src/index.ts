import InvitationService from "./InvitationService";

let solution =  new InvitationService({
    inputFilePath: "data/customers.txt"
});

solution.printListOfInvitees();
