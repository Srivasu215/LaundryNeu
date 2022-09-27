let ShowFunc = async () => {
    let LocalJsonFileName = "Bookings.json";

    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

    let ModalData = await Neutralino.filesystem.readFile(`./KData/JSON/TemplateData/${LocalJsonFileName}`);
    let ModalDataAsJson = JSON.parse(ModalData);

    let LocalCustomersData = await Neutralino.filesystem.readFile(`./KData/JSON/2017/${LocalJsonFileName}`);
    let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);

    let LocalCollectionData = Object.keys(LocalCustomersDataAsJson).map(key => ({ key, value: LocalCustomersDataAsJson[key] }));

    LocalReturnObject.JsonData = LocalCollectionData;
    return await LocalReturnObject;
};

let ShowTodayFunc = async () => {
    let LocalJsonFileName = "Bookings.json";

    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

    let ModalData = await Neutralino.filesystem.readFile(`./KData/JSON/TemplateData/${LocalJsonFileName}`);
    let ModalDataAsJson = JSON.parse(ModalData);

    let LocalCustomersData = await Neutralino.filesystem.readFile(`./KData/JSON/2017/${LocalJsonFileName}`);
    let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);

    Object.entries(LocalCustomersDataAsJson).forEach(
        ([LoopKey, LoopValue]) => {
            if ('DataTime' in LoopValue) {
                let LoopRowDataTime = LoopValue.DataTime.substring(0, 10);
                let LocalSysDateTime = LocalGetDateOnly();

                if (LoopRowDataTime === LocalSysDateTime) {

                    let LoopNewObject = JSON.parse(JSON.stringify(ModalDataAsJson));
                    let LocalLoopObject = {};

                    Object.entries(LoopNewObject).forEach(
                        ([key, value]) => {
                            LocalLoopObject[key] = LoopValue[key];
                            value = LoopValue[key];
                        }
                    );

                    LocalReturnObject.JsonData[LoopKey] = LocalLoopObject;
                };

            };

        }
    );

    return await LocalReturnObject;
};

let ShowWashed = async () => {
    let LocalJsonFileName = "Bookings.json";

    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

    let ModalData = await Neutralino.filesystem.readFile(`./KData/JSON/TemplateData/${LocalJsonFileName}`);
    let ModalDataAsJson = JSON.parse(ModalData);

    let LocalCustomersData = await Neutralino.filesystem.readFile(`./KData/JSON/2017/${LocalJsonFileName}`);
    let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);

    Object.entries(LocalCustomersDataAsJson).forEach(
        ([LoopKey, LoopValue]) => {
            if ('DataTime' in LoopValue) {
                let LoopRowDataTime = LoopValue.DataTime.substring(0, 10);
                let LocalSysDateTime = LocalGetDateOnly();

                if (LoopRowDataTime === LocalSysDateTime) {
                    let LocalWashed = LoopValue.WashingDone;
                    console.log("LocalWashed : ", LocalWashed);
                    if (LocalWashed === undefined || (LocalWashed.KTF === true) === false) {
                        let LoopNewObject = JSON.parse(JSON.stringify(ModalDataAsJson));
                        let LocalLoopObject = {};

                        Object.entries(LoopNewObject).forEach(
                            ([key, value]) => {
                                LocalLoopObject[key] = LoopValue[key];
                                value = LoopValue[key];
                            }
                        );

                        LocalReturnObject.JsonData[LoopKey] = LocalLoopObject;
                    };
                };
            };
        }
    );

    return await LocalReturnObject;
};

let LocalGetDateOnly = () => {
    let date = new Date();

    let dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
    let MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
    let yyyy = date.getFullYear();

    return `${dd}-${MM}-${yyyy}`;
};
