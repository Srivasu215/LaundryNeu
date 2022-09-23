let DeleteFunc = async ({ inRowPK }) => {
    let LocalReturnObject = { KTF: false, KResult: "" };

    let LocalCustomersData = await Neutralino.filesystem.readFile('./KData/JSON/2017/Customers.json');
    let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);

    if (inRowPK in LocalCustomersDataAsJson) {
        delete LocalCustomersDataAsJson[inRowPK];

        let LocalFromWriteFile = await Neutralino.filesystem.writeFile('./KData/JSON/2017/Customers.json', JSON.stringify(LocalCustomersDataAsJson));

        if (LocalFromWriteFile.success) {
            LocalReturnObject.KTF = true;
            LocalReturnObject.KResult = `${inRowPK} deleted successfully...`
        };
    };

    return await LocalReturnObject;
};
