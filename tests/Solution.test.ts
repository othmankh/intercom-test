import Solution from "../src/Solution";
import FileUtils from "../src/utils/FileUtils";

describe("Solution tests", () => {

    it("should fail if input file doesn't exist", () => {
        let solution = new Solution("data/customers2.txt");
        expect(() => {
            solution.printListOfInvitees();
        }).toThrow("Input file doesn't exist");
    });

    it("should read 32 customers from the input file ", () => {
        let solution = new Solution("data/customers.txt");

        let customersList = solution.readCustomersListFromFile();

        expect(customersList).toBeDefined();
        expect(customersList.length).toBe(32);
    });

    it("should not return customers with distance more than 100 KM ", () => {
        let solution = new Solution("data/customers.txt");

        let customersList = solution.readCustomersListFromFile();

        let customersWithinDistance = solution.getCustomersWithinDistance(customersList, 100);

        for(let customer of customersWithinDistance) {
            let distance = customer.getDistance({
                 originLatitude: 53.339428,
                 originLogitude: -6.257664
            });
            expect(distance).toBeLessThanOrEqual(100);
        }
    });

    it("should output file with results", () => {
        
        let solution = new Solution("data/customers.txt");
        solution.printListOfInvitees();
        expect(FileUtils.isFileExists("data/output.txt")).toBe(true);
    });

    it("should expect a sorted list based on userId", () => {
        let solution = new Solution("data/customers.txt");
        solution.printListOfInvitees();

        //Use the existing functionality to read the output file to check that the output list is correct
        let expectedSolution = new Solution("data/output.txt");
        let customers = expectedSolution.readCustomersListFromFile();

        let actualResult = customers.every(function(value, index, array) {
             return index === 0 || array[index - 1].user_id <= (value.user_id)
          });

        expect(actualResult).toBe(true);
    });

});


