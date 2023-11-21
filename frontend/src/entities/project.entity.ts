export class Project {
    constructor(public id: string,
                public name: string,
                public description: string,
                public photos: string[],
                public patterns: string[],
                public mainPhoto: string,
                public mainPattern: string) {}
}