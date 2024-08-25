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

function createNoteLine(inputText, trnsText) {
    const allNotesContainer = document.querySelector('.trns-notes')
    let indexCounter = allNotesContainer.children.length;
    
    let lineContainer = createElement('div', 'note-line');
    let ruslineContainer = createElement('div', 'rus-line')
    let trnslineCOntainer = createElement('div', 'trns-line')

    let lineIndex = createElement('span', 'note-index')
    lineIndex.innerText = indexCounter + 1;

    let rusText = createElement('span', 'the-rus-text');
    rusText.innerText = rusText;

    let trnsText = createElement('span', 'the-trns-text');
    trnsText.innerText = getTranslitedText(inputText);

    


    return(`<div class="note-line">
        <div class="rus-line">
            <span class="note-index">1</span>
            <span class="the-rus-text">${'text'}!</span>
        </div>

        <div class="trns-line">
            <span class="note-index">1</span>
            <span class="the-trns-text">${getTranslitedText('text')}!</span>
        </div>
    </div>`)
}

createNoteLine()

