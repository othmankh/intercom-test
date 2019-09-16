
export default class MathUtils {

    static convertFromDegreesToRadians(degrees: number): number{
        let result = degrees * Math.PI / 180;
        return result;
    }

    static getEarthRadius () {
        return 6371e3;
    }

}