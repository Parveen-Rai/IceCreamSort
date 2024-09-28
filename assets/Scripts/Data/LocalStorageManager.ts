const gameName = "IceCreamSort";
export class LocalStorageManager{

    saveData(key:string , data:any){
        const _key = gameName+"_"+key;
        localStorage.setItem(_key,JSON.stringify(data));
    }

    getData(key){
        const _key = gameName+"_"+key;
        let retrievedData = localStorage.getItem(_key);
        return JSON.parse(retrievedData);
    }

    deleteData(key){
        const _key = gameName+"_"+key;
        localStorage.removeItem(_key);
    }

    clearAllData(){
        localStorage.clear();
    }
}


