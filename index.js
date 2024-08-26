const translitMap = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 
    'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i', 
    'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 
    'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 
    'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 
    'ш': 'sh', 'щ': 'sch', 'ъ': "'", 'ы': 'y', 'ь': "'", 
    'э': 'e', 'ю': 'yu', 'я': 'ya',

    'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D',
    'Е': 'E', 'Ё': 'Yo', 'Ж': 'Zh', 'З': 'Z', 'И': 'I',
    'Й': 'J', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N',
    'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T',
    'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'Ts', 'Ч': 'Ch',
    'Ш': 'Sh', 'Щ': 'Sch', 'Ъ': "'", 'Ы': 'Y', 'Ь': "'",
    'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya'
};

function isTextLong(text) {
    if (text.length >= 7) {
        return true
    }
    return false
}

function getTranslitedText(text) {
    let translitedText = ''

    for (let character of text) {
        if (character in translitMap) {
            translitedText += translitMap[character]
        } else {
            translitedText += character
        }
    }
    return translitedText
}

function createElement(tag, className) {
    let element = document.createElement(tag)
    element.className = className;

    return element;
}

function visibilityToggle(element, targetElement) {

    element.addEventListener('mouseover', () => {
        targetElement.style.display = 'block';
    })
    element.addEventListener('mouseout', () => {
        targetElement.style.display = 'none';
    })
}

function createHalfLine(inputText, indexCounter=null, rusLang=false) {
    let text = inputText;
    let halfLineContainer;
    let halfLineText;

    if (rusLang && text) {
        halfLineContainer = createElement('div', 'rus-line');
        halfLineText = createElement('span', 'the-rus-text');
        let index = createElement('span', 'note-index');
        index.innerText = indexCounter + 1;

        halfLineContainer.appendChild(index);
    } else {
        text = getTranslitedText(text);
        halfLineContainer = createElement('div', 'trns-line');
        halfLineText = createElement('span', 'the-trns-text');
        halfLineContainer.appendChild(halfLineText)
    }

    if (isTextLong(text)) {
        halfLineText.innerText = text.slice(0, 6) + '...'
        let tooltip = createElement('span', 'hidden-tooltip');
        tooltip.innerText = text;
        visibilityToggle(halfLineText, tooltip);
        halfLineContainer.appendChild(tooltip);
    } else {
        halfLineText.innerText = getTranslitedText(inputText);
    }

    halfLineContainer.appendChild(halfLineText);
    
    return halfLineContainer
}

function collectLine(lineContainer, rusHalfLine, trnsHalfLine) {
    lineContainer.appendChild(rusHalfLine);
    lineContainer.appendChild(trnsHalfLine);

    return lineContainer
};

function addLine(parentElement, childElement) {
    console.log('parentElement', parentElement)
    console.log('element', childElement)
    parentElement.appendChild(childElement);
}

const allNotesContainer = document.querySelector('.trns-notes')


function lineBuilder () {
    let indexCounter = allNotesContainer.children.length;
    console.log('index', indexCounter)

    let inputText = inputForm.value;
    console.log('input text', inputText)

    let rusHalfLine = createHalfLine(inputText, indexCounter, rusLang=true);
    let trnsHalfLine = createHalfLine(inputText, indexCounter=false, rusLang=false);

    let lineContainer = createElement('div', 'note-line');
    let newLine = collectLine(lineContainer, rusHalfLine, trnsHalfLine);

    addLine(allNotesContainer, newLine)

}

let inputForm = document.querySelector('.input-form')
inputForm.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        lineBuilder()
    }
})

const addButton = document.querySelector('.add-line-button');
addButton.addEventListener('click', () => {
    lineBuilder()
})

inputForm.value = ''