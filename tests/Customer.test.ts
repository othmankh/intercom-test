import Customer from "../src/models/Customer";

describe("Customer tests", () => {

    let originLatitude: number = 53.339428;
    let originLongitude: number = -6.257664;

    it("should calculate the distance correctly", () => {

        let customer = new Customer(52.986375, 12, "test", -6.043701);

        let distance = customer.getDistance(
            {
                originLatitude: originLatitude,
                originLogitude: originLongitude
            });

        expect(distance).toBe(41.77);
    });
});
