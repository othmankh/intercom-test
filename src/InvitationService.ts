import FileUtils from "./utils/FileUtils";
import Customer from "./models/Customer";

export default class InvitationService {

    private inputFilePath: string;
    private outputFilePath: string;
    private originLatitude: number;
    private originLongitude: number;
    private maxDistance: number;

    constructor({ inputFilePath, outputFilePath = "data/output.txt", originLatitude = 53.339428, originLongitude = -6.257664, maxDistance = 100 }:
        { inputFilePath: string, outputFilePath?: string, originLatitude?: number, originLongitude?: number, maxDistance?: number }) {
        this.inputFilePath = inputFilePath;
        this.originLatitude = originLatitude;
        this.originLongitude = originLongitude;
        this.maxDistance = maxDistance;
        this.outputFilePath = outputFilePath;
    }

    printListOfInvitees() {
        let customersList = this.getAllCustomers();
        let customersWithinDistance = this.getCustomersWithinDistance(customersList, this.maxDistance);

        let sortedInviteesList = customersWithinDistance.sort((customerA, customerB) => customerA.user_id - customerB.user_id);
        let customisedSortedInvitees = sortedInviteesList.map(customer => {
            return JSON.stringify({
                user_id: customer.user_id,
                name: customer.name
            });
        });

        let result = customisedSortedInvitees.join("\n");
        FileUtils.writeToFile(this.outputFilePath, result);
    }

    getAllCustomers(): Customer[] {
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

    getCustomersWithinDistance(customers: Customer[], maxDistance: number) : Customer []{
        let invitees: Customer[] = [];

        for (let customer of customers) {
            let distance = customer.calculateDistance({
                originLatitude: this.originLatitude,
                originLogitude: this.originLongitude
            });

            if (distance <= maxDistance) {
                invitees.push(customer);
            }
        }
        return invitees;
    }
}