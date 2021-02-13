import { IsArray, IsNotEmpty } from "class-validator";

export class CompanyDto {

    @IsNotEmpty()
    readonly name: string;
    
    @IsNotEmpty()
    readonly description: string;

    @IsArray()
    readonly userIds: Array<string>;
}