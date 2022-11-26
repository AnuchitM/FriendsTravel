
function isInteger(s) {
    var i;
    //alert(s);
    for (i = 0; i < s.length; i++) {
        // Check that current character is number.
        var c = s.charAt(i);
        if (((c < "0") || (c > "9"))) return false;
    }
    // All characters are numbers.
    return true;
}


function Trim(s) {
    var temp = " ";
    var i = 0;

    while ((temp == " ") && (i <= s.length)) {
        temp = s.charAt(i);
        i++;
    }
    s = s.substring(i - 1, s.length);
    return (s);
}

function IsEmpty(s) {
    if (Trim(s) == "") {
        return (true);
    } else {
        return (false);
    }
}
function IsEmptyNumber(s) {
    if (Trim(s) == "" || Trim(s) == "0") {
        return (true);
    } else {
        return (false);
    }
}

function IsSelected(s) {
    if (s.options[s.selectedIndex].value == -99) {
        return (false);
    } else {
        return (true);
    }
}

function IsOption(s) {
    Temp = false;
    for (i = 0; i < s.length; i++) {
        if (s[i].checked == true) {
            Temp = true;
            break;
        }
    }
    return (Temp);
}

function IsChecked(s) {
    if (s.checked == true) {
        return (true);
    } else {
        return (false);
    }
}


function validate_Number(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
        return false;
    }
    return true;
}

function validate_NumberWithDash(evt) {
    //alert(evt);
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9-]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}


function validate_decimalDigit(evt, digit, sValue) {

    if (!validate_Number(evt)) {
        return false;
    }
    var theEvent = evt || window.event;

    var count = (sValue.match(/\./g) || []).length;
    if (count >= 1 && theEvent.key == ".") {
        return false;
    }

    var sCheckDigit = retr_dec(sValue);
    if (sCheckDigit >= digit) {
        return false;
    }
    return true;
}

function validate_decimalDigit_Minus(evt, digit, sValue) {
    //debugger;
    var statusMinus = false;
    if (evt.key == '-' && (sValue.match(/\-/g) || []).length == 0) {
        statusMinus = true;
    }

    if (!validate_Number(evt) && !statusMinus) {
        return false;
    }
    var theEvent = evt || window.event;

    var count = (sValue.match(/\./g) || []).length;
    if (count >= 1 && theEvent.key == "." && !statusMinus) {
        return false;
    }

    var sCheckDigit = retr_dec(sValue);
    if (sCheckDigit >= digit && !statusMinus) {
        return false;
    }
    return true;
}

function preventdat_number(el, evt) {
    var datPos = el.value.indexOf("-");
    var caratPos = getSelectionStart(el);
    var dotPos = el.value.indexOf(".");

    if (datPos >= 0) {
        if (/^-/.test(el.value)) {
        }
        else {
            el.value = el.value.replace(/-/, "");
        }
    }

    if (/^-0./.test(el.value)) {

        if (caratPos > dotPos && dotPos > -1) {

        }
        else {
            el.value = el.value.replace(/0./, "")
        }
    }

    if (/^0./.test(el.value)) {

        if (caratPos > dotPos && dotPos > -1) {

        }
        else {
            el.value = el.value.replace(/^0./, "")
        }
    }

    return true;
}

function retr_dec(num) {
    return (num.split('.')[1] || []).length;
}


function OnlyNumbers(target) {
    var newVal = document.getElementById(target).value;
    if (isNaN(newVal)) {
        document.getElementById(target).value = newVal.replace(/[^0-9.]/g, "");
    }
}

function IsEmail(email) {
    var pos;
    email = Trim(email);
    pos = email.indexOf("@");
    if ((pos < 3) || (email.indexOf(".", pos + 2) == -1)) {
        return (false);
    } else {
        return (true);
    }
}

function Warning(obj, message) {
    obj.focus();
    alert(message);
    return false;
}


function VerifyRequireField_CheckBox_Single(objRef) {


    var statusReturn = true;

    if ($(objRef).prop("checked")) {
        statusReturn = false;
    }

    if (!statusReturn) {//not verify
        $(objRef).removeClass('notic_alert_focus');
        $(objRef).next().addClass('notic_alert_focus_chk');
    } else {
        $(objRef).addClass('notic_alert_focus');
        $(objRef).next().addClass('notic_alert_focus_chk');
    }

    return statusReturn;
}


function VerifyRequireField_CheckBox(objRef) {

    //if ($(objRef).attr("disabled") != "disabled") {
    //    if (!($('#' + objRef).is(':checked'))) {
    //        $('label[for="' + objRef + '"]').addClass('notic_alert_focus');

    //        return true;
    //    } else {
    //        $('label[for="' + objRef + '"]').removeClass('notic_alert_focus');

    //        return false;
    //    }
    //} else {
    //    return false;
    //}

    var statusReturn = true;

    $(objRef).find('input:checkbox').each(function () {
        if ($(this).prop("checked")) {
            statusReturn = false;
        }
    });

    if (!statusReturn) {//not verify
        $(objRef).each(function () {
            $(objRef).find('input:checkbox').next().removeClass('notic_alert_focus');
        });
    } else {
        $(objRef).each(function () {
            $(objRef).find('input:checkbox').next().addClass('notic_alert_focus');
        });
    }

    return statusReturn;
}

function VerifyRequireField(objRef) {
    if ($(objRef).attr("disabled") != "disabled") {
        if (IsEmpty(objRef.value)) { $(objRef).addClass('notic_alert_focus'); return true; } else { $(objRef).removeClass('notic_alert_focus'); return false; }
    } else {
        return false;
    }
}

function VerifyRequireFieldSelect2(objRef) {
    if ($(objRef).attr("disabled") != "disabled") {
        if (IsEmpty(objRef.value)) {
            $(objRef).next().find(".select2-selection").addClass('notic_alert_focus');
            return true;
        } else {
            $(objRef).next().find(".select2-selection").removeClass('notic_alert_focus');
            return false;
        }
    } else {
        return false;
    }
}

function VerifyRequireField_Radio(objRef) {
    if (("" + $("input:radio[name=" + objRef + "]:checked").val()) == "undefined") { $("input:radio[name=" + objRef + "]").addClass('notic_alert_focus'); return true; } else { $("input:radio[name=" + objRef + "]").removeClass('notic_alert_focus'); return false; }
}

function VerifyRequireFieldDate(objRef) {
    if ($("input[id$=" + objRef + "_txtCalendarShow]").attr("disabled") != "disabled") {
        if (IsEmpty($("input[id$=" + objRef + "_txtCalendarShow]").val())) { $("input[id$=" + objRef + "_txtCalendarShow]").addClass('notic_alert_focus'); return true; } else { $("input[id$=" + objRef + "_txtCalendarShow]").removeClass('notic_alert_focus'); return false; }
    } else {
        return false;
    }

}

function VerifyInputDate(objRef, objValue) {
    if ($(objRef).attr("disabled") != "disabled") {
        if (!isDate(objValue)) { $(objRef).addClass('notic_alert_focus'); return true; } else { $(objRef).removeClass('notic_alert_focus'); return false; };
    } else {
        return false;
    }

}



function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    // alert(charCode*1 < 48 || charCode*1 > 57 && charCode*1 > 31 );
    if ((charCode * 1 > 31) && (charCode * 1 < 48 || charCode * 1 > 57)) {
        //alert(charCode*1 < 48 || charCode*1 > 57 && charCode*1 > 31 );
        return false;

    } else {
        return true;

    }
}

function isNumberKeyWhitDot(evt, obj) {

    var charCode = (evt.which) ? evt.which : event.keyCode
    var value = obj.value;
    var dotcontains = value.indexOf(".") != -1;
    if (dotcontains)
        if (charCode == 46) return false;
    if (charCode == 46) return true;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}


function isMoneyKey(evt) {
    // alert(evt);

    //33, 34, 35, 36, 37, 38, 39, 40,
    //45, 12

    var charCode = (evt.which) ? evt.which : event.keyCode
    // alert(charCode);
    if (charCode == 190) {
        return true;
    }
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46) {
        return false;
    }
    else {
        return true;
    }
}

function isMoneyKeyNum(evt) {


    var charCode = (evt.which) ? evt.which : event.keyCode
    // alert(charCode);
    if (charCode == 190 || charCode == 110) {
        return true;
    }
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46 && (charCode < 96 || charCode > 105)) {
        return false;
    }

    else {
        return true;
    }
}





function isPhoneKey(evt) {
    //alert(evt);
    var charCode = (evt.which) ? evt.which : event.keyCode
    // alert(charCode);
    if (charCode == 45) {
        return true;
    }
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    } else {
        return true;
    }
}



function date2ValueCompareStart_End(fromdatestring, todatestring) {
    var todate = ConvertToYYYYMMDD(todatestring);
    var fromdate = ConvertToYYYYMMDD(fromdatestring);


    //alert(fromdate);
    //alert(todate);

    if (todate < fromdate) {
        //alert('start date invalid');//  that will be  your code....
        return false;
    } else {
        return true;
    }

}

function CheckRequireFieldAll(objPanel) {

    var ml = objPanel.getElementsByTagName("input");

    var len = ml.length;
    for (var i = 0; i < len; i++) {
        if (ml[i].type == 'text' && ml[i].className == 'textbox_blue' && ml[i].value == '') {
            ml[i].focus();
            return true;
        }
    }


}




function SetAutoCompleted(datasouce, controID, minLength) {


    var arrDataSourc = datasouce.split("|");
    //alert('xxx');
    $(controID).autocomplete({
        minLength: minLength, /*=== Default is 1=====*/
        source: arrDataSourc
    });

}

function destroyAutoCompleted(controID) {
    //alert(controID);
    //$(controID).autocomplete('close');
}


function ConfirmRemove() {
    if (confirm('Do you want to remove this item?')) {
        return true;
    }
    else {
        return false;
    }
}

/*=========== Check Refresh Parent Window =============*/

function ReloadFunction_Dialogbox_and_Lightbox(message, buttonName, flagAlert, flagRefresh) {

    if (flagAlert == 'True') {
        alert(message);
    }

    if (flagRefresh == 'True') {

        //alert(window.dialogArguments);
        if (window.dialogArguments) {
            with (window.dialogArguments) {
                //   alert(buttonName);
                $("#" + buttonName).click();
            }

        } else {

            with (window.opener) {
                //   alert(buttonName);
                $("#" + buttonName).click();
            }
        }

    }

    window.close();
}





function RelaodParent_none_alert(refresh) {
    if (refresh == 'True') {

        with (parent) {

            parent.theForm.MainContent_btnRefresh.click();
            closeLB(); return false;
        }

    }
    else {

        return false;

    }

}


function RelaodParent(message, refresh) {
    if (refresh == 'True') {

        with (parent) {


            alertinfocloseLB(message);
            // alert(message);
            parent.theForm.MainContent_btnRefresh.click();
            //parent.location.reload();
            // closeLB();



            return false;
        }

    } else {
        alertinfo(message);

    }

}
function RelaodParentPopup(message, refresh) {
    if (refresh == 'True') {

        with (parent) {
            self.btnRefresh.click()
            closeLB(); return false;
        }

    } else {
        alertinfo(message);

    }

}



//=== Session count down ===//
function CountDown(startAt, alertAt) {
    var timing = startAt; //10;
    var countdown = setInterval(function () {
        timing -= 1;
        if (timing === alertAt) {
            clearInterval(countdown);
            openLB('../home/session_alert.aspx', 500, 300, 'no', false);

        }
    }, 1000);

}


//*=========== Button Tools ====*/
$(function () {
    $('.dropdown-toggle').click(function () {
        if ($(this).parent().attr('class') == 'btn-group open') {
            $(this).parent().removeClass('open');
        }
        else {
            $(this).parent().addClass('open');
        }
    });
});



//*============== Dropdown list Multiple Select =========*/
function SetMultipleSelect(cssRefName, hddValueKeep) {
    $("." + cssRefName + "").dropdownchecklist({
        icon: {
            placement: 'right', toOpen: 'ui-icon-arrowthick-1-s'
            , toClose: 'ui-icon-arrowthick-1-n'
        }
        , maxDropHeight: 150, width: 286, firstItemChecksAll: true,
        forceMultiple: true, onComplete: function (selector) {
            var values = "";
            for (i = 0; i < selector.options.length; i++) {
                if (selector.options[i].selected && (selector.options[i].value != "")) {
                    if (values != "") values += ";";
                    values += selector.options[i].value;
                }
            }

            $(hddValueKeep).val(values);
            // alert(values);
        }
    });


}



/*======= Progress Bar ==========*/
function ShowProgress() {
    $('#modalProgress')[0].style.display = "block";
}

function HideProgress() {
    $('#modalProgress')[0].style.display = "none";
}


function getRadioValue(radioName) {
    if ($('input[name=' + radioName + ']:radio:checked').length > 0) {
        return $('input[name=' + radioName + ']:radio:checked').val();
    }
    else {
        return 0;
    }
}




function maxLength_textArea(el) {
    try {
        if (!('maxLength' in el)) {
            var max = el.attributes.maxLength.value;
            el.onkeypress = function () {
                if (this.value.length >= max) return false;
            };
        }
    } catch (ex) { }
}

function disabledAll_Input() {
    $(':input').prop('readonly', true);
    //$(':input').css({
    //    "cursor": "wait",
    //    "pointer-events": "none"
    //});
    $(':input,a,label').css({
        "cursor": "wait",
        "pointer-events": "none"
    });

    $("#MainContent_btnPrint").removeAttr('style')
    $("#MainContent_btnWorkOrder").removeAttr('style')
    $("#MainContent_Footer_Sign_ucFile_btnUploadFile").removeAttr('style')
    $("div#MainContent_Footer_Sign_ucFile_ZoneFileList a").removeAttr('style')
}