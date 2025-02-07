const firebaseURL = 'https://join-e8b41-default-rtdb.europe-west1.firebasedatabase.app/';

/**
 * 
 * @param {string} key 
 * @param {object} value 
 * @returns a function that saves the object (value) in Firebase under the name key
 */
async function setItem(key, value) {
    const url = `${firebaseURL}/${key}.json`;
    return fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value),
    })
        .then(res => res.json())
        .catch(error => {
            console.error('Error saving data to Firebase:', error);
            throw error;
        });
}

/**
 * 
 * @param {string} key 
 * @returns the value which is saved under the key's name
 */
async function getItem(key) {
    const url = `${firebaseURL}/${key}.json`;
    return fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data !== null) {
                return data;
            }
            throw `No data found for key: ${key}`;
        })
        .catch(error => {
            console.error('Error fetching data from Firebase:', error);
            throw error;
        });
}

/**
 * 
 * this function clears all current users
 */
async function clearUsers() {
    const users = [];
    setItem('users', users)
        .then(() => {
            console.log('Users data cleared successfully.');
        })
        .catch(error => {
            console.error('Error clearing users data:', error);
        });
}

/**
 * 
 * this function clears all current contacts
 */
async function clearContacts() {
    const allContacts = [];
    setItem('allContacts', allContacts)
        .then(() => {
            console.log('Contacts data cleared successfully.');
        })
        .catch(error => {
            console.error('Error clearing contacts data:', error);
        });
}
