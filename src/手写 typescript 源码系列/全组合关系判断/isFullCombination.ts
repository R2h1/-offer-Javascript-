/**
 * 设计一个函数，判断给定的数据集是否具有全组合关系：不同字段对应的值每个行记录
 *    不同字段的值的组合，在行记录中均能找到有且仅有的一条。
 *    const inputData = [
 *      {"字段1": '甲', "字段2": 'a', "字段3": '1'},
 *      {"字段1": '甲', "字段2": 'a', "字段3": '2'},
 *      {"字段1": '甲', "字段2": 'a', "字段3": '3'},
 *      {"字段1": '甲', "字段2": 'b', "字段3": '1'},
 *      {"字段1": '甲', "字段2": 'b', "字段3": '2'},
 *      {"字段1": '甲', "字段2": 'b', "字段3": '3'},
 *      {"字段1": '乙', "字段2": 'a', "字段3": '1'},
 *      {"字段1": '乙', "字段2": 'a', "字段3": '2'},
 *      {"字段1": '乙', "字段2": 'a', "字段3": '3'},
 *      {"字段1": '乙', "字段2": 'b', "字段3": '1'},
 *      {"字段1": '乙', "字段2": 'b', "字段3": '2'},
 *      {"字段1": '乙', "字段2": 'b', "字段3": '3'},
 *    ]
 */
const inputData: any[] = [
  { 字段1: '甲', 字段2: 'a', 字段3: '1' },
  { 字段1: '甲', 字段2: 'a', 字段3: '2' },
  { 字段1: '甲', 字段2: 'a', 字段3: '3' },
  { 字段1: '甲', 字段2: 'b', 字段3: '1' },
  { 字段1: '甲', 字段2: 'b', 字段3: '2' },
  { 字段1: '甲', 字段2: 'b', 字段3: '3' },
  { 字段1: '乙', 字段2: 'a', 字段3: '1' },
  { 字段1: '乙', 字段2: 'a', 字段3: '2' },
  { 字段1: '乙', 字段2: 'a', 字段3: '3' },
  { 字段1: '乙', 字段2: 'a', 字段3: '3' },
  { 字段1: '乙', 字段2: 'b', 字段3: '1' },
  { 字段1: '乙', 字段2: 'b', 字段3: '2' },
  { 字段1: '乙', 字段2: 'b', 字段3: '3' },
];

export function isFullCombination(data = inputData): boolean {
  const combSet = new Set();
  const fieldMap = data.reduce<Map<string, Set<string>>>((map, item) => {
    const valueString = Object.entries(item).reduce<string>((string, [field, value]) => {
      if (!map.get(field)) {
        map.set(field, new Set());
      }
      map.get(field)!.add(value as string);
      return string + value;
    }, '');
    combSet.add(valueString);
    return map;
  }, new Map());
  // 组合数
  const combCount = [...fieldMap].reduce((acc, [_, value]) => {
    return acc * value.size;
  }, 1);
  console.log(fieldMap, combCount, combSet);
  return data.length > 0 && combSet.size === combCount;
}

console.log(isFullCombination());
