import fs from "fs";

export default class FileService {
    
    static isFileExists(path: string): boolean{
        return fs.existsSync(path);
    }

    static writeToFile(path: string, content: any){
        fs.writeFileSync(path, content);
    }

    static readFileLines(path: string){
        let fileData =  fs.readFileSync(path);
        let stringFileData = fileData.toString();
        let fileLines = stringFileData.split(/\r?\n/);
        return fileLines;
    }

}