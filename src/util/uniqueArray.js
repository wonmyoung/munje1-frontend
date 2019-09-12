export function uniqueArray(arr) {
  let a = [];
  let prev;
  console.log("uniqueArray :>>>>>>>> ");

  arr.sort();

  for (let i = 0; i < arr.length; i++) {
    if (JSON.stringify(arr[i]) !== JSON.stringify(prev)) {
      a.push(arr[i]);
      prev = arr[i];
    }
  }

  console.log("uniqueArray :: ", a);
  return a;
}
