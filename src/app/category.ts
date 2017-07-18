export class Category {
  public id: string;
  public title: string;
  public description: string;
  constructor(id = '', title = '', description = '') {
    this.id = id;
    this.title = title;
    this.description = description;
  }
}
