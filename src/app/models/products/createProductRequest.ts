export class CreateProductRequest {
    categoryId: string;
    name: string;
    description: string;
    technicalSpecifications: string;
    imageFile: FormData;
    price: number;
    promotionalPrice: number;
    isMedicine: boolean;
    expiryDate: Date;
}