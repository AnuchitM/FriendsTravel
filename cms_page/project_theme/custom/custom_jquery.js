
async function setDropdown(pathName, ddlName, opName, opValue, ispls) {
    $("#" + ddlName).empty();
    var arrList = await fetch(pathName).then(response => response.json());

    if (ispls) {
        setDropdownPLS(ddlName);
    }

    var select = document.getElementById(ddlName);
    arrList.forEach(function (t) {
        var strName = t[opName];
        var strValue = t[opValue];
        var opt = document.createElement('option');
        opt.innerHTML = strName;
        opt.value = strValue;
        select.appendChild(opt);
    });
}

function setDropdownPLS(ddlName) {
    var select = document.getElementById(ddlName);
    var strName = 'Please Select';
    var strValue = '';
    var opt = document.createElement('option');
    opt.innerHTML = strName;
    opt.value = strValue;
    select.appendChild(opt, 0);
}

function validate_int() {
    return event.charCode >= 48 && event.charCode <= 57;
}

function validate_decimalDigit() {
    return validate_decimalDigit(event, 2, this.value)
}

function validate_decimalDigit(digit) {
    return validate_decimalDigit(event, digit, this.value)
}


        //แปลภาษา
        //function translate(sentences, from_lang = 'th', to_lang = 'en') {
        //    var strValue = "";
        //    sentences = sentences.replace(/\n/g, '<br>')
        //    let endPoint = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from_lang}&tl=${to_lang}&dt=t&ie=UTF-8&oe=UTF-8&q=${encodeURIComponent(sentences)}`;

        //    var xhttp = new XMLHttpRequest();
        //    xhttp.onreadystatechange = function () {
        //        if (this.readyState == 4 && this.status == 200) {
        //            var jsonText = JSON.parse(this.responseText);
        //            text = jsonText[0][0][0]
        //            text = text.replace(/<br>/g, '\n')
        //            //targetDiv.innerHTML = "&nbsp;" + text;
        //            arrProvince.push(text)
        //            if (text != "") {
        //                xx = xx.replace(sentences, text);
        //            }
        //            ;
        //        }
        //    };
        //    xhttp.open("GET", endPoint, true);
        //    xhttp.send();
        //}
        //translate("", from_lang = 'en', to_lang = 'th');



