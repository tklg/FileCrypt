module.exports = {
  baseURL: 'https://selenium-release.storage.googleapis.com',
  version: '3.3.1',
  drivers: {
    chrome: {
      version: '2.29',
      arch: process.arch,
      baseURL: 'https://chromedriver.storage.googleapis.com'
    },
    firefox: {
      version: '0.15.0',
      arch: process.arch,
      baseURL: 'https://github.com/mozilla/geckodriver/releases/download'
    }
  }
};
