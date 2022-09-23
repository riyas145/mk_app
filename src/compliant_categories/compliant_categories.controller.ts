import {
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  Body,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CompliantCategoriesService } from './compliant_categories.service';
import { ICategory } from './schema/category.model';

@Controller('categories')
export class CompliantCategoriesController {
  constructor(
    private readonly compliantCategoriesService: CompliantCategoriesService,
  ) {}
  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  async getAllGategories(): Promise<any> {
    return await this.compliantCategoriesService.getAllActiveGetegories();
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('/')
  async postCategory(@Body() data: ICategory): Promise<any> {
    return await this.compliantCategoriesService.createCategory(data);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getCategoryById(@Param('id') _id: string): Promise<any> {
    return await this.compliantCategoriesService.getCategoryById(_id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async categoryUpdateById(
    @Param('id') id: string,
    @Body() data: ICategory,
  ): Promise<any> {
    return await this.compliantCategoriesService.updateCategoryById(id, data);
  }
}
