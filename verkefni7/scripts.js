/**
 * Sýnilausn á verkefni 7 í vef1 2025.
 *
 * Notar jsdoc fyrir skjölun og týpur.
 * Hægt að kveikja á `Check JS` og `Strict Null Checks` í VSCode til að fá
 * ábendingar um hvar hlutir geti bilað.
 *
 * Munið að þetta verkefni skal skrifað af ykkur án hjálpar mállíkans.
 * Agents, models and other LLMs or AI tools must not be used to implement this
 * assignment. They can be used to help with understanding concepts and if that
 * is done, include a link to the chat via sharing.
 */

/** @typedef {Object} TodoItem
 * @property {string} text - Texti verkefnis.
 * @property {boolean} finished - Hvort verkefni sé klárað eða ekki.
 */

/** Verkefnalistinn okkar, hann mun innihalda hluti (objects) af týpu
 * `TodoItem`.
 * Með því að skilgreina týpuna og kveikja á `Check JS` í VSCode fáum við villu
 * ef við reynum að setja eitthvað annað en `TodoItem` í listann.
 * @type {TodoItem[]}
 */
const todoList = [

];

//------------------------------------------------------------------------------
// Föll sem vinna með verkefnalistann

/**
 * Búa til verkefni og bæta því aftast í verkefnalistann.
 * @param {unknown} input - Texti verkefnis, ætti að vera strengur.
 * @returns {number} Ný stærð verkefnalistans.
 */
function isValidNumber(value) {
  return typeof value === 'number' && Number.isInteger(value) && Number.isFinite(value);
}

function typeError(fn, expected, got) {
    console.error(`[${fn}] ólöglegt inntak. Vænti: ${expected}. Fékk:`, got, `(týpa: ${typeof got})`);
}

function printItem(item, index) {
    const status = item.finished ? 'klárað' : 'ekki klárað';
    console.log(`${index}: ${item.text} - ${status}`);
}

function createTodoItem(input) {
    if (typeof input !== 'string') {
        typeError('createTodoItem', 'string', input);
        alert('Verkefni verður að vera texti.' );
        return todoList.length;
    }
    const text = input.trim();
    if (text.length === 0) {
        console.warn('Tómur texti er ekki leyfður.');
        alert('Verkefni má ekki vera tómt.');
        return todoList.length;
    }
    const item = { text, finished : false };
    const newLength = todoList.push(item);
    console.log(`[createTodoItem] Bætti við: "${text}". Heildarfjöldi: ${newLength}.`);
    return newLength;
}
function list() {
    if (todoList.length === 0) {
        console.log('[list] Engin verkefni í listanum');
        return;
    }
    console.log('Verkefnalisti');
    todoList.forEach((item, i) => printItem(item, i));
}

/**
 * Breytir stöðu verkefnis í „klárað“ eða „óklárað“.
 * @param {unknown} index - Index verkefnis í lista, verður að vera á bilinu
 *   [0, todoList.length], ætti að vera tala
 * @returns {boolean} - `true` ef breyting tókst, annars `false`.
 */
function toggleFinished(index) {
    if (!isValidNumber(index)) {
        typeError('toggleFinished', 'heiltala', index);
        return false;
    }
    if (index < 0 || index >= todoList.length) {
        console.warn(`[toggleFinished] index ${index} er utan marka [o, ${todoList.length}].`);
        return false;
    }
    const item = todoList[index];
    item.finished = !item.finished;
    const status = item.finished ? 'klárað': 'óklárað';
    console.log(`[toggleFinished] "${item.text}" er núna ${status}.`);
    return true;
}

/**
 * Skrifar út stöðu verkefnalistans í console.
 */
function stats() {
    const total = todoList.length;
    const done = todoList.filter((v) => v.finished).length;
    const notDone = total - done;
    console.log(`- Staða - Heild: ${total}. kláruð: ${done}. ókláruð: ${notDone}.`);
}

/**
 * Tæma verkefnalistann.
 */
function clear() {
    if (todoList.length === 0) {
        console.log('[clear] Engin verkefni til að hreinsa.');
        return;
    }
    const doneCount = todoList.filter((v) => v.finished).length;
    if (doneCount === 0) {
        console.log('[clear] Engin kláruð verkefni til að eyða.');
        return;
    }
    const ok = confirm(`Eyða ${doneCount} kláruðuverkefnið?`);
    if (!ok) {
        console.log('[clear] Hætt við.');
        return;
    }
    for(let i = todoList.length - 1; i >= 0; i--) {
        if (todoList[i].finished) {
            todoList.splice(i, 1);
        }
    }
    console.log('[clear] Kláruð verkefni fjarlægð. Nýr fjöldi.', todoList.length);
  
}


function start() {
    while (true) {
        const input = prompt('Sláðu inn texta fyrir nýtt verkefni. Cancel er til að hætta.');

        if (input === null) {
            console.log('[start] hætt við innslátt.');
            break;
        }
        const text = input.trim();
        if (text.length === 0) {
            alert('Verkefni verður að hafa texta');
            continue;
        }

        createTodoItem(text);
    }

    list();
    stats();
}