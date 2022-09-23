let InsertFunc = async ({ inObjectToInsert = {} }) => {
    let LocalJsonFileName = "Bookings.json";

    let LocalReturnObject = { KTF: false, KResult: "" };

    let ModalData = await Neutralino.filesystem.readFile(`./KData/JSON/TemplateData/${LocalJsonFileName}`);
    let ModalDataAsJson = JSON.parse(ModalData);

    let LocalCustomersData = await Neutralino.filesystem.readFile(`./KData/JSON/2017/${LocalJsonFileName}`);
    let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);
    let LocalKeys = Object.keys(LocalCustomersDataAsJson);
    let max = 1;

    if (LocalKeys.length > 0) {
        let LocalKeysAsNumbers = toNumbers(LocalKeys);

        max = Math.max(...LocalKeysAsNumbers) + 1;
    };

    let LocalNewData = _.pick(inObjectToInsert, Object.keys(ModalDataAsJson));
    LocalCustomersDataAsJson[max] = LocalNewData;

    let LocalFromWriteFile = await Neutralino.filesystem.writeFile(`./KData/JSON/2017/${LocalJsonFileName}`, JSON.stringify(LocalCustomersDataAsJson));

    if (LocalFromWriteFile.success) {
        LocalReturnObject.KResult = `${max} saved successfully...`;
        LocalReturnObject.KTF = true;
    };

    return await LocalReturnObject;
};

const toNumbers = arr => arr.map(Number);
