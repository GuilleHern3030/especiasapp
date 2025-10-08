export const DBConfig = {
  name: "tables",
  version: 1,
  objectStoresMeta: [
    {
      store: "csv",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "name", keypath: "name", options: { unique: false } },
        { name: "email", keypath: "email", options: { unique: false } },
      ],
    },
  ],
};