import { describe, it } from 'node:test';
import assert from 'node:assert';
import { ensureOrderFromObject } from '../index.js';

describe('testing examples', () => {
  it('should be equal to 2', () => {
    assert.strictEqual(2, 2);
  });
});

describe('Test ensure parameters orders ', () => {
  it('should be equal to [] from undefined', () => {
    const sqlText = 'SELECT * FROM users';
    const results = ensureOrderFromObject(sqlText, undefined);
    assert.strictEqual(results.length, 0);
  });

  it('should be equal to [] from empty', () => {
    const sqlText = 'SELECT * FROM users';
    const params = {};
    const results = ensureOrderFromObject(sqlText, params);
    assert.strictEqual(results.length, 0);
  });

  it('should be equal to [1] for one parameter', () => {
    const sqlText = 'SELECT * FROM users WHERE id = @id';
    const params = {
      id: 1,
    };
    const results = ensureOrderFromObject(sqlText, params);
    assert.strictEqual(results.length, 1);
    const expectedResults = [1];

    assert.deepEqual(results, expectedResults);
  });

  it('should be equal to [1, 10] for one parameter', () => {
    const sqlText = 'SELECT * FROM users WHERE id = @id AND cid = @cid';
    const params = {
      cid: 10,
      id: 1,
    };
    const results = ensureOrderFromObject(sqlText, params);
    assert.strictEqual(results.length, 2);
    const expectedResults = [1, 10];

    assert.deepEqual(results, expectedResults);
  });

  it('should be equal to [1, 1] for one parameter but two uses', () => {
    const sqlText = 'SELECT * FROM users WHERE id > @id AND id < MINUS(@id, 10)';
    const params = {
      id: 1,
    };
    const results = ensureOrderFromObject(sqlText, params);
    assert.strictEqual(results.length, 2);
    const expectedResults = [1, 1];

    assert.deepEqual(results, expectedResults);
  });

  it('should be equal to [5, 4, 3, 2, 1] for five parameter in the reverse order', () => {
    const sqlText = 'SELECT * FROM users WHERE e = @e AND d = @d AND c = @c AND b=@b AND a=@a';
    const params = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5
    };
    const results = ensureOrderFromObject(sqlText, params);
    assert.strictEqual(results.length, 5);
    const expectedResults = [5, 4, 3, 2, 1];

    assert.deepEqual(results, expectedResults);
  });
});
