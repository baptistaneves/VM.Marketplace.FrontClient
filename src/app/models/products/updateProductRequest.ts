import { ImageFile } from "./ImageFile";

export class UpdateProductRequest {
    id: string;
    categoryId: string;
    name: string;
    description: string;
    technicalSpecifications: string;
    mainPhoto: string;
    price: number;
    promotionalPrice: number;
    isMedicine: boolean;
    expiryDate: Date;
    fileName: string;
    base64: string;
    fileImages: ImageFile[];
}