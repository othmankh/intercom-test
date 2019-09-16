import FileUtils from "./utils/FileUtils";
import Customer from "./models/Customer";

export default class InvitationService {

    private inputFilePath: string;
    private outputFilePath: string;
    private originLatitude: number;
    private originLongitude: number;
    private maxDistance: number;
    
    constructor({inputFilePath, outputFilePath = "data/output.txt", originLatitude = 53.339428 ,originLongitude =  -6.257664, maxDistance = 100}: 
        { inputFilePath: string, outputFilePath?: string, originLatitude?: number, originLongitude?: number, maxDistance?: number }) {
        this.inputFilePath = inputFilePath;
        this.originLatitude = originLatitude;
        this.originLongitude = originLongitude;
        this.maxDistance = maxDistance;
        this.outputFilePath = outputFilePath;
    }

    printListOfInvitees() {
        let customersList = this.readCustomersListFromFile();
        let customersWithinDistance = this.getCustomersWithinDistance(customersList, this.maxDistance);

        let sortedInviteesList = customersWithinDistance.sort((cus1, cus2) => cus1.user_id - cus2.user_id);
        let customisedSortedInvitees = sortedInviteesList.map(cus => {
            return JSON.stringify({
                user_id: cus.user_id,
                name: cus.name
            });
        });
        
        let result = customisedSortedInvitees.join("\n");
        FileUtils.writeToFile(this.outputFilePath, result);
    }

    readCustomersListFromFile(): Customer[] {
        if (!FileUtils.isFileExists(this.inputFilePath)) {
            throw new Error("Input file doesn't exist");
        }

        let customers = FileUtils.readFileLines(this.inputFilePath);
        let customersList: Customer[] = [];

        for (let customer of customers) {
            customersList.push(this.getCustomer(customer));
        }

        return customersList;
    }

    getCustomersWithinDistance(customers: Customer[], maxDistance: number) {
        let invitees: Customer[] = [];

        for (let customer of customers) {
            let distance = customer.getDistance({
                originLatitude: this.originLatitude,
                originLogitude: this.originLongitude
            });

            if (distance <= maxDistance) {
                invitees.push(customer);
            }

        }
        return invitees;
    }

    private getCustomer(customer: any): Customer {
        let customerJson = JSON.parse(customer);

        if (!customerJson.latitude) {
            throw new Error("Customer latitude is not found");
        }
        if (!customerJson.user_id) {
            throw new Error("Customer id is not found");
        }
        if (!customerJson.name) {
            throw new Error("Customer name is not found");
        }
        if (!customerJson.longitude) {
            throw new Error("Customer longitude is not found");
        }

        return new Customer(customerJson.latitude, customerJson.user_id, customerJson.name, customerJson.longitude)
    }

}