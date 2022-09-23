import { Test, TestingModule } from '@nestjs/testing';
import { CompliantCategoriesController } from './compliant_categories.controller';
import { CompliantCategoriesService } from './compliant_categories.service';

describe('CompliantCategoriesController', () => {
  let controller: CompliantCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompliantCategoriesController],
      providers: [CompliantCategoriesService],
    }).compile();

    controller = module.get<CompliantCategoriesController>(CompliantCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
