import { Pattern } from "./pattern.entity";
import { Photo } from "./photo.entity";

export class Project {
    constructor(public id: string,
        public name: string,
        public description: string,
        public photos: Photo[],
        public patterns: Pattern[]) { }
}