import { Test, TestingModule } from '@nestjs/testing';
import { GenSourceCodeController } from './gen-source-code.controller';

describe('GenSourceCodeController', () => {
  let controller: GenSourceCodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenSourceCodeController],
    }).compile();

    controller = module.get<GenSourceCodeController>(GenSourceCodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
