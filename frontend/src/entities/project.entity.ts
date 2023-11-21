import { Pattern } from "./Pattern.entity";
import { Photo } from "./Photo.entity";

export class Project {
    constructor(public id: string,
        public name: string,
        public description: string,
        public photos: Photo[],
        public patterns: Pattern[]) { }
}