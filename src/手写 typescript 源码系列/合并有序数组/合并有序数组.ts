//有序合并数组
function merge(nums1: number[], nums2: number[]): number[] {
  let len1 = nums1.length;
  let len2 = nums2.length;
  let res: number[] = [];
  let i = 0;
  let j = 0;
  while (i < len1 && j < len2) {
    if (nums1[i] < nums2[j]) {
      res.push(nums1[i]);
      i = i + 1;
    } else {
      res.push(nums2[j]);
      j = j + 1;
    }
  }
  if (i === len1) {
    res.push(...nums2.slice(j - 1));
  } else {
    res.push(...nums1.slice(i - 1));
  }
  return res;
}
