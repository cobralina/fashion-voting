import { writable } from 'svelte/store';
import CryptoJS from "crypto-js";

export const dataStore:any = writable([]);
export const favouriteItem:any = writable({ name: "", id: "", credit: "", text: "", show: "" });
export const view:any = writable("init");
export const configs:any = writable([])

async function loadData() {
  let urlParams = new URLSearchParams(window.location.search);
  //var encodedCiphertext = urlParams.get('duelldata');
  var encodedCiphertext = "U2FsdGVkX1932dSe2c2WzHWvqg%2BljDiS%2B0FMVMjBXlTOZ%2FPbA4HQO%2BL%2BQIFQ1YABucAkHCdvlfdFsPwqlew3fWkLD0Dr3n4MDi0URS8SM5OtUHog2xde%2B2R3ysfmC3FXwPkFDzuQsT4xaHgqAhIkUeHNeRxvJ7%2BYXIP4%2FfWrePVLk%2BsI5hLaiuN3ioSYpn4pi2U2cft0XMY5UeJmiQfoXm332xeeGLWQH1c1XkpXetspdovecWntLSz8VduXaI5q4XqoWVs4vpw2HoGzcSnZZzdwWgcsTueWPE3Oie2HYspZAjag5AAXvqaln7nKe31cGXwUZs82u0ktRCKE%2ByuhKyc1UIsUXJZSzVnBN4mjDMkUAuaI3blaGzd1pHWG4X4c3LT8%2FJ8CPCo2l1%2BUJ6doeFD1J5v4ez1Qgsv6G%2FOntExD8ELpG7OFGMFzbE3nIfP8M5rIVShOsa6SuOgvS5A88L%2FoY%2FtlnNGvXWOjT8mYgl1wgU7T5wEYgYR95%2BslxKqzQE8P%2FkL3JifaYExJajM4MK4b1gt755q%2FomsLPX7Bph0jAgru0UHkckqyfnk0pdr4MZH1%2BbjwkB1u83tCnr59WXuKmtTPf6xYw%2FUQEHMuscDfKK7l047D1ZLCR5JpohBvlFmwTeYsGQqQEtDfXrZso8jKqdDZ0iidohAacL3TW5PYuWuTo%2FqBO2MGCwD4j19Vjg9m0x%2FYc97ItrIObtObBax9GXaJyxOjgL5AYaB46Z8uyr7csoPfF9JuiYddBL31RLAQ2IN581rlqXTjpYTJEaphv5WZ0v3JIt9nFvv4ZaB50SNVq5TnoIqEOiWOaGqv5NYwb%2Bo0%2FQDv03Ch48TMtvmm591iMyWfcBxGE588VJn4wIOqUX0UYlvFJ6lZTSLtE4EOgZE4K8iBPSc81cq5qR8r5VuQUsf5Ee3tfPu53aHUlDQAMMtTq0BQ2t4e%2BEcb0SbjRdd%2FvPrY0NUKUVcM5t7W5VHs6mmd27IKn9f%2BrFT%2FQtZDbs%2FUsOiY6oL0UfmaRG%2Bl2i6KPHWnga3ZC5eVpV4AZX6QZpHFGL7xx%2FU23V4T5HwkZ3akTFqBoqllq%2BKdcu6r6fk9ij4d%2ByEPCQdo5oOlX%2Bk9MWIjweVc8y8k6vS%2BfXijwWMtZrf0hpMpmJtUUHAN3ksxYYWcdLE9cI4M1yPrCzdFvp3j%2Blhykay0Qac%3D"
  console.log(encodedCiphertext)

  if (encodedCiphertext !== null) {

    // Decode the ciphertext
      var ciphertext = decodeURIComponent(encodedCiphertext);
      console.log(ciphertext)
    
      var bytes = CryptoJS.AES.decrypt(ciphertext, "ummodeduell82");
      console.log("bytes: ", bytes);
      var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      console.log("decrptefdData: ",decryptedData);}


  try {
    const data = decryptedData.data;
    dataStore.set(data);

    const confdata = decryptedData.configs;
    configs.set(confdata);
   
  } catch (error) {
    console.error('Fehler:', error);
  }
}

loadData();

