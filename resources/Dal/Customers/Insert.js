let UniqueFunc = async ({ inObjectToInsert = {} }) => {
    let LocalReturnObject = { KTF: false, KResult: "" };

    let UniqueColumnsData = await Neutralino.filesystem.readFile('./KData/JSON/UniqueColumns/Customers.json');
    let UniqueColumnsDataAsJson = JSON.parse(UniqueColumnsData);

    let LocalCustomersData = await Neutralino.filesystem.readFile('./KData/JSON/2017/Customers.json');
    let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);
    let LocalValueToCheck = _.get(inObjectToInsert, UniqueColumnsDataAsJson.ColumnName);

    let LocalDataNeeded = _.map(Object.values(LocalCustomersDataAsJson), UniqueColumnsDataAsJson.ColumnName);
    console.log("ppppp : ", LocalDataNeeded, LocalValueToCheck);
    if (LocalDataNeeded.includes(LocalValueToCheck)) {
        LocalReturnObject.KTF = true;
        LocalReturnObject.KReason = `${LocalValueToCheck} : ${UniqueColumnsDataAsJson.ColumnName} already found in Customers.json.`;
        return await LocalReturnObject;
    };

    return await LocalReturnObject;
};

let InsertFunc = async ({ inObjectToInsert = {} }) => {
    let LocalReturnObject = { KTF: false, KResult: "" };

    let ModalData = await Neutralino.filesystem.readFile('./KData/JSON/TemplateData/Customers.json');
    let ModalDataAsJson = JSON.parse(ModalData);

    let LocalCustomersData = await Neutralino.filesystem.readFile('./KData/JSON/2017/Customers.json');
    let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);
    let LocalKeys = Object.keys(LocalCustomersDataAsJson);
    let max = 1;
    let LocalFromUnique = await UniqueFunc({ inObjectToInsert });
    console.log("LocalFromUnique--- : ", LocalFromUnique);

    if (LocalFromUnique.KTF) {
        LocalReturnObject.KReason = LocalFromUnique.KReason;
        return await LocalReturnObject;
    };

    if (LocalKeys.length > 0) {
        let LocalKeysAsNumbers = toNumbers(LocalKeys);

        max = Math.max(...LocalKeysAsNumbers) + 1;
    };

    let LocalNewData = _.pick(inObjectToInsert, Object.keys(ModalDataAsJson));
    LocalCustomersDataAsJson[max] = LocalNewData;

    await Neutralino.filesystem.writeFile('./KData/JSON/2017/Customers.json', JSON.stringify(LocalCustomersDataAsJson));

    return await LocalReturnObject;
};

const toNumbers = arr => arr.map(Number);
