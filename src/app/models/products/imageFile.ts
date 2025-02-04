export class ImageFile {
    fileName: string;
    base64: string;
    index: number;

    constructor(base64: string | null, fileName: string, index: number) {
        this.base64 = base64;
        this.fileName = fileName;
        this.index = index;
    }
}
