import InvitationService from "./InvitationService";

let invitaionService =  new InvitationService({
    inputFilePath: "data/customers.txt"
});

invitaionService.printListOfInvitees();
