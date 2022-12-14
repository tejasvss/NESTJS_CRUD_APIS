import {
    Body,
    Controller,
    Get,
    Post,
    Param,
    Delete,
    Put,
    HttpCode,
    HttpStatus,
    Res,
    Query
} from '@nestjs/common';
import { throws } from 'assert';

import { Permissions } from 'src/entities/permissions.entity';
import { PermissionsService } from 'src/permissions/permissions.service';
import { CreatePermissionDto } from 'src/dtos/createPermission.dto';
import { response } from 'express';
import { UpdatePermissionDto } from 'src/dtos/updatePermission.dto';

@Controller('permissions')
export class PermissionsController {
    constructor(private readonly permissionsService: PermissionsService) { }

    @Post('/createPermission')
    async createPermission(@Res() response, @Body() createPermissionDto: CreatePermissionDto): Promise<Permissions> {
        let permissionsData = await this.permissionsService.createPermission(createPermissionDto);
        return response.status(200).send({ status: 200, Message: 'Permissions created successfully', Data: permissionsData })
    }



    @Get('/getAllPermissions')
    async getAllPermissions(@Res() response): Promise<Permissions[]> {
        let permissionsData = await this.permissionsService.getAllPermissions();
        return response.status(200).send({ status: 200, Message: "Permissions fetched succesfully", Data: permissionsData })
    }

    @Put('/updatePermission/:permission_id')
    async updatePermissionById(@Res() response, @Param('permission_id') permission_id: number, @Body() updatePermissionDto: UpdatePermissionDto): Promise<Permissions> {
        let data = await this.permissionsService.updatePermission(permission_id, updatePermissionDto);
        return response.status(200).send({ status: 200, Message: "Permissions updated succesfully", Data: data })
    }

    @Get('/getPermission')
    async getPermissionById(@Res() response, @Query('permission_id') permission_id: number): Promise<Permissions> {
        let permissionData = await this.permissionsService.getPermissionById(permission_id);
        return response.status(200).send({ status: 200, Message: 'Permission fetched successfully', Data: permissionData })
    }

    @Delete('/deletePermission')
    async deletePermissionById(@Res() response, @Query('permission_id') permission_id: number): Promise<void> {
        let data = await this.permissionsService.deletePermissionById(permission_id);
        return response.status(200).send({ statusCode: 200, message: "Permission record deleted successfully", data: {} })
    }
}