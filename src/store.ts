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
    "U2FsdGVkX1%2FihTMONu7Mt5lD%2BUUWFHLVMC4ahlaT%2FdAsTk4l6JYBClPe%2FrOWczl%2F8s%2By27vwbHwXQre%2BxQG3PZzwmxmN%2BGrWnukV%2Btv18n2SnFERTda%2FtxH5U0vf6MWBkPINDzK%2BKsiMRigaNn36s3vTv9cXmPdC%2FgI%2FKUa95necZOYvlFVJjBXRzfGXCksg%2BjOw6ZkxTGeDUo94IHuuryOs809JWMke4t0N4kTKTtL04Y6iTsZJ6yW34zVNquyhMr1pfFsDmpsm5pU4Rl2BseQU%2FRKQ7DhYtwvPkSpzH5xn5VBJA6tuxlfOPoNjBwDh8w14C5c1ERidG2mD4lB%2FpjTZso2dJkGDm0Nm4ASiFJzMwh4ai7a2g46td4pO9LTRkVF8%2FemueNYAuObnE4rddqoyfPqWxfYHpPtvDNUgeTfvFpDxBAHLbsJjMm1oUSfk2zNE%2F7v0qkEW0QL8P%2FFiOOYo%2BvvDMyca1ytK6BTbs10WgepODbvOLKvyRQQ4yj2l7tFMOTiteyLVu5ePhvz%2FQhn6joydQXWNfzHYlAQ3VMU34fOR%2BsyZuCCMFISYT4Z%2FybwNvt3xZB8GkRY6Cil3fYfNhq1cATTKoAJQGUryy%2Ff681Kp60DOwUfoLFI3nlMWRQpl02OONmIoKqmKydHYbxCmD7wGh6IvqQuSp8kjrHHEi2pTCMnqAM4A1HbyQsXUOqWsXW5tGFwehUPEmc9mnjGcLvwLzfLRMmsWCBrORhFqW6D5ULc6Rkx4sXPsaTTGMUgq6KBxpOH4pxuaVQ7PqY9PRMoT8hPD7TY98bWKhtoRUDkaYYJzk5mzH%2FImOs1BPTOYC3KlbFwGNEadxZAQHFJO1rTZZ%2FHdMQtjjudOX3Xsgvjto%2BAmV7%2B6%2B0ZCYVtROb1Gzl45Uecb%2Fwt1JNnKVROV4l6aWY8cTWuSgSJX0PpVLJMjjWJceZK7BBS3fyFR3AHEgLoKt%2B3bKfusgjSKcEReFXaqfU4OIIuSTeQN%2F%2BlZtZPI07Y7%2FyCLjL%2FvTGuVJu%2BAZkbwl7p1HTHAx3%2BXgS5Y4I1VB3mG0JDYOKM3PqdvtjL04t%2BYQ7rGqL9EPLn2hKpAEY500689UrMQf%2B02GNNUOx5usjO8f50z21%2B4VbPMI3frCh8C4ju%2BZMyWwxv4qUV6FuyNBCnE2XvmYkI6h2pEr2lXWt5CzMrukbdvAgT5rOv9LYo8CeF4xBrN6wDPqEzr6llqob%2BdmBC%2BuoVXNUplHRsYzqXRtExX8B0K3j67EAlHTC6FRf%2FspS1t7zqD74WJRd0LwsNnS%2FBXclg%2BvbpkvHQDVGN5%2Fn22zZyl6LXplUrCjlpoaj7bxzBZeTdZJAsOU%2BGE8Dy2K%2BARCOXt8C6DQo7zTA96gP4WDAC4ktsDam5RG7fWJoiZwOtvWDdGi2Mf%2BNNqkNTRz4vAu0nWp0PFfuFMHcPg3Mp1VhYsj7A09KpUUjPoBJ3Rc4WnIa8YHAmf%2BNRgbktmfDPSh4bYQ3zzGY7EJs5TVUIjRDnCIHJp1g2KqtdW6CEqlWxC%2FIts725wVDOxpapjsWtqfDLRSM5T9ASxHmC6JtQa%2FLbOf0ov7MO7JuSoXYxnRi4bp6XQQx3wJQes9s0kw%2BiLdAYLhVToMs3qL6YUS9j2UKaibHcZyckt7q2HyDSF9P5h8RKG";
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
