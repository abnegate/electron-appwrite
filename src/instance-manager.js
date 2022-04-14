const storage = require('electron-json-storage');

//storage.clear();

const addInstanceType = (type, url) => {
    const key = `instances.${type}`;

    return new Promise((resolve, reject) => {
        storage.has(key, (err, hasKey) => {
            if (err) reject(err);
            if (hasKey) {
                storage.get(key, (err, data) => {
                    if (err) reject(err);
                    storage.set(key, { urls: new Set(...data.urls, url) }, (err) => {
                        if (err) reject(err);
                        resolve();
                    });
                });
            } else {
                storage.set(key, { urls: [url] }, (err) => {
                    if (err) reject(err);
                    resolve();
                });
            }
        });
    });
};

const getInstanceTypeUrls = (type) => {
    const key = `instances.${type}`;

    return new Promise((resolve, reject) => {
        storage.has(key, (err, hasKey) => {
            if (err) reject(err);
            if (hasKey) {
                storage.get(key, (err, data) => {
                    if (err) reject(err);
                    resolve(data.urls);
                });
            } else {
                resolve([]);
            }
        });
    });
};

const setCurrentInstanceUrl = (url) => {
    return new Promise((resolve, reject) => {
        storage.set('currentInstanceUrl', url, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
};

const getCurrentInstanceUrl = () => {
    return new Promise((resolve, reject) => {
        storage.get('currentInstanceUrl', (err, url) => {
            if (err) reject(err);
            if (Object.keys(url).length === 0) resolve(null);
            resolve(url);
        });
    });
};

module.exports = {
    addInstanceType,
    getInstanceTypeUrls,
    setCurrentInstanceUrl,
    getCurrentInstanceUrl,
};