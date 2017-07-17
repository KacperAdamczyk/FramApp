export class Category {
  public id: string;
  public title: string;
  public description: string;
  constructor(id: string, title: string, description: string) {
    this.id = id;
    this.title = title ? title : '';
    this.description = description ? description : '';
  }
}
