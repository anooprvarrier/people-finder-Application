export class PeopleFinderPreviewRequest {
    constructor(
        public empid?: string,
        public firstName?: string,
        public middleName?: string,
        public lastName?: string,
        public designation?: string,
        public project?: string,
        public account?: string
    ) { }
}