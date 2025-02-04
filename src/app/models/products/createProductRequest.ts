import { ImageFile } from "./ImageFile";

export class CreateProductRequest {
    categoryId: string;
    name: string;
    description: string;
    technicalSpecifications: string;
    price: number;
    promotionalPrice: number;
    isMedicine: boolean;
    expiryDate: Date;
    fileName: string;
    base64: string;
    fileImages: ImageFile[];
}

