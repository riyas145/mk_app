import { Module } from '@nestjs/common';
import { CompliantCategoriesService } from './compliant_categories.service';
import { CompliantCategoriesController } from './compliant_categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schema/category.schema';

@Module({
  controllers: [CompliantCategoriesController],
  providers: [CompliantCategoriesService],
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
})
export class CompliantCategoriesModule {}
