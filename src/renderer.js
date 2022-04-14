document.getElementById('btnCloud').addEventListener('click', () => {
  const url = getURL(Sources.CLOUD)
  window.appwrite.addInstanceType(Sources.CLOUD, url);
  window.appwrite.loadURL(url);
  window.appwrite.resize(1024, 1024);
});
document.getElementById('btnSelfHosted').addEventListener('click', () => {
  const url = getURL(Sources.SELF_HOSTED);
  window.appwrite.addInstanceType(Sources.SELF_HOSTED, url);
  window.appwrite.loadURL(url);
  window.appwrite.resize(1024, 1024);
});
document.getElementById('btnLocal').addEventListener('click', () => {
  const url = getURL(Sources.LOCAL);
  window.appwrite.addInstanceType(Sources.LOCAL, url);
  window.appwrite.loadURL(url);
  window.appwrite.resize(1024, 1024);
});

const Sources = {
  CLOUD: 'cloud',
  SELF_HOSTED: 'self-hosted',
  LOCAL: 'local'
};

const getURL = (type) => {
    switch (type) {
      case Sources.CLOUD:
        return 'https://demo.appwrite.io';
      case Sources.SELF_HOSTED:
        return prompt('Enter your instance URL:', 'https://demo.appwrite.io');
      case Sources.LOCAL:
        return 'http://localhost';
    }
};