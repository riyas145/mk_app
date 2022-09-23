import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICategory } from './schema/category.model';
import { Category, CategoryDocumet } from './schema/category.schema';

@Injectable()
export class CompliantCategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocumet>,
  ) {}
  async createCategory(data: ICategory): Promise<any> {
    try {
      await this.categoryModel.create(data);
      return {
        message: 'Category Created Successfully',
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
      };
    }
  }
  async getAllActiveGetegories(): Promise<any> {
    try {
      const result = await this.categoryModel.find(
        { isActive: true },
        { isActive: 0, __v: 0 },
      );
      return {
        message: 'All Active categories',
        status: HttpStatus.OK,
        data: result,
      };
    } catch (error) {
      return {
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
      };
    }
  }
  async getCategoryById(id: string): Promise<any> {
    try {
      const result = await this.categoryModel
        .findById(id, { isActive: 0, __v: 0 })
        .exec();
      return {
        status: HttpStatus.OK,
        data: result,
      };
    } catch (error) {
      return {
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
      };
    }
  }
  async updateCategoryById(id: string, data: ICategory): Promise<any> {
    try {
      await this.categoryModel.findByIdAndUpdate(id, data);
      return {
        message: 'Category Updated successfully',
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
      };
    }
  }
}
