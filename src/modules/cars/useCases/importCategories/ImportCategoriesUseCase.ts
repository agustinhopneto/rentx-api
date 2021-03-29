import csvParse from 'csv-parse';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';

interface IImportCategories{
  name: string,
  description: string
}

@injectable()
class ImportCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepository,
  ) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategories[]> {
    return new Promise((resolve, reject) => {
      const fileParser = csvParse();
      const categories:IImportCategories[] = [];

      const stream = fs.createReadStream(file.path);
      stream.pipe(fileParser);

      fileParser
        .on('data', async (line) => {
          const [name, description] = line;
          categories.push({
            name,
            description,
          });
        })
        .on('end', () => {
          fs.promises.unlink(file.path);
          return resolve(categories);
        })
        .on('error', (err) => reject(err));
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.forEach(async (category) => {
      const { name } = category;
      const alreadyExists = await this.categoriesRepository.findByName(name);

      if (!alreadyExists) {
        await this.categoriesRepository.create(category);
      }
    });
  }
}
export { ImportCategoriesUseCase };
