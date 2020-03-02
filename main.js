function toggleContentClickEvent(contentDiv, value, key, count, clickCount) {
  if (clickCount % 2 === 1) {
    // If odd clicks, show content
    if (Array.isArray(value)) {
      value.forEach((eachEle, ind) => {
        const arrayDiv = document.createElement("li");
        arrayDiv.innerHTML = key + " Array: " + (+ind + 1);
        contentDiv.appendChild(arrayDiv);
        getKeyValuePair(contentDiv, eachEle, count + 1);
      });
    } else {
      getKeyValuePair(contentDiv, value, count + 1);
    }
  } else {
    // If even clicks, hide content
    contentDiv.innerHTML = null;
  }
}

/**
 *
 * @param {Div element} mainDiv: Element to attach the content to
 * @param {JSON} obj: Pass JSON obj through recursion
 * @param {Integer} count: Wanted to have multiple header elements based on count but ended up using only for main keys
 */
function getKeyValuePair(mainDiv, obj, count) {
  if (obj && typeof obj === "object") {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = obj[key];
      const contentDiv = document.createElement("div");
      contentDiv.className = "content-" + count;
      if (value && typeof value === "object") {
        // Value is either Object or Array type, add click events
        const titleEleType = count === 2 ? "h" + count : "div";
        const titleEle = document.createElement(titleEleType);
        titleEle.className = "content-" + count + " title";
        titleEle.innerHTML = key + ":";

        // Add Click event listener to add & remove content
        let clickCount = 0;
        titleEle.addEventListener("click", function() {
          clickCount++;
          toggleContentClickEvent(contentDiv, value, key, count, clickCount);
        });
        mainDiv.appendChild(titleEle);
        mainDiv.appendChild(contentDiv);

        // Appending type of element to the title key
        if (Array.isArray(value)) {
          titleEle.innerHTML +=
            '<span class="type">' + " Array [" + value.length + "]" + "</span>";
        } else {
          titleEle.innerHTML += '<span class="type">' + " Object" + "</span>";
        }
      } else {
        // Value is not Obect/Array, display it as plain div content
        contentDiv.innerHTML =
          key + ": " + '<span class="value">' + value + "</span>";
        mainDiv.appendChild(contentDiv);
      }
    }
  }
}

function usingPreTag(mainDiv, json) {
  const preTag = document.createElement("pre");
  // This will stringify the json with proper spacing
  preTag.innerHTML = JSON.stringify(json, null, 3);
  mainDiv.appendChild(preTag);
}

fetch("./bunny_json.json")
  .then(x => x.json())
  .then(x => {
    const mainDiv = document.getElementById("main");

    /* Custom json formatter */
    getKeyValuePair(mainDiv, x, 2);

    /* Simple Console style json viewer */
    // usingPreTag(mainDiv, x);
  });
