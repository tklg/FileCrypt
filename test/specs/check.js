describe('filecrypt', function() {
    browser.url('/');

    let btns = $('#btns');
    let tests = ['generateKey','exportKey','importKey','deriveKey','ab2str','encrypt','decrypt','importPassword'];
    let out = browser.element('#output');

    browser.waitForExist('#' + tests[tests.length - 1], 500);

    for (let i = 0; i < tests.length; i++) {
        it(tests[i], function() {
            btns.$('#'+tests[i]).click();
            assert.equal(browser.getHTML('#output', false).indexOf('success') > -1, true);
        });
    }

});