import assert from 'node:assert/strict';
import test from 'node:test';

import { products } from '../src/data/products.js';

test('catalog identifiers and product codes are unique', () => {
  assert.equal(new Set(products.map((product) => product.id)).size, products.length);
  assert.equal(new Set(products.map((product) => product.code)).size, products.length);
});

test('catalog entries include valid commerce data', () => {
  for (const product of products) {
    assert.ok(product.name && product.note && product.image);
    assert.ok(Number.isFinite(product.price) && product.price > 0);
  }
});
