import { Test, TestingModule } from '@nestjs/testing';
import { CompliantCategoriesService } from './compliant_categories.service';

describe('CompliantCategoriesService', () => {
  let service: CompliantCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompliantCategoriesService],
    }).compile();

    service = module.get<CompliantCategoriesService>(CompliantCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
