import MathUtils from "../utils/MathUtils";

export default class Customer {

    public latitude: number;
    public user_id: number;
    public name: string;
    public longitude: number;

    constructor(latitude: number, user_id: number, name: string, longitude: number){
        this.latitude = latitude;
        this.user_id = user_id;
        this.name = name;
        this.longitude = longitude;
    }

    getDistance( {originLogitude, originLatitude}: {originLogitude: number, originLatitude: number} ): number {
        let R = 6371e3; // metres

        let customerLatInRad = MathUtils.convertFromDegreesToRadians(this.latitude);
        let originLatitudeInRad = MathUtils.convertFromDegreesToRadians(originLatitude);

        let longAbsDiff = MathUtils.convertFromDegreesToRadians(this.longitude - originLogitude);

        let a = Math.sin(customerLatInRad) * Math.sin(originLatitudeInRad) + 
                Math.cos(customerLatInRad) * Math.cos(originLatitudeInRad) * Math.cos(longAbsDiff);

        var c = Math.acos(a);
        
        let distanceInKm = R * c / 1000;

        let result = +(distanceInKm.toFixed(2));
        
        return result;
    }

}