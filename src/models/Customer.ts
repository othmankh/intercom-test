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

    getDistance2( {originLogitude, originLatitude}: {originLogitude: number, originLatitude: number} ): number {
        let earthRadius = MathUtils.getEarthRadius();
        
        let customerLatInRad = MathUtils.convertFromDegreesToRadians(this.latitude);
        let originLatitudeInRad = MathUtils.convertFromDegreesToRadians(originLatitude);

        let longAbsDiff = MathUtils.convertFromDegreesToRadians(this.longitude - originLogitude);

        let segma = Math.sin(customerLatInRad) * Math.sin(originLatitudeInRad) + 
                Math.cos(customerLatInRad) * Math.cos(originLatitudeInRad) * Math.cos(longAbsDiff);

        var c = Math.acos(segma);
        
        let distanceInKm = earthRadius * c / 1000;

        //Round to two decimals
        let result = +(distanceInKm.toFixed(2));
        
        return result;
    }

    getDistance( {originLogitude, originLatitude}: {originLogitude: number, originLatitude: number} ): number {
        let earthRadius = MathUtils.getEarthRadius();
        
        let customerLatInRad = MathUtils.convertFromDegreesToRadians(this.latitude);
        let originLatitudeInRad = MathUtils.convertFromDegreesToRadians(originLatitude);

        let longAbsDiff = MathUtils.convertFromDegreesToRadians(this.longitude - originLogitude);

        let segma = Math.sqrt( Math.pow(Math.cos(originLatitudeInRad) * Math.sin(longAbsDiff), 2) +
                    Math.pow((Math.cos(customerLatInRad) * Math.sin(originLatitudeInRad) - Math.sin(customerLatInRad) * Math.cos(originLatitudeInRad) * Math.cos(longAbsDiff)) , 2)) /
                    (Math.sin(customerLatInRad) * Math.sin(originLatitudeInRad) + Math.cos(customerLatInRad) * Math.cos(originLatitudeInRad) * Math.cos(longAbsDiff));

        var c = Math.atan(segma);
        
        let distanceInKm = earthRadius * c / 1000;

        //Round to two decimals
        let result = +(distanceInKm.toFixed(2));
        
        return result;
    }


}