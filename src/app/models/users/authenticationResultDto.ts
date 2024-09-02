import { ClaimDto } from "./claimDto";

export class AuthenticationResultDto {

    id:string;
    fullName:string;
    email:string;
    role:string;
    phoneNumber: string;
    token: string;
    claims: ClaimDto[];
}