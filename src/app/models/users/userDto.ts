export class UserDto {
    id: string;
    typeUser: string;
    email: string;
    fullName: string;
    phoneNumber: string;
    role: string;
    photoUrl: string;
    address: string;
    city: string;
    state: string;
    vatNumber: string;
    bank: string;
    accountNumber: string;
    accountHolder: string;
    iban: string;
    createdAt: Date;
    isDeleted: boolean
    isBlocked: boolean;
    isVerified: boolean;
    businessLicense: string;
}