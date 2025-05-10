// very minimal json parser

const regex = /"/;
const EachWordregex = /^"\w+"\s*:\s*"[^"]+",?$/;
const regexToDetectStartPartOfArray = /^"\w+":\[$/;

const parseJson = (str) => {
  if (str === "null") return null;
  if (str === "true") return true;
  if (str === "false") return false;
  if (!isNaN(str)) return Number(str);

  if (str.startsWith('"') && str.endsWith('"')) return str.slice(1, -1);

  for (let i = 0; i < str.length; i++) {
    if (regexToDetectStartPartOfArray.test(str)) {
    }
  }

  const res = {};
  for (let i = 0; i < str.length; i++) {
    if (regex.test(str[i])) {
      for (let j = i + 1; j < str.length; j++) {
        if (regex.test(str[j])) {
          const keyValueStringified = str.slice(i, j + 1);
          const wordKV = EachWordregex.test(keyValueStringified);
          if (wordKV) {
            const colonIndex = keyValueStringified.indexOf(":");
            const key = keyValueStringified.substring(0, colonIndex).replace(/("|')/g, "").trim();
            const val = keyValueStringified
              .substring(colonIndex + 1)
              .replace(/("|')/g, "")
              .trim();
            res[key] = val;
            i = j;
            break;
          }

          if (regexToDetectStartPartOfArray.test(keyValueStringified)) {
            console.log("hete", keyValueStringified);
          }
        }
      }
    }
  }
  return res;
};

console.log(
  parseJson(
    '{"name":"Govind","phone":"+32378233882", "address":"Whitefield, Bangalore", "age": "20", "dev": "true", "is": "false", "dev": ["FE", "BE", "FS"]}'
  )
);
