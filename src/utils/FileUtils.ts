import fs from "fs";

export default class FileService {
    
    static isFileExists(path: string): boolean{
        return fs.existsSync(path);
    }

    static writeToFile(path: string, content: any){
        fs.writeFileSync(path, content);
    }

    static readFile(path: string){
        return fs.readFileSync(path);
    }

}