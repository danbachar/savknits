import { Pattern } from "./pattern";
import { Photo } from "./photo";

export class Project {
    constructor(public id: string,
        public name: string,
        public description: string,
        public photos: Photo[],
        public patterns: Pattern[]) { }
}