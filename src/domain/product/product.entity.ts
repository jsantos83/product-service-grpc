export class Product {
  constructor(
    public id: number | null,
    public name: string,
    public description: string | null,
    public price: number
  ) {}

  validate() {
    if (!this.name || this.name.trim().length === 0) {
      throw new Error("Product name is required");
    }
    if (typeof this.price !== "number" || Number.isNaN(this.price)) {
      throw new Error("Price must be a number");
    }
    if (this.price < 0) {
      throw new Error("Price must be non-negative");
    }
  }
}
