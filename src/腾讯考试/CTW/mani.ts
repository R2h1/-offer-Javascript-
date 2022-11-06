type StringObject = {
  [key: string]: string;
};
function mani(obj: StringObject, operation: 'delete' | 'edit', prop: string, newValue?: string) {
  const operations = {
    delete: (obj: StringObject, prop: string) => {
      if (obj.hasOwnProperty(prop)) {
        delete obj[prop];
      }
    },
    edit: (obj: StringObject, prop: string, newValue?: string) => {
      if (obj.hasOwnProperty(prop) && typeof newValue === 'string') {
        obj[prop] = newValue;
      }
    },
  };
  operations[operation](obj, prop, newValue);
  return { ...obj };
}
