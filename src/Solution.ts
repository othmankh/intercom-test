import FileUtils from "./utils/FileUtils";
import Customer from "./models/Customer";

export default class Solution {

    private inputFilePath: string;
    private outputFilePath: string;
    private originLatitude: number;
    private originLongitude: number;
    private maxDistance: number;

    constructor(inputFilePath: string, originLatitude: number = 53.339428, originLongitude: number = -6.257664, maxDistance: number = 100, outputFilePath: string = "data/output.txt"){
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
        let sortedInviteesResult = sortedInviteesList.map(cus => {
            return JSON.stringify({
                user_id: cus.user_id,
                name: cus.name
            });
        });

        let result = sortedInviteesResult.join("\n");
        FileUtils.writeToFile(this.outputFilePath, result);
    }

    readCustomersListFromFile(): Customer[]{
        if(!FileUtils.isFileExists(this.inputFilePath)){
            throw new Error("Input file doesn't exist");
        }
        let customersData = FileUtils.readFile(this.inputFilePath);
        let stringCustomersData = customersData.toString();
        let customers = stringCustomersData.split(/\r?\n/);

        let customersList: Customer[] = [];
        for(let customer of customers){
            let customerJson = JSON.parse(customer);
            customersList.push(new Customer(customerJson.latitude, customerJson.user_id, customerJson.name, customerJson.longitude));
        }
        return customersList;
    }
    
    getCustomersWithinDistance(customers: Customer[], maxDistance: number) {
        let invitees: Customer [] = [];

        for(let customer of customers){
            let distance = customer.getDistance({
                originLatitude: this.originLatitude,
                originLogitude: this.originLongitude
            });

            if(distance <= maxDistance) {
                invitees.push(customer);
            }
        }
        return invitees;
    }

}