let pageURL,
    pageTitle,
    pageDescription,
    outputString,
    donateToggle = 'fake';

const elemTemplate = document.querySelector('.elemTemplate'),
    elemButtonGet = document.querySelector('.buttonGet'),
    elemButtonCopy = document.querySelector('.buttonCopy'),
    elemButtonDonate = document.querySelector('.buttonDonate'),
    elemOutputSection = document.querySelector('.output'),
    elemOutputTextarea = document.querySelector('.outputTextarea'),
    elemEmail = document.querySelector('.elemEmail');

function setPageURL(data) {
    pageURL = data.url;
}

function setPageTitle(data) {
    pageTitle = data.title;
}

function setPageDescription(data) {
    pageDescription = data[0];
}

elemButtonGet.addEventListener("click", function() {
    outputString = elemTemplate.getAttribute('value');
    outputString = outputString.replace('{url}', pageURL);
    outputString = outputString.replace('{title}', pageTitle);
    outputString = outputString.replace('{description}', pageDescription);

    elemOutputTextarea.textContent = outputString;
    elemOutputSection.style.display = 'block';

    if (donateToggle == 'fake') {
        elemButtonDonate.style.display = 'block';
    }
});

elemButtonCopy.addEventListener("click", function() {
    navigator.clipboard.writeText(outputString);
});

elemButtonDonate.addEventListener("click", function() {
    if (donateToggle == 'fake') {
        this.textContent = 'Nice Try!';
        donateToggle = 'nice try';
    } else if (donateToggle == 'nice try') {
        this.style.display = 'none';
        elemEmail.style.display = 'block';
    }
});

chrome.tabs.query({
    active: true,
    currentWindow: true
}, function(tabs) {
    setPageURL(tabs[0]);
    setPageTitle(tabs[0]);
    chrome.tabs.executeScript(tabs[0].id, {
        code: 'document.querySelector("meta[name=description]").content'
    }, setPageDescription);
});