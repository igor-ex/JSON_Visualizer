var inputButton = document.getElementById('inputButton');
var jsonPut = document.getElementById('jsonPut');
var resultVisual = document.getElementById('resultVisual');

inputButton.addEventListener('click', function () {
    var JSONText = jsonPut.value;
    if (JSONText === '') {
        return;
    }
    JSONText = JSON.parse(JSONText);
    var readyJson = JsonVisualize(JSONText);
    resultVisual.innerHTML = '';
    resultVisual.appendChild(readyJson);
});

function JsonVisualize(elem) {
    var ulElem = document.createElement('ul');
    var liElem;
    var key;
    if (elem instanceof Array) {
        for (var i = 0; i < elem.length; i++) {
            liElem = document.createElement('li');
            if (elem[i] === null) {
                liElem.innerHTML = '<span class="JSON-Visualizer__entry_blue">' + 'null' + '</span>' + '<span class="JSON-Visualizer__entry_red">null</span>';
            } else if (typeof elem[i] === "object") {
                key = document.createElement('p');
                key.classList.add('fas', 'fa-angle-down');
                var innerObj = JsonVisualize(elem[i]);
                ; (function (innerObj) {
                    key.addEventListener('click', function (e) {
                        innerObj.classList.toggle('JSON-Visualizer__entry_invisible');
                        swapClass(e.target, 'fa-angle-down', 'fa-angle-right');
                    });
                })(innerObj);
                liElem.appendChild(key);
                liElem.appendChild(innerObj);
            } else {
                liElem.innerHTML = '<span class="JSON-Visualizer__entry_blue">' + elem[i].toString() + '</span>' + '<span class="JSON-Visualizer__entry_red">' + typeof elem[i]  + '</span>';
            }
            ulElem.appendChild(liElem);
        }
    } else {
        for (var prop in elem) {
            liElem = document.createElement('li');
            if (elem[prop] === null) {
                liElem.innerHTML = prop + ' : <span class="JSON-Visualizer__entry_blue">' + 'null' + '</span>' + '<span class="JSON-Visualizer__entry_red">null</span>';
            } else if (typeof elem[prop] === "object") {
                var objType = 'object';
                Array.isArray(elem[prop]) ? objType = 'array' : 'object';
                key = document.createElement('p');
                key.classList.add('fas', 'fa-angle-down');
                key.innerHTML = prop + '<span class="JSON-Visualizer__entry_red">'+ objType + '</span>';
                var innerObj = JsonVisualize(elem[prop]);
                ; (function (innerObj) {
                    key.addEventListener('click', function (e) {
                        innerObj.classList.toggle('JSON-Visualizer__entry_invisible');
                        swapClass(e.target, 'fa-angle-down', 'fa-angle-right');
                    });
                })(innerObj);
                liElem.appendChild(key);
                liElem.appendChild(innerObj);
            } else {
                liElem.innerHTML = prop + ' : <span class="JSON-Visualizer__entry_blue">' + elem[prop].toString() + '</span>' + '<span class="JSON-Visualizer__entry_red">' + typeof elem[prop]  + '</span>';
            }
            ulElem.appendChild(liElem);
        }
    }
    return ulElem;
}

function swapClass (elem, cl1, cl2){
    if(elem.classList.contains(cl1)){
        elem.classList.remove(cl1);
        elem.classList.add(cl2);
    }
    else if(elem.classList.contains(cl2)){
        elem.classList.remove(cl2);
        elem.classList.add(cl1);
    }
}
