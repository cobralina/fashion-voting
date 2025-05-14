import { writable } from "svelte/store";
import CryptoJS from "crypto-js";

export const dataStore: any = writable([]);
export const favouriteItem: any = writable({
  name: "",
  id: "",
  format: "",
  credit: "",
  text: "",
  show: "",
});
export const view: any = writable("init");
export const configs: any = writable([]);

async function loadData() {
  let urlParams = new URLSearchParams(window.location.search);
  //var encodedCiphertext = urlParams.get("duelldata");
  var encodedCiphertext =
    "U2FsdGVkX1%2BE1xRnk3081wDUE13R9cCK8p6lYzhiU6czJi9d4NcZFZE7s4B%2BR68Z%2F5nNuIJek5tJqMG0lYQj1AF41%2Bw89DehS4wmeUSc93xnkBp4tDGDUhNvIYIYqmBITgbYuor7A2cTXjxNdgxX29M4nWP1vd02DSeSiHZ6s1%2Ba%2BeqMo%2FmDSSg6jSf%2FuXW9BAGbO1BEWuyFX0%2F9vZVcV0faowl2BLZKYBgVOspA%2B6UJXfrXJx8A22SFpsMFKhWQFLNtHCNijjYXgNq4HzpR%2BYjDT6yH%2BSM4dNBggNIrC%2Fv8h6cR9JAgo5il33y5kHG5%2BKV2PquYHveHGzsrlnynGygQ4U2dsWzPNbRwvmmbCEzae1Ty9z8kT9h%2Fp5rkiUNEinSuVbP2uM9tZSEeZrpgv1Roj6lIOvTeY8ZgD6vEysZ9HRdvEUWHKV4M14R3cjNUpg2abk2hEEDQzgtSJzqOr2OPUNGfssj8l3POvAHABA48jtZpVzo%2F9o33u6ad0xx1gOuk%2B9qmaADxuNaZWU6vS9MeI3hWBYUZQm28uou%2FaeP57IAfpTGNOsJjCgS%2FlslZ%2FkYdlV2WN0gi4A%2FLUJJNirD4pt9msvomkCL5KtZ8PtlEOr1EKthjeMHbLmegldytwAZtWswCOSNqOw%2BJM9UtXrJYMu8NzlW8NK9z8G7%2BU3pyPCzi7Rni8RiGReCZz77l7uhrM3gRuLwA2RzxAlkCLPYldCpRASKYoPXz0Ea1H6LaXqj%2FV3Td1R8uH614OS0AGjS9PGY1qtslaTPFW8EScQ8jtOjrahzWqix%2B%2B7uhn5U3vcvsrcPwQsP7Del0dyPUm0JJw%2B5KArFJ6LIcuVk9dT%2FOIroSff3S0yy7F8V1oORq9h9CRRst%2FSxQZlBRV%2FmC7stGxd4PVQm3dBhRXw4ajIqQXKhKwYUbdWituFWyTjszUpt538oJZet%2B%2FHGfwNX43aPcklVQPVnw3dZIUG9PzrTHSidvPUhTbWgyolHvo2G%2FCDRscrnlNRLhNVAN4ZIAj4btesKIhgn2OTmvgnHfVcTJ3upGDFmtyXehNNWBQkfdbM8hdLLT22byXvheh7Ls2F73o34h%2F51quU2eK97yDOkvTqHDikZe75fO4EbWLwKKjqSLjVU867isOMXFSVu70IRTTMyfKRx7EDZP0%2BYcHC0LjF069rsF%2FC7UUNYdC%2BUg1NDsWFPb9NGVlYqXS1%2F3Q018JCqRXvRCFNgagGPtFWhH4%2BXTchhwhBw4VocqBPOK8yGRyfduUd8wgWmwhSpFqkkP9gcid2%2BPyW%2FnTFN2Dduy5hJY9B2%2BuwJeP9%2FCcMu92uB5XKLBCrX1YkaOuWpDmmSfTMXrFx3gbElxPDesiT0thtLPA3QuJXQfvdaZ%2FgzoWWQPv2MslQ431QoDFgUag1HksExe6wVQyrZAKh5GFm6wUdG%2BzeFsJP3tL%2BAJkCpmb4hV1CDaxtOjPUhVTgOXR6rHZ02a55YNGYQxBf4FJmLJosdStZxMBqCkmdeQUEggkszP3JKuBGEV0B6VNXJQH7YnfFxRhbo%2B%2FNxTT7fEKLCEJviFTGrqLhhwRofLLjU0JZ0dgTX9WJ5lmM52%2BlxA4bGosDmrHch7SEfIVKYOha9LGRlii6UoWFkVsC9HY7F%2B%2Buo8OdrdMBWFqIOMWxii";
  console.log(encodedCiphertext);

  if (encodedCiphertext !== null) {
    // Decode the ciphertext
    var ciphertext = decodeURIComponent(encodedCiphertext);
    console.log(ciphertext);

    var bytes = CryptoJS.AES.decrypt(ciphertext, "ummodeduell82");
    console.log("bytes: ", bytes);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log("decrptefdData: ", decryptedData);
  }

  try {
    const data = decryptedData.data;
    dataStore.set(data);
    console.log("dataStore: ", data);

    const confdata = decryptedData.configs;
    configs.set(confdata);
  } catch (error) {
    console.error("Fehler:", error);
  }
}

loadData();
