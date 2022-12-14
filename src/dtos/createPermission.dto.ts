import { IsNotEmpty } from "class-validator";

export class CreatePermissionDto {

    @IsNotEmpty()
    permission_name: string;

    @IsNotEmpty()
    permission_description: string;

}