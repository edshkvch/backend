import { ClassConstructor } from 'class-transformer';
import { DeepPartial, FindOptionsUtils, FindOptionsWhere, Repository as Entity } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

interface RepositoryOptions<T> {
  baseClass: ClassConstructor<T>;
}

interface UpdateRelationFilter {
  _id: string;
}

interface PaginationOptions {
  limit?: number;
  offset?: number;
}

export class Repository<T> {
  constructor(private readonly entity: Entity<T>, private readonly repositoryOptions: RepositoryOptions<T>) {}

  public async count(filter: FindOptionsWhere<T>) {
    return this.entity.count({ where: filter });
  }

  public async create(entity: DeepPartial<T>): Promise<T> {
    return this.entity.save(entity);
  }

  public async createMany(entity: DeepPartial<T>[]): Promise<T[]> {
    return this.entity.save(entity);
  }

  public async delete(filter: FindOptionsWhere<T>) {
    return this.entity.delete(filter);
  }

  public async deleteAndGet(filter: FindOptionsWhere<T> | FindOptionsWhere<T>[] = []) {
    const entity = await this.entity.findOne({ where: filter });

    if (!entity) {
      // throw new NotFoundException();
      // return
    }

    await this.entity.remove(entity);

    return entity;
  }

  public async deleteByIds({ _id }) {
    this.entity.createQueryBuilder().delete().from(this.repositoryOptions.baseClass).where('_id In(:_id)', { _id }).execute();
  }

  public async exists(filter: FindOptionsWhere<T>) {
    const count = await this.count(filter);

    return count > 0;
  }

  public async find(filter?: FindOptionsWhere<T>, { limit, offset }: PaginationOptions = {}): Promise<T[]> {
    const BaseClass = this.repositoryOptions.baseClass;

    const metadata = this.entity.manager.connection.getMetadata(BaseClass);

    return this.entity.manager.connection
      .createQueryBuilder(BaseClass, FindOptionsUtils.extractFindManyOptionsAlias(filter) || metadata.name)
      .setFindOptions({ where: filter })
      .limit(limit)
      .offset(offset)
      .getMany();
  }

  public async findOne(filter: FindOptionsWhere<T>): Promise<T> {
    const BaseClass = this.repositoryOptions.baseClass;

    const metadata = this.entity.manager.connection.getMetadata(BaseClass);
    const alias = metadata.name;

    return this.entity.manager.createQueryBuilder(BaseClass, alias).setFindOptions({ where: filter }).getOne();
  }

  public async updateOne(filter: FindOptionsWhere<T>, entity: QueryDeepPartialEntity<T>) {
    return this.entity.update(filter, entity);
  }

  public async updateOneAndGet(filter: FindOptionsWhere<T>, entity: QueryDeepPartialEntity<T>) {
    await this.entity.update(filter, entity);

    return this.entity.findOne({ where: filter });
  }

  public async updateRelation(updateRelationFilter: UpdateRelationFilter, updateEntity: DeepPartial<T>) {
    return this.entity.save({ ...updateRelationFilter, ...updateEntity });
  }
}
