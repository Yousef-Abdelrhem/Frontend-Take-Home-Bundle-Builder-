import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import type { Product } from './products.service';
import { ProductsService } from './products.service';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll(): Product[] {
    return this.productsService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Product | { error: string } {
    const product = this.productsService.getById(id);
    return product || { error: 'Product not found' };
  }

  @Post()
  create(@Body() product: Product): Product {
    return this.productsService.create(product);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() product: Partial<Product>): Product | { error: string } {
    const updated = this.productsService.update(id, product);
    return updated || { error: 'Product not found' };
  }

  @Delete(':id')
  delete(@Param('id') id: string): { success: boolean } {
    const deleted = this.productsService.delete(id);
    return { success: deleted };
  }
}
