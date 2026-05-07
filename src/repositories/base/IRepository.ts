export interface IRepository<T, CreateInput = Partial<T>, UpdateInput = Partial<T>> {
  findById(id: string): Promise<T | null>
  findAll(filters?: Partial<T>): Promise<T[]>
  create(data: CreateInput): Promise<T>
  update(id: string, data: UpdateInput): Promise<T>
  softDelete(id: string): Promise<void>
  hardDelete(id: string): Promise<void>
}
