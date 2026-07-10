import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export interface Variant {
  id: string;
  label: string;
  swatch?: string;
}

export interface Product {
  id: string;
  stepId: string;
  title: string;
  description: string;
  learnMoreUrl?: string;
  compareAtPrice?: number;
  price: number;
  priceUnit?: string;
  image: string;
  variants?: Variant[];
  category: 'Cameras' | 'Sensors' | 'Accessories' | 'Plan';
  seededQty?: number;
}

@Injectable()
export class ProductsService {
  private productsData: Product[];

  constructor() {
    const dataPath = path.join(__dirname, 'data', 'products.json');
    const fileContent = fs.readFileSync(dataPath, 'utf-8');
    this.productsData = JSON.parse(fileContent);
  }

  getAll(): Product[] {
    return this.productsData;
  }

  getById(id: string): Product | undefined {
    return this.productsData.find((p) => p.id === id);
  }

  update(id: string, product: Partial<Product>): Product | undefined {
    const index = this.productsData.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.productsData[index] = { ...this.productsData[index], ...product };
      return this.productsData[index];
    }
    return undefined;
  }

  create(product: Product): Product {
    this.productsData.push(product);
    return product;
  }

  delete(id: string): boolean {
    const index = this.productsData.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.productsData.splice(index, 1);
      return true;
    }
    return false;
  }
}
