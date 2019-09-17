import InvitationService from "../src/InvitationService";
import FileUtils from "../src/utils/FileUtils";

describe("Invitation Service tests", () => {

    it("should fail if input file doesn't exist", () => {
        let invitationService = new InvitationService({
            inputFilePath: "data/customers2.txt"
        });

        expect(() => {
            invitationService.printListOfInvitees();
        }).toThrow("Input file doesn't exist");
    });

    it("should fail if one or more file records doesn't have latitude ", () => {
        let invitationService = new InvitationService({
            inputFilePath: "tests/data/customers-no-latitude.txt"
        });
        expect(() => {
            invitationService.printListOfInvitees();
        }).toThrow("Customer latitude is not found");
    });

    it("should fail if one or more file records doesn't have longitude ", () => {
        let invitationService = new InvitationService({
            inputFilePath: "tests/data/customers-no-longitude.txt"
        });
        expect(() => {
            invitationService.printListOfInvitees();
        }).toThrow("Customer longitude is not found");
    });

    it("should fail if one or more file records doesn't have name ", () => {
        let invitationService = new InvitationService({
            inputFilePath: "tests/data/customers-no-name.txt"
        });
        expect(() => {
            invitationService.printListOfInvitees();
        }).toThrow("Customer name is not found");
    });

    it("should fail if one or more file records doesn't have user_id ", () => {
        let invitationService = new InvitationService({
            inputFilePath: "tests/data/customers-no-userid.txt"
        });
        expect(() => {
            invitationService.printListOfInvitees();
        }).toThrow("Customer id is not found");
    });

    it("should read 32 customers from the input file ", () => {
        let invitationService = new InvitationService({
            inputFilePath: "data/customers.txt"
        });
        let customersList = invitationService.getAllCustomers();

        expect(customersList).toBeDefined();
        expect(customersList.length).toBe(32);
    });

    it("should not return customers with distance more than 100 KM ", () => {
        let invitationService = new InvitationService({
            inputFilePath: "data/customers.txt"
        });

        let customersList = invitationService.getAllCustomers();

        let customersWithinDistance = invitationService.getCustomersWithinDistance(customersList, 100);

        for (let customer of customersWithinDistance) {
            let distance = customer.calculateDistance({
                originLatitude: 53.339428,
                originLogitude: -6.257664
            });
            expect(distance).toBeLessThanOrEqual(100);
        }
    });

    it("should output file with results", () => {

        let invitationService = new InvitationService({
            inputFilePath: "data/customers.txt"
        });
        invitationService.printListOfInvitees();
        expect(FileUtils.isFileExists("data/output.txt")).toBe(true);
    });

    it("should expect a sorted list based on userId", () => {
        let invitationService = new InvitationService({
            inputFilePath: "data/customers.txt"
        }); 
        
        invitationService.printListOfInvitees();

        let customers = FileUtils.readFileLines("data/output.txt").map(cus => {
            let cusJson = JSON.parse(cus);
            return {
                user_id: cusJson.user_id,
                name: cusJson.name
            }
        });

        let actualResult = customers.every(function (value, index, array) {
            return index === 0 || array[index - 1].user_id <= (value.user_id)
        });

        expect(actualResult).toBe(true);
    });

});


