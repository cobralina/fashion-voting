import { writable } from 'svelte/store';

export const dataStore = writable([]);
export const favouriteItem = writable({ name: "", id: "", credit: "", text: "", show: "" });
export const view = writable("init");

async function loadData() {
  try {
    const response = await fetch('/testdata.json');
    if (!response.ok) {
      throw new Error('Fehler beim Laden der Daten');
    }
    const jsonData = await response.json();
    
    dataStore.set(jsonData.data);
    dataStore.subscribe(value => {
        console.log('Aktualisierter Store:', value);
      });

  } catch (error) {
    console.error('Fehler:', error);
  }
}

loadData();

