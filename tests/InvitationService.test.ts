import InvitationService from "../src/InvitationService";
import FileUtils from "../src/utils/FileUtils";

describe("invitationService tests", () => {

    it("should fail if input file doesn't exist", () => {
        let invitationService = new InvitationService("data/customers2.txt");
        expect(() => {
            invitationService.printListOfInvitees();
        }).toThrow("Input file doesn't exist");
    });

    it("should read 32 customers from the input file ", () => {
        let invitationService = new InvitationService("data/customers.txt");

        let customersList = invitationService.readCustomersListFromFile();

        expect(customersList).toBeDefined();
        expect(customersList.length).toBe(32);
    });

    it("should not return customers with distance more than 100 KM ", () => {
        let invitationService = new InvitationService("data/customers.txt");

        let customersList = invitationService.readCustomersListFromFile();

        let customersWithinDistance = invitationService.getCustomersWithinDistance(customersList, 100);

        for(let customer of customersWithinDistance) {
            let distance = customer.getDistance({
                 originLatitude: 53.339428,
                 originLogitude: -6.257664
            });
            expect(distance).toBeLessThanOrEqual(100);
        }
    });

    it("should output file with results", () => {

        let invitationService = new InvitationService("data/customers.txt");
        invitationService.printListOfInvitees();
        expect(FileUtils.isFileExists("data/output.txt")).toBe(true);
    });

    it("should expect a sorted list based on userId", () => {
        let invitationService = new InvitationService("data/customers.txt");
        invitationService.printListOfInvitees();

        //Use the existing functionality to read the output file to check that the output list is correct
        let expectedinvitationService = new InvitationService("data/output.txt");
        let customers = expectedinvitationService.readCustomersListFromFile();

        let actualResult = customers.every(function(value, index, array) {
             return index === 0 || array[index - 1].user_id <= (value.user_id)
          });

        expect(actualResult).toBe(true);
    });

});


