const addForm = document.querySelector("form.add");
const ul = document.querySelector("ul.todos");
const searchFormInput = document.querySelector("form.search input");

//ADD NEW TODO
const handleAddItem = (inputValue) => {
  let stemWord = stem(inputValue);

  const html = `
   <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${inputValue}</span> -> <span>${stemWord}</span>
      <i class="far fa-trash-alt delete"></i>
    </li>
  `;
  ul.innerHTML += html;
};

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = addForm.add.value;
  if (inputValue.length) handleAddItem(inputValue);
  addForm.add.value = "";
});

//REMOVE TODO
ul.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
});

//SEARCH INPUT: PREVENT DEFAULT ACTION - LITTLE BUG I FOUND IN THE COURSE PROJECT
searchFormInput.parentElement.addEventListener("submit", (e) =>
  e.preventDefault()
);

//SEARCH AND FILTER TODOS
const filterItems = (value) => {
  Array.from(ul.children).forEach((li) => {
    if (!li.textContent.toLowerCase().includes(value))
      li.classList.add("filtred");
    else li.classList.remove("filtred");
  });
};

searchFormInput.addEventListener("keyup", (e) => {
  const value = searchFormInput.value.toLowerCase().trim();
  filterItems(value);
});

// Transliterator

const felig_transliteration_lookup_table = {
  ሀ: "he",
  ሁ: "hu",
  ሂ: "hi",
  ሃ: "he",
  ሄ: "hE",
  ህ: "h",
  ሆ: "ho",
  ለ: "le",
  ሉ: "lu",
  ሊ: "li",
  ላ: "la",
  ሌ: "lE",
  ል: "l",
  ሎ: "lo",
  ሏ: "lWa",
  ሐ: "he",
  ሑ: "hu",
  ሒ: "hi",
  ሓ: "he",
  ሔ: "hE",
  ሕ: "h",
  ሖ: "ho",
  ሗ: "hWa",
  መ: "me",
  ሙ: "mu",
  ሚ: "mi",
  ማ: "ma",
  ሜ: "mE",
  ም: "m",
  ሞ: "mo",
  ሟ: "mWa",
  ሠ: "se",
  ሡ: "su",
  ሢ: "si",
  ሣ: "sa",
  ሤ: "sE",
  ሥ: "s",
  ሦ: "so",
  ሧ: "sWa",
  ረ: "re",
  ሩ: "ru",
  ሪ: "ri",
  ራ: "ra",
  ሬ: "rE",
  ር: "r",
  ሮ: "ro",
  ሯ: "rWa",
  ሰ: "se",
  ሱ: "su",
  ሲ: "si",
  ሳ: "sa",
  ሴ: "sE",
  ስ: "s",
  ሶ: "so",
  ሷ: "sWa",
  ሸ: "xe",
  ሹ: "xu",
  ሺ: "xi",
  ሻ: "xa",
  ሼ: "xE",
  ሽ: "x",
  ሾ: "xo",
  ሿ: "xWa",
  ቀ: "qe",
  ቁ: "qu",
  ቂ: "qi",
  ቃ: "qa",
  ቄ: "qE",
  ቅ: "q",
  ቆ: "qo",
  ቈ: "qWe",
  ቊ: "qu",
  ቋ: "qWa",
  ቌ: "qWE",
  ቍ: "qW",
  በ: "be",
  ቡ: "bu",
  ቢ: "bi",
  ባ: "ba",
  ቤ: "bE",
  ብ: "b",
  ቦ: "bo",
  ቧ: "bWa",
  ቨ: "ve",
  ቩ: "vu",
  ቪ: "vi",
  ቫ: "va",
  ቬ: "vE",
  ቭ: "v",
  ቮ: "vo",
  ቯ: "vWa",
  ተ: "te",
  ቱ: "tu",
  ቲ: "ti",
  ታ: "ta",
  ቴ: "tE",
  ት: "t",
  ቶ: "to",
  ቷ: "tWa",
  ቸ: "ce",
  ቹ: "cu",
  ቺ: "ci",
  ቻ: "ca",
  ቼ: "cE",
  ች: "c",
  ቾ: "co",
  ቿ: "cWa",
  ኀ: "he",
  ኁ: "hu",
  ኂ: "hi",
  ኃ: "he",
  ኄ: "hE",
  ኅ: "h",
  ኆ: "ho",
  ኈ: "hWe",
  ኊ: "hWi",
  ኋ: "hWa",
  ኌ: "hWE",
  ኍ: "hW",
  ነ: "ne",
  ኑ: "nu",
  ኒ: "ni",
  ና: "na",
  ኔ: "nE",
  ን: "n",
  ኖ: "no",
  ኗ: "nWa",
  ኘ: "Ne",
  ኙ: "Nu",
  ኚ: "Ni",
  ኛ: "Na",
  ኜ: "NE",
  ኝ: "N",
  ኞ: "No",
  ኟ: "NWa",
  አ: "a",
  ኡ: "u",
  ኢ: "i",
  ኣ: "a",
  ኤ: "E",
  እ: "I",
  ኦ: "o",
  ኧ: "e",
  ከ: "ke",
  ኩ: "ku",
  ኪ: "ki",
  ካ: "ka",
  ኬ: "kE",
  ክ: "k",
  ኮ: "ko",
  ኰ: "ko",
  ኲ: "kWi",
  ኳ: "kWa",
  ኴ: "kWE",
  ኵ: "kW",
  ኸ: "Ke",
  ኹ: "hu",
  ኺ: "hi",
  ኻ: "he",
  ኼ: "hE",
  ኽ: "h",
  ኾ: "ho",
  ዀ: "KWe",
  ዂ: "KWi",
  ዃ: "KWa",
  ዄ: "KWE",
  ዅ: "KW",
  ወ: "we",
  ዉ: "wu",
  ዊ: "wi",
  ዋ: "wa",
  ዌ: "wE",
  ው: "w",
  ዎ: "wo",
  ዐ: "e",
  ዑ: "u",
  ዒ: "i",
  ዓ: "e",
  ዔ: "E",
  ዕ: "e",
  ዖ: "o",
  ዘ: "ze",
  ዙ: "zu",
  ዚ: "zi",
  ዛ: "za",
  ዜ: "zE",
  ዝ: "z",
  ዞ: "zo",
  ዟ: "zWa",
  ዠ: "Ze",
  ዡ: "Zu",
  ዢ: "Zi",
  ዣ: "Za",
  ዤ: "ZE",
  ዥ: "Z",
  ዦ: "Zo",
  ዧ: "ZWa",
  የ: "ye",
  ዩ: "yu",
  ዪ: "yi",
  ያ: "ya",
  ዬ: "yE",
  ይ: "y",
  ዮ: "yo",
  ደ: "de",
  ዱ: "du",
  ዲ: "di",
  ዳ: "da",
  ዴ: "dE",
  ድ: "d",
  ዶ: "do",
  ዷ: "dWa",
  ጀ: "je",
  ጁ: "ju",
  ጂ: "ji",
  ጃ: "ja",
  ጄ: "jE",
  ጅ: "j",
  ጆ: "jo",
  ጇ: "jWa",
  ገ: "ge",
  ጉ: "gu",
  ጊ: "gi",
  ጋ: "ga",
  ጌ: "gE",
  ግ: "g",
  ጎ: "go",
  ጐ: "go",
  ጒ: "gWi",
  ጓ: "gWa",
  ጔ: "gWE",
  ጕ: "gW",
  ጠ: "Te",
  ጡ: "Tu",
  ጢ: "Ti",
  ጣ: "Ta",
  ጤ: "TE",
  ጥ: "T",
  ጦ: "To",
  ጧ: "TWa",
  ጨ: "Ce",
  ጩ: "Cu",
  ጪ: "Ci",
  ጫ: "Ca",
  ጬ: "CE",
  ጭ: "C",
  ጮ: "Co",
  ጯ: "CWa",
  ጰ: "Pe",
  ጱ: "Pu",
  ጲ: "Pi",
  ጳ: "Pa",
  ጴ: "PE",
  ጵ: "P",
  ጶ: "Po",
  ጷ: "PWa",
  ጸ: "SSe",
  ጹ: "SSu",
  ጺ: "SSi",
  ጻ: "SSa",
  ጼ: "SSE",
  ጽ: "SS",
  ጾ: "SSo",
  ጿ: "SSWa",
  ፀ: "SSe",
  ፁ: "SSu",
  ፂ: "SSi",
  ፃ: "SSa",
  ፄ: "SSE",
  ፅ: "SS",
  ፆ: "SSo",
  ፈ: "fe",
  ፉ: "fu",
  ፊ: "fi",
  ፋ: "fa",
  ፌ: "fE",
  ፍ: "f",
  ፎ: "fo",
  ፏ: "fWa",
  ፐ: "pe",
  ፑ: "pu",
  ፒ: "pi",
  ፓ: "pa",
  ፔ: "pE",
  ፕ: "p",
  ፖ: "po",
  ፗ: "pWa",
};

function felig_transliterate(word, lang) {
  let trans_word = "";

  if (lang === "am") {
    let tokens = word.split("");
    tokens.forEach((letter) => {
      if (felig_transliteration_lookup_table[letter] !== undefined) {
        trans_word += felig_transliteration_lookup_table[letter];
      }
    });
  } else if (lang === "en") {
    let tokens = word.match(/.{1,2}/g);

    if (tokens === null) {
      return "";
    }

    tokens.forEach((letter) => {
      if (/[^aeiou][aeiou]/i.test(letter)) {
        let am_letter = "";

        if (/[W][a]/g.test(letter)) {
          am_letter = Object.keys(felig_transliteration_lookup_table).find(
            (key) =>
              felig_transliteration_lookup_table[key] === letter.toLowerCase()
          );
        } else {
          am_letter = Object.keys(felig_transliteration_lookup_table).find(
            (key) => felig_transliteration_lookup_table[key] === letter
          );
        }

        if (am_letter !== undefined) {
          trans_word += am_letter;
        }
      } else {
        let ltrs = letter.split("");
        let am_letter = "";
        ltrs.forEach((ltr) => {
          am_letter += Object.keys(felig_transliteration_lookup_table).find(
            (key) => felig_transliteration_lookup_table[key] === ltr
          );
        });

        if (am_letter !== undefined && am_letter !== "ኧ") {
          trans_word += am_letter;
        }
      }
    });
  }

  return trans_word;
}

// Stemmer
// Takes Amharic language words and produces a stem
// ልጆች -> ልጅኦች -> ljoc -> lj -> ልጅ

const suffix_list =
  "ኦችኣችኧውንንኣ|ኦችኣችህኡ|ኦችኣችኧውን|ኣችኧውንንኣ|ኦችኣችኧው|ኢዕኧልኧሽ|ኦችኣችን|ኣውኢው|ኣችኧውኣል|ችኣት|ችኣችህኡ|ችኣችኧው|ኣልኧህኡ|ኣውኦች|ኣልኧህ|ኣልኧሽ|ኣልችህኡ|ኣልኣልኧች|ብኣችኧውስ|ብኣችኧው|ኣችኧውን|ኣልኧች|ኣልኧን|ኣልኣችህኡ|ኣችህኡን|ኣችህኡ|ኣችህኡት|ውኦችንንኣ|ውኦችን|ኣችኧው|ውኦችኡን|ውኦችኡ|ውንኣ|ኦችኡን|ኦውኦች|ኝኣንኧትም|ኝኣንኣ|ኝኣንኧት|ኝኣን|ኝኣውም|ኝኣው|ኣውኣ|ብኧትን|ኣችህኡም|ችኣችን|ኦችህ|ኦችሽ|ኦችኡ|ኦችኤ|ኦውኣ|ኦቿ|ችው|ችኡ|ኤችኡ|ንኧው|ንኧት|ኣልኡ|ኣችን|ክኡም|ክኡት|ክኧው|ችን|ችም|ችህ|ችሽ|ችን|ችው|ይኡሽን|ይኡሽ|ውኢ|ኦችንንኣ|ኣውኢ|ብኧት|ኦች|ኦችኡ|ውኦን|ኝኣ|ኝኣውን|ኝኣው|ኦችን|ኣል|ም|ሽው|ክም|ኧው|ውኣ|ትም|ውኦ|ውም|ውን|ንም|ሽን|ኣች|ኡት|ኢት|ክኡ|ኤ|ህ|ሽ|ኡ|ሽ|ክ|ች|ኡን|ን|ም|ንኣ";
const prefix_list =
  "ስልኧምኣይ|ይኧምኣት|ዕንድኧ|ይኧትኧ|ብኧምኣ|ብኧትኧ|ዕኧል|ስልኧ|ምኧስ|ዕይኧ|ይኣል|ስኣት|ስኣን|ስኣይ|ስኣል|ይኣስ|ይኧ|ልኧ|ብኧ|ክኧ|እን|አል|አስ|ትኧ|አት|አን|አይ|ይ|አ|እ";
const sfx_arr = [];
const pfx_arr = [];

function stem(word) {
  let cv_string = felig_transliterate(word, "am"); // consonant-vowel string

  // Prepare suffix array
  const sarr = suffix_list.split("|");
  sarr.forEach((suffix) => {
    sfx_arr.push(felig_transliterate(suffix, "am"));
  });

  sfx_arr.push("Wa"); // Special case for ሯ

  // Prepare prefix array
  const parr = prefix_list.split("|");
  parr.forEach((prefix) => {
    pfx_arr.push(felig_transliterate(prefix, "am"));
  });

  // Remove suffixes
  sfx_arr.every(function (sfx, index) {
    if (cv_string.endsWith(sfx)) {
      let regex = new RegExp(`${sfx}$`, `i`);
      cv_string = cv_string.replace(regex, "");
      return false;
    } else return true;
  });

  // Remove prefixes
  pfx_arr.every(function (pfx, index) {
    if (cv_string.startsWith(pfx)) {
      let regex = new RegExp(`^${pfx}`);
      cv_string = cv_string.replace(regex, "");
      return false;
    } else return true;
  });

  // Remove infixes
  if (/.+([^aeiou])[aeiou]\1[aeiou].?/i.test(cv_string)) {
    cv_string = cv_string.replace(
      /\S\S[^aeiou][aeiou]/i,
      cv_string[0] + cv_string[1]
    );
  } else if (/^(.+)a\1$/i.test(cv_string)) {
    cv_string = cv_string.replace(/a.+/i, "");
  }

  return felig_transliterate(cv_string, "en");
}
