export class Product {
  constructor(public id_real = '',
              public id = 0,
              public title = '',
              public description = '',
              public category = '',
              public imgUrl = '',
              public promoted = false,
              public price = 0,
              public amount = 0) {
  }
}
