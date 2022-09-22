let ShowFunc = async () => {
    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

    let ModalData = await Neutralino.filesystem.readFile('./KData/JSON/TemplateData/Customers.json');
    let ModalDataAsJson = JSON.parse(ModalData);

    let LocalCustomersData = await Neutralino.filesystem.readFile('./KData/JSON/2017/Customers.json');
    let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);

    Object.entries(LocalCustomersDataAsJson).forEach(
        ([LoopKey, LoopValue]) => {
            
            let LoopNewObject = JSON.parse(JSON.stringify(ModalDataAsJson));

            Object.entries(LoopNewObject).forEach(
                ([key, value]) => {
                    value = LoopValue[key];
                }
            );

            LocalReturnObject.JsonData[LoopKey]=LoopNewObject;
        }
    );

    return await LocalReturnObject;
};
