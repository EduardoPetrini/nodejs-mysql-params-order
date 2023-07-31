/**
 *
 * @param {*} sqlText the query must contain the annotation param name like `id = @id`
 * @param {*} objectParams object with the name of the param and its value. The name should match with the query param annotation
 */
export function ensureOrderFromObject(sqlText, objectParams) {
  if (!objectParams) {
    return [];
  }

  if (Object.keys(objectParams).length === 0) {
    return [];
  }

  const entries = Object.entries(objectParams);

  const sqlTextSplitted = sqlText.split('@');

  const correctOrderParams = sqlTextSplitted.reduce((paramOrder, sqlPart) => {
    const entry = entries.find(([key, value]) => (sqlPart.startsWith(key) ? true : false));

    if (!entry) {
      return paramOrder;
    }

    return [...paramOrder, entry.at(-1)];
  }, []);

  return correctOrderParams;
}
