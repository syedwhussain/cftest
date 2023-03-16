

var path = self.location.pathname;
path = path.substr(0, path.indexOf('/', 1));
function LoadPopup(ctl, hdnStatus, FQName, MakeCbLstVisible, MultiSelect, FilterValues) {
    var mySettings = 'dialogWidth:600px;dialogHeight:500px;center:Yes;dialogTop=' + ((screen.availHeight - 200) / 2) + ';dialogLeft=' + ((screen.availWidth - 600) / 2) + ';';
    var temp = ctl.toString();
    temp = temp.replace(/[$]/g, "_");
    var ctrl = document.getElementById(temp);
    var Filter;
    if (ctrl != null)
        Filter = ctrl.value;
    if (ctrl.length > 0) {
        for (var i = 0; i < ctrl.length; i++) {
            var displayText = ctrl.options[i].text.split(" ");
            Filter += displayText[0] + ',';
        }
        Filter = Filter.substring(0, Filter.length - 1);
    }

    var retval = "";
    //    var path = self.location.pathname;
    //    path = path.substr(0, path.indexOf("/", 1));
    if (path.substr(0, 1) != "/") path = "/" + path;

    var navigatoreName = navigator.appName;
    var url = path + "/UserControls/ModalContainer.aspx?Lookup=" + FQName + "&CheckBoxVisible=" + MakeCbLstVisible + "&MultiSelect=" + MultiSelect + "&Filter=" + Filter + "&FilterValues=" + FilterValues;
    //var url = path + "/UserControls/ModalContainer.aspx?Lookup=" + FQName + "&CheckBoxVisible=" + MakeCbLstVisible + "&MultiSelect=" + MultiSelect + "&Filter=" + Filter + "&FilterValues=" + FilterValues + "&Control=" + ctrl.id;
    retval = window.showModalDialog(url, "", mySettings);
    if (retval == null)
        retval = 'Cancel';

    if (retval != null) {
        //var ctl = FQName.toString().substr(FQName.toString().indexOf(".") + 1);
        if (hdnStatus != "") {//defined for Lookups inside grid
            var rowId = hdnStatus.toString().split("^^"); // Defined for WeightBreakTariff
            if (rowId.length > 1) {
                document.getElementById(rowId[0]).value = rowId[1];
                // document.getElementById(rowId[2]).value = temp;
            }
            else {
                var hdnValue = document.getElementById(hdnStatus).value;
                document.getElementById(hdnStatus).value = (hdnValue == "I" ? "I" : "E");
            }
        }
        __doPostBack(ctl, retval);
    }
}

// This function shows how to use the 
// invoke method passing parameters and using the POST verb.
// The dictionary field names must match the 
// related Web service method parameter names.
function PostActivity(activityArea, activityAction, UserName, ParticipantID, ipAddress) {
    try {
        UserActivityLogger.LogActivity(activityArea, activityAction, UserName, ParticipantID, ipAddress, OnSucceeded, OnFailed);
    } catch (err) {
    }
}

// This is the callback function invoked 
// if the Web service succeeded.
function OnSucceeded(result, eventArgs) {


}


// This is the callback function invoked 
// if the Web service failed.
function OnFailed(error) {
    alert(error._message);

}

//function isDate(dateStr) 
//{
//    alert(dateStr);
//    var datePat = /^(([0-9])|([0-2][0-9])|([3][0-1]))(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)d{4}$/;
//    var matchArray = dateStr.match(datePat); // is the format ok?

//    if (matchArray == null) {    
//        return false;
//    }

////    month = matchArray[1]; // parse date into variables
////    day = matchArray[3];
////    year = matchArray[5];

////    if (month < 1 || month > 12) { // check month range
////        alert("Month must be between 1 and 12.");
////        return false;
////    }

////    if (day < 1 || day > 31) {
////        alert("Day must be between 1 and 31.");
////        return false;
////    }

////    if ((month==4 || month==6 || month==9 || month==11) && day==31) {
////        alert("Month "+month+" doesn`t have 31 days!")
////        return false;
////    }

////    if (month == 2) { // check for february 29th
////        var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
////        if (day > 29 || (day==29 && !isleap)) {
////            alert("February " + year + " doesn`t have " + day + " days!");
////            return false;
////        }
////    }
//    return true; // date is valid
//}

//BSN, IBS, 03-09-09, Bzla#810
function lstOnKeyPress(e, btnApply) {
    var key = e.which;
    if (key == 13) {
        var apply = document.getElementById(btnApply);
        if (apply != null)
            apply.onClick();
    }
}
//BSN, IBS, 03-09-09, Bzla#810

function CopyOnBlur(targetCtl, srcCtl) {
    var tmpSrc = srcCtl.toString();
    tmpSrc = tmpSrc.replace(/[$]/g, "_");
    var ctrl = document.getElementById(tmpSrc);

    document.getElementById(targetCtl).value = ctrl.value;
    setTimeout("CopyOnChange('" + targetCtl + "', '" + srcCtl + "');", 1);
    //alert(document.getElementById(targetCtl).value);
    //__doPostBack(srcCtl, '');
}

function CopyOnChange(targetCtl, srcCtl) {
    var tmpSrc = srcCtl.toString();
    tmpSrc = tmpSrc.replace(/[$]/g, "_");
    var ctrl = document.getElementById(tmpSrc);

    document.getElementById(targetCtl).value = ctrl.value;
    ctrl.value = document.getElementById(targetCtl).value;

    //var valLkp = document.getElementById(srcCtl.replace("txt", "valLkp"));
    //alert(valLkp.disabled);
    __doPostBack(srcCtl, ctrl.value);    //alert(document.getElementById(targetCtl).value);
}

function makeLookupEditableOnLoad(gridID, hdnControls) {
    var nIdx, oElem, hdnIdx;
    var hdnLkpCtl, lkpCtl;
    var grid = document.getElementById(gridID);

    var hdnCtrls = hdnControls.split(",");

    if (grid.rows.length > 0) {
        //loop starts from 1. rows[0] points to the header.
        for (i = 1; i < grid.rows.length; i++) {
            row = grid.rows[i];
            var x = row.getElementsByTagName("input");
            for (nIdx = 0; nIdx < x.length; nIdx++) {
                oElem = x[nIdx];
                if (oElem.type == 'hidden') {
                    for (hdnIdx = 0; hdnIdx < hdnCtrls.length; hdnIdx++) {
                        //alert(hdnCtrls[hdnIdx]);
                        if (oElem.id.indexOf(hdnCtrls[hdnIdx]) > 0) {
                            hdnLkpCtl = oElem;
                            lkpCtl = document.getElementById(hdnLkpCtl.id.replace("hdn", "txt"));
                            hdnLkpCtl.value = lkpCtl.value;
                            //alert(hdnLkpCtl.value);
                            lkpCtl.readOnly = false;
                            //lkpCtl.removeAttribute("readonly");
                        }
                    }
                }
            }
        }
    }
}

function OLoad(ctl) {
    var lkpCtl;
    var hdnCtrl;
    var ctrl = document.getElementById(ctl);
    if (ctrl != null) {
        //alert(ctrl.value);
        if (ctrl.value.substring(0, 1) == ",") {
            var nIdx;
            ctrl = ctrl.value.substring(1, ctrl.value.length);
            var ctrls = ctrl.split(",");
            for (nIdx = 0; nIdx < ctrls.length; nIdx++) {
                lkpCtl = document.getElementById(ctrls[nIdx]);
                if (lkpCtl != null) {
                    hdnCtrl = document.getElementById(ctrls[nIdx].replace("txt", "hdn"));
                    hdnCtrl.value = lkpCtl.value;
                    //alert(hdnCtrl.value);
                    lkpCtl.readOnly = false;
                    //lkpCtl.removeAttribute("readonly");
                }
            }
        }
        else {
            lkpCtl = document.getElementById(ctrl.value);
            if (lkpCtl != null) {
                hdnCtrl = document.getElementById(ctrl.value.replace("txt", "hdn"));
                hdnCtrl.value = lkpCtl.value;
                //alert(hdnCtrl.value);
                lkpCtl.readOnly = false;
                //lkpCtl.removeAttribute("readonly");
            }
        }
    }
}

//GP, IBS, 200509, Bug ID#144 - Edit Selected 
function doInit() {
    var MyArgs = window.dialogArguments;
    if (MyArgs != null && MyArgs.length > 0) {
        document.getElementById("hdnSelectedIDs").value = MyArgs[0];
        //alert(MyArgs[0]);
    }
}
//GP, IBS, 200509, Bug ID#144 - Edit Selected 

function LoadTariffs(tariffName, tariffType, currencyCode, origins, effectiveDate, expiryDate, expirySelect, weightUnit,checkPayment, carrier,hdnSelectedRows, page) {
    tariffName = document.getElementById(tariffName).value;
    tariffType = document.getElementById(tariffType);
    expirySelect = document.getElementById(expirySelect); //GP, IBS, Bug ID#398, 12-08-09
    currencyCode = document.getElementById(currencyCode).value;
    origins = document.getElementById(origins).value; //GP, IBS, Bug ID#151, 18-05-09
    effectiveDate = document.getElementById(effectiveDate).value;
    weightUnit = document.getElementById(weightUnit).innerText;
    carrier = document.getElementById(carrier).value;
    var prePaid = "N";
    var collect = "N";
    var elementRef = document.getElementById(checkPayment);
    var checkBoxArray = elementRef.getElementsByTagName('input');
    for (var i = 0; i < checkBoxArray.length; i++) {
        var checkBoxRef = checkBoxArray[i];

        if (checkBoxRef.checked == true) {
               var labelArray = checkBoxRef.parentNode.getElementsByTagName('label');

            if (labelArray.length > 0) {
               
                    if (labelArray[0].innerHTML == "PrePaid") {
                        prePaid = "Y";
                    } else if (labelArray[0].innerHTML == "Collect")
                    {
                        collect = "Y";
                    }
                
            }
        }
    }

    //alert(expirySelect.checked);
    if (expirySelect.checked == true) //GP, IBS, Bug ID#398, 12-08-09
        expiryDate = document.getElementById(expiryDate).value; //GP, IBS, Bug ID#151, 18-05-09
    else //GP, IBS, Bug ID#398, 12-08-09
        expiryDate = "UFN"; //GP, IBS, Bug ID#398, 12-08-09
    //origins = origins.replace("/", ",").replace(";", ",").replace(":", ",").replace(" ", ","); //GP, IBS, 080709, Bug ID# 324
    var tariffTypeName = tariffType.options[tariffType.selectedIndex].text;
    //GP, IBS, 200509, Bug ID#144 - Edit Selected
    var MyArgs;
    if (page.toString().indexOf("?tAction=Edit") > 0) {
        page += "&tHidden=" + hdnSelectedRows;
        MyArgs = new Array(document.getElementById(hdnSelectedRows).value.substring(1));
        //alert(MyArgs[0]);
    }
    var querystring = '&tName=' + escape(tariffName) + '&tType=' + escape(tariffTypeName) + '&currencyCode=' + escape(currencyCode) + '&origins=' + escape(origins) + '&EffectiveDate=' + escape(effectiveDate) + '&ExpiryDate=' + escape(expiryDate) + '&WeightUnit=' + escape(weightUnit) + '&PrePaid=' + escape(prePaid) + '&Collect=' + escape(collect) + '&Carrier=' + escape(carrier);
    //GP, IBS, 200509, Bug ID#144 - Edit Selected 
    //alert(path + page + querystring);
//    retval = window.showModalDialog(path + page + querystring, MyArgs, "dialogwidth: " + screen.availWidth + "; dialogheight: 500px; resizable: yes; scroll: yes;dialogTop=" + ((screen.availHeight - 400) / 2) + ";dialogLeft=40px;center: yes");
    var properties = { caption: 'Create/Edit Tariffline', center_win: true, height: 500, width: (screen.availWidth - 100), show_loading: false, fullscreen: false, callback_fn:CallParent };
    var win = new GB_Window(properties);
    win.show(path + page + querystring);
//    if (retval != "" && retval != null) {
//        document.getElementById(hdnSelectedRows).value = "";
//        __doPostBack('txtSetName', '');
//    }
}
function CallParent()
{
  
    __doPostBack('txtSetName', '');
}


function LoadWindow(page) {

    //alert(path + page);
    retval = window.showModalDialog(path + page, window, "dialogwidth: " + screen.availWidth - 80 + "; dialogheight: 400px; resizable: yes; scroll: yes;dialogTop=" + ((screen.availHeight - 400) / 2) + ";dialogLeft=40px;center: yes");

    if (retval != "" && retval != null) {
        __doPostBack('', '');
    }
}

function LoadPopup(Page, Title) {

    var properties = { caption: Title, center_win: true, height: 500, width: (screen.availWidth - 500), show_loading: true, fullscreen: false, callback_fn: CallParent };
    var win = new GB_Window(properties);
    win.show(path + Page);
    
}

function GetParentFormData() {

    //alert(window.opener.document.getElementById('txtSetName'));
    document.getElementById('lblSetNameValue').value = window.opener.document.getElementById('txtSetName').value;
}

function HighlightSelectedRow(colorcheckboxselected, RowState) {
    if (colorcheckboxselected.checked)
        colorcheckboxselected.parentNode.parentNode.className = 'styleSelectRow';
    else {
        if (RowState == 'Normal')
            colorcheckboxselected.parentNode.parentNode.className = 'styleRow';
        else
            colorcheckboxselected.parentNode.parentNode.className = 'styleAlternateRow';
    }
}
function HighlightSelectedRowAndCountDisplay(colorcheckboxselected, RowState, gridName, labelName, colname) {
    if (colorcheckboxselected.checked)
        colorcheckboxselected.parentNode.parentNode.className = 'styleSelectRow';
    else {
        if (RowState == 'Normal')
            colorcheckboxselected.parentNode.parentNode.className = 'styleRow';
        else
            colorcheckboxselected.parentNode.parentNode.className = 'styleAlternateRow';
    }
    FindCountofCheck(gridName, colname, labelName);
}

function FindAnychecked(gridName, colno) {
    //get reference of GridView control
    var grid = document.getElementById(gridName);
    //variable to contain the cell of the grid
    var cell;
    var cnt = 0;

    if (grid.rows.length > 0) {
        //loop starts from 1. rows[0] points to the header.
        for (i = 1; i < grid.rows.length; i++) {

            //get the reference of first column
            cell = grid.rows[i].cells[colno];

            //loop according to the number of childNodes in the cell
            for (j = 0; j < cell.childNodes.length; j++) {

                //if childNode type is CheckBox
                if (cell.childNodes[j].type == "checkbox" && cell.childNodes[j].checked) {
                    //assign the status of the Select All checkbox to the cell checkbox within the grid
                    cnt = cnt + 1;
                }   //if

            }  //for
        }  //for
    }    //if  

    if (cnt == 0) {
        alert("No record(s) checked for deletion.");
        return false;
    }
    else
        return true;
}

function FindCountofCheck(gridName, colno, labelName) {
    //get reference of GridView control
    var grid = document.getElementById(gridName);
    //variable to contain the cell of the grid
    var cell;
    var cnt = 0;
    //alert(grid.rows.length);
    if (grid.rows.length > 0) {
        //loop starts from 1. rows[0] points to the header.
        for (i = 1; i < grid.rows.length; i++) {

            //get the reference of first column
            cell = grid.rows[i].cells[colno];

            //loop according to the number of childNodes in the cell
            for (j = 0; j < cell.childNodes.length; j++) {

                //if childNode type is CheckBox
                if (cell.childNodes[j].type == "checkbox" && cell.childNodes[j].checked) {
                    //assign the status of the Select All checkbox to the cell checkbox within the grid
                    cnt = cnt + 1;
                }   //if

            }  //for
        }  //for
    }    //if  
    var maxs = grid.rows.length - 1;
    var res = cnt + " of  " + maxs + " selected";
    document.getElementById(labelName).innerHTML = res;

}
function TextboxOnChange(clientID) {
    if (document.getElementById(clientID).value != 'I') {
        document.getElementById(clientID).value = 'E';
        document.getElementById(clientID).parentNode.parentNode.className = 'styleEditRow';
        needToConfirm = 1;
    }
}

function ShowImage(source, eventArgs) {
    document.getElementById(source.get_element().id).style.backgroundImage = 'url(../images/loader.gif)';
    document.getElementById(source.get_element().id).style.backgroundRepeat = 'no-repeat';
    document.getElementById(source.get_element().id).style.backgroundPosition = 'right';
}
function HideImage(source, eventArgs) {
    document.getElementById(source.get_element().id).style.backgroundImage = 'none';
}


function RedirectOnClick(url) {
    window.location = url;
    return false;
}

function makeUpperCase(controlName) {
    document.getElementById(controlName).value = document.getElementById(controlName).value.toUpperCase();
}

function SelectedIndexChanged(clientID) {
    if (document.getElementById(clientID).value != 'I') {
        document.getElementById(clientID).value = 'E';
    }
}

function SelectAllCheckboxesorg(chk) {

    //alert();
    $(document).ready(function() {
        $('#<%=gvWeightBreakTariff.ClientID %>').find("input:checkbox").each(function() {
            if (this != chk) {
                this.checked = chk.checked;
            }
        });
    });

}
function SelectAllCheckboxes(chk) {
    //alert(chk.checked);
    var ctl = $('#<%=gvWeightBreakTariff.ClientID %>');
    //alert(ctl);
    $('#<%=gvWeightBreakTariff.ClientID %> >tbody >tr >td >input:checkbox').attr('checked', chk.checked);
}
//function pageLoad() {
//    //Bind onclick event to each checkbox

//    //01 Bind onclick event to header checkbox 'Select All'.
//    var ctl = $('#<%=gvWeightBreakTariff.ClientID %> >tbody >tr >th:first >input:checkbox %>');
//    alert(ctl);
//    $('#<%=gvWeightBreakTariff.ClientID %> >tbody >tr >th:first >input:checkbox').click(SelectAllCheckboxes);


////    //02 Bind onclick event to items checkbox 'item select'.

////    $('#<%=gvWeightBreakTariff.ClientID %> >tbody >tr >td >input:checkbox').click(checkSelectAll);

//}

function BP_CheckBoxCheck(ctl) {
    var ctlGrid = ctl.toString().split("^^"); // Defined for WeightBreakTariff, WBT AddOn, etc in TariffSet screen
    var isChecked, grid, hdnSelect, hdnID, hdnGUID;
    var selectedRowID;
    if (ctlGrid.length > 1) {
        ctl = document.getElementById(ctlGrid[0]);
        hdnSelect = document.getElementById(ctlGrid[1]);
        grid = document.getElementById(ctlGrid[2]);
    }
    else {
        grid = document.getElementById(ctl.parentNode.parentNode.parentNode.parentNode.id);
    }

  
    isChecked = ctl.checked;
    var nIdx, oElem, hdnHighlightValue;
    hdnHighlightValue = "0";
    var x = grid.getElementsByTagName("input");
    for (nIdx = 0; nIdx < x.length; nIdx++) {
        oElem = x[nIdx];

        if (oElem.type == 'checkbox' && oElem.id.indexOf('Select') != -1) {
            if (oElem.id != ctl.id)
                oElem.checked = ctl.checked;
        }
        if (oElem.type == 'hidden') {
            if (oElem.id.indexOf("StatusChk") > 0) {
                if (isChecked) {
                    oElem.value = "C";
                }
                else
                    oElem.value = "U";
            }
            if (oElem.id.indexOf("hdnCheckHighlight") > 0) {
                hdnHighlightValue = oElem.value;
            }
        }
    }
    if (isChecked) {
        if (grid.rows.length > 0) {

            var tableHeader = grid.rows[0].getElementsByTagName("TH");
            if (tableHeader[0] != null && tableHeader[0].id.search("th_AfraGrid") > 0)
            tableHeader[0].style.display = '';
            //loop starts from 1. rows[0] points to the header.
            for (i = 1; i < grid.rows.length; i++) {

                grid.rows[i].className = "styleSelectRow";
//                if (ctlGrid.length > 1) {
//                    hdnID = document.getElementById(grid.rows[i].id + "_hdnID");
//                    hdnGUID = '';
//                    hdnGUID = document.getElementById(grid.rows[i].id + "_hdnGuid");
//                    selectedRowID = hdnID.value + "_" + hdnGUID.value;
//                    if (hdnSelect.value.indexOf(selectedRowID) <= 0)
//                        hdnSelect.value += "," + selectedRowID;
//                }
            }
        }
    }
    else {

        var tableHeader = grid.rows[0].getElementsByTagName("TH");
        if (tableHeader[0]!=null && tableHeader[0].id.search("th_AfraGrid") > 0)
        tableHeader[0].style.display = 'none';
        for (i = 1; i < grid.rows.length; i++) {
            if (i % 2 != 0) {
                if (hdnHighlightValue == "0" || hdnHighlightValue == "") {
                    grid.rows[i].className = "styleRow";
                }
                else {
                    grid.rows[i].className = "styleHighlightRow";
                }
            }
            else {
                if (hdnHighlightValue == "0" || hdnHighlightValue == "") {
                    grid.rows[i].className = "styleAlternateRow";
                }
                else {
                    grid.rows[i].className = "styleHighlightRow";
                }
            }
//            if (ctlGrid.length > 1) {
//                hdnID = document.getElementById(grid.rows[i].id + "_hdnID");
//                hdnGUID = document.getElementById(grid.rows[i].id + "_hdnGuid");
//                selectedRowID = hdnID.value + "_" + hdnGUID.value;
//                if (hdnSelect.value.indexOf(selectedRowID) <= 0)
//                    hdnSelect.value += "," + selectedRowID;
//            }
        }
    }
}

function HighlightSelected(colorcheckboxselected, checkstatus, checkrowedit, RowState, RowNum) {
    var rowId = colorcheckboxselected.toString().split("^^"); // Defined for WeightBreakTariff, WBT AddOn, etc in TariffSet screen
    var hdn = document.getElementById(rowId[1]);
    var chkSelected, chkStatus;

    if (rowId.length > 1) {
        chkSelected = document.getElementById(rowId[0]);
    }
    else {
        chkSelected = document.getElementById(colorcheckboxselected);
    }

    chkStatus = document.getElementById(checkstatus);
    var objRow = document.getElementById(RowNum);
if(objRow == null) return;
    if (chkSelected.checked) {
        chkStatus.value = 'C';
        objRow.className = 'styleSelectRow';
        if (rowId.length > 1) {
            if (hdn.value.indexOf(rowId[2]) <= 0)
                hdn.value += "," + rowId[2];
        }
    }
    else {
        chkStatus.value = 'U';
        chkRowEdit = document.getElementById(checkrowedit);
        if (chkRowEdit.value == "E") {
            objRow.className = 'styleEditRow';
        }
        else {
            if (RowState == 'Normal') {
                objRow.className = 'styleRow';
            }
            else
                objRow.className = 'styleAlternateRow';
        }
        if (rowId.length > 1) {
            if (hdn.value.indexOf(rowId[2]) > 0)
                hdn.value = hdn.value.replace(',' + rowId[2], "");
        }
    }
}

function BP_CheckBoxUnCheck(spanChk, gridrow, hdnStatus, hdnHighlight, chkSelectAll, RowState) {

    var rowId = spanChk.toString().split("^^"); // Defined for WeightBreakTariff, WBT AddOn, etc in TariffSet screen
    var hdnSelect = document.getElementById(rowId[1]);
    var objCheck;
    if (rowId.length > 1) {
        objCheck = document.getElementById(rowId[0]);
    }
    else {
        objCheck = document.getElementById(spanChk);
    }

    var objCheckAll = document.getElementById(chkSelectAll);
    var objhdnStatus = document.getElementById(hdnStatus);
    var objhdnHighlight = document.getElementById(hdnHighlight);
    var IsSelected = objCheck.checked;
    var grid = document.getElementById(gridrow);
    if (IsSelected) {
        objhdnStatus.value = "C";
        grid.className = "styleSelectRow";
        if (rowId.length > 1) {
            if (hdnSelect.value.indexOf(rowId[2]) <= 0)
                hdnSelect.value += "," + rowId[2];
        }
        //alert(hdnSelect.value);
    }
    else {
        if (objhdnHighlight.value == "0" || objhdnHighlight.value == "") {
            if (RowState == "Normal") {
                grid.className = "styleRow";
            }
            else {
                grid.className = "styleAlternateRow";
            }
        }
        else {
            grid.className = "styleHighlightRow";
        }
        objhdnStatus.value = "U";
        objCheckAll.checked = false;
        if (rowId.length > 1) {
            if (hdnSelect.value.indexOf(rowId[2]) > 0)
                hdnSelect.value = hdnSelect.value.replace(',' + rowId[2], ""); //GP, IBS, 080609, Bug ID#218
            //alert(hdnSelect.value);
        }
    }
}

//TS IBS 05/18/09 Checking all check boxes in grid
function SelectAllCheckboxesInGrid(spanChk, objGrid) {

    objCheck = document.getElementById(spanChk);
    var IsSelected = objCheck.checked;
    //get reference of GridView control
    var grid = document.getElementById(objGrid);
    //variable to contain the cell of the grid
    var cell;

    if (grid.rows.length > 0) {
        var tableHeader = grid.rows[0].getElementsByTagName("TH");

        if (tableHeader[0] != null && tableHeader[0].id.search("th_AfraGrid") > 0) {
            if (IsSelected)
                tableHeader[0].style.display = '';
            else
                tableHeader[0].style.display = 'none';
        }
        //loop starts from 1. rows[0] points to the header.
        for (i = 1; i < grid.rows.length; i++) {

            //get the reference of first column
            cell = grid.rows[i].cells[0];

            //loop according to the number of childNodes in the cell
            for (j = 0; j < cell.childNodes.length; j++) {

                //if childNode type is CheckBox
                if (cell.childNodes[j].type == "checkbox") {
                    //assign the status of the Select All checkbox to the cell checkbox within the grid
                    cell.childNodes[j].checked = IsSelected;
                }   //if
                else if (cell.childNodes[j].type == "hidden") {
                    //setting the css style
                    if (cell.childNodes[j].id.indexOf("hdnCheckStatus") > 0) {
                        if (IsSelected) {
                            cell.childNodes[j].value = "C";
                        }
                        else {
                            cell.childNodes[j].value = "U";
                        }
                    }  //if
                    else if (cell.childNodes[j].id.indexOf("hdnStatus") > 0) {
                        if (IsSelected) {
                            grid.rows[i].className = "styleSelectRow";
                        }
                        else {
                            if (cell.childNodes[j].value == 'E') {
                                grid.rows[i].className = "styleEditRow";
                            }
                            else {
                                if (i % 2 != 0)
                                    grid.rows[i].className = "styleRow";
                                else
                                    grid.rows[i].className = "styleAlternateRow";
                            }
                        }
                    }    //else 
                }   //else
            }  //for
        }  //for
    }    //if    
}
//For Grid with no status controls simple grids and grid checkbox in another col not in 0th
function SelectAllCheckboxesInGridByCol(spanChk, objGrid, CheckBoxCol, lblname) {


    objCheck = document.getElementById(spanChk);
    var IsSelected = objCheck.checked;
    //get reference of GridView control
    var grid = document.getElementById(objGrid);
    //variable to contain the cell of the grid
    var cell;

    if (grid.rows.length > 0) {
        //loop starts from 1. rows[0] points to the header.
        for (i = 1; i < grid.rows.length; i++) {

            //get the reference of first column
            cell = grid.rows[i].cells[CheckBoxCol];

            //loop according to the number of childNodes in the cell
            for (j = 0; j < cell.childNodes.length; j++) {

                //if childNode type is CheckBox
                if (cell.childNodes[j].type == "checkbox") {
                    //assign the status of the Select All checkbox to the cell checkbox within the grid
                    cell.childNodes[j].checked = IsSelected;
                    if (!IsSelected) {
                        if (i % 2 != 0)
                            grid.rows[i].className = "styleRow";
                        else
                            grid.rows[i].className = "styleAlternateRow";
                    }
                    else
                        grid.rows[i].className = "styleSelectRow";
                }   //if

            }  //for
        }  //for
    }    //if 
    FindCountofCheck(objGrid, CheckBoxCol, lblname);
}


//TS IBS 05/18/09 unselect CheckAll Checkbox in grid
function CheckSelectAll(CheckAllClientId) {
    if (CheckAllClientId.checked);
    CheckAllClientId.checked = false;
}


//BSN IBS 05/18/09 Checking all check boxes in grid
function SelectAllCheckboxesInTariffGrids(spanChk) {
    var IsSelected = spanChk.checked;
    //get reference of GridView control
    var grid = document.getElementById(spanChk.parentNode.parentNode.parentNode.parentNode.id);
    //variable to contain the cell of the grid
    var cell;

    if (grid.rows.length > 0) {
        //loop starts from 1. rows[0] points to the header.
        for (i = 1; i < grid.rows.length; i++) {
            //get the reference of first column
            if (i == 1)
                cell = grid.rows[i].cells[0];
            else
                cell = grid.rows[i].cells[0];
            //loop according to the number of childNodes in the cell
            for (j = 0; j < cell.childNodes.length; j++) {
                //if childNode type is CheckBox
                if (cell.childNodes[j].type == "checkbox") {
                    //assign the status of the Select All checkbox to the cell checkbox within the grid
                    //alert(cell.childNodes[j].id);
                    cell.childNodes[j].checked = IsSelected;
                }
                else if (cell.childNodes[j].type == "hidden") {
                    if (cell.childNodes[j].id.indexOf("hdnCheckStatus") > 0) {
                        if (IsSelected) {
                            grid.rows[i].className = "styleSelectRow";
                            cell.childNodes[j].value = "C";
                        }
                        else {
                            if (i % 2 != 0)
                                grid.rows[i].className = "styleRow";
                            else
                                grid.rows[i].className = "styleAlternateRow";

                            cell.childNodes[j].value = "U";
                        }
                    }
                }

            }
        }
    }
}

//VKR IBS 05/19/2009 Clickable column header for sorting
function RequestData(linkId, cellElement, evt) {
    var evtSource;
    evt = (evt) ? evt : window.event;
    evtSource = (evt.srcElement) ? evt.srcElement : evt.target;

    //When a hyperlink is clicked, Safari returns the text node as the source element rather
    //than the hyperlink. parentNode will give us the hyperlink element.
    //ref: http://developer.apple.com/internet/webcontent/eventmodels.html
    if (evt.target) {
        if (evt.target.nodeType == 3) {
            evtSource = evtSource.parentNode;
        }
    }

    //If event was raised from an element other than the LinkButton
    if ((evtSource.getAttribute("id") != linkId) && (evt.type == "click")) {

        //Get a collection of "a" tags inside the cell       
        var linkCollection = cellElement.getElementsByTagName("a");
        for (var i = 0; i < linkCollection.length; i++) {

            //If the link button has an onclick attribute, call the onclick.
            //The onclick attribute is present when the GridView is using callback
            //example: onclick="java script:__gvGridSort1_GridView1.callback(...); return false;"
            var onClickAttribute = linkCollection[i].getAttribute("onclick");
            if (onClickAttribute != null) {
                linkCollection[i].onclick();
                break;
            }

            //If the link button has a href attribute, set the location of the page
            //to the href value.
            //The href attribute is used when the GridView is not using callbacks
            //example: href="java script:__doPostBack('GridSort1$GridView1','Sort$UnitsOnOrder')"
            var hrefAttribute = linkCollection[i].getAttribute("href");
            this.location.href = hrefAttribute;
            break;
        }
    }
}

function handleKeyPress(evt) {
    var nIdx, oElem;
    var nbr = (window.event) ? event.keyCode : evt.which;
    if (nbr == 13) {
        var x = document.getElementsByTagName("input");
        for (nIdx = 0; nIdx < x.length; nIdx++) {
            oElem = x[nIdx];
            if (oElem.type == 'submit')
                if (oElem.id.indexOf('btnSearch') >= 0) {
                //alert(oElem.id);
                oElem.focus();
            }
        }
    }
}

function handleKeyPressForExtenderButtons(evt) {
    var nIdx, oElem;
    var nbr = (window.event) ? event.keyCode : evt.which;
    if (nbr == 13) {
        var x = document.getElementsByTagName("a");
        for (nIdx = 0; nIdx < x.length; nIdx++) {
            oElem = x[nIdx];
            if (oElem.id.indexOf('btnSearch') >= 0) {
                //alert(oElem.id);
                oElem.focus();
            }
        }
    }
}

//HR IBS 05/30/09 Checking Whether at least one row is checked
function CheckForCheckBoxCheckedForDeletion(objGrid) {

    //get reference of GridView control

    var grid = document.getElementById(objGrid);
    //variable to contain the cell of the grid
    var cell;

    var atLeastOneChecked = false;
    if (grid == null) {
        alert("No record(s) checked for deletion.");
        return false;
    }

    if (grid.rows.length > 0) {
        //loop starts from 1. rows[0] points to the header.
        for (i = 1; i < grid.rows.length; i++) {

            //get the reference of first column
            cell = grid.rows[i].cells[0];


            //loop according to the number of childNodes in the cell
            for (j = 0; j < cell.childNodes.length; j++) {

                //if childNode type is CheckBox
                if (cell.childNodes[j].type == "checkbox") {
                    //assign the status of the Select All checkbox to the cell checkbox within the grid
                    if (cell.childNodes[j].checked) {
                        atLeastOneChecked = true;
                        break;

                    }
                }   //if

            }
        }

    }
    if (atLeastOneChecked) {
        return confirm('Are you sure you want to delete this record?');
    }
    else {
        alert("No record(s) checked for deletion.");
        return false;
    }
}


//Sanil IBS 01/03/2010 Checking Whether at least one row is checked and restrict deleting own record
function CheckForCheckBoxCheckedForDeletionParticipant(objGrid) {

    //get reference of GridView control

    var grid = document.getElementById(objGrid);
    //variable to contain the cell of the grid
    var cell;
    var atLeastOneChecked = false;
    var checked = false;
    if (grid == null) {
        alert("No record(s) checked for deletion.");
        return false;
    }

    // if (grid.rows.length > 0) {
    //loop starts from 1. rows[0] points to the header.

    if (grid.rows.length > 0) {
        var hdnHighlightValue;


        //loop starts from 1. rows[0] points to the header.
        for (i = 1; i < grid.rows.length; i++) {

            //get the reference of first column
            cell = grid.rows[i].cells[0];

            //loop according to the number of childNodes in the cell
            for (j = 0; j < cell.childNodes.length; j++) {
                hdnHighlightValue = "0";
                //if childNode type is CheckBox
                if (cell.childNodes[j].type == "checkbox") {
                    //assign the status of the Select All checkbox to the cell checkbox within the grid
                    if (cell.childNodes[j].checked) {
                        atLeastOneChecked = true;
                        checked = true;
                        //break;
                    } else { checked = false; }

                }
                if (cell.childNodes[j].type == "hidden") {
                    //setting the css style
                    if (cell.childNodes[j].id.indexOf("hdnMainAccount") > 0) {
                        hdnHighlightValue = cell.childNodes[j].value;
                        //alert(hdnHighlightValue);
                    }
                }
                if (checked && hdnHighlightValue == "M") {
                    alert('You cant delete logged in record');
                    return false;
                }
            }
        }

    }
    if (atLeastOneChecked) {
        return confirm('Are you sure you want to delete this record?');
    }
    else {
        alert("No record(s) checked for deletion.");
        return false;
    }
}



function CheckForCheckBoxChecked(objGrid) {

    //get reference of GridView control

    var grid = document.getElementById(objGrid);
    //variable to contain the cell of the grid
    var cell;

    var atLeastOneChecked = false;
    if (grid == null) {
        alert("No record(s) checked.");
        return false;
    }

    if (grid.rows.length > 0) {
        //loop starts from 1. rows[0] points to the header.
        for (i = 1; i < grid.rows.length; i++) {

            //get the reference of first column
            cell = grid.rows[i].cells[0];


            //loop according to the number of childNodes in the cell
            for (j = 0; j < cell.childNodes.length; j++) {

                //if childNode type is CheckBox
                if (cell.childNodes[j].type == "checkbox") {
                    //alert(cell.childNodes[j].id);
                    //assign the status of the Select All checkbox to the cell checkbox within the grid
                    if (cell.childNodes[j].checked) {
                        return true;

                    }
                }   //if

            }
        }

    }
    alert("No record(s) checked.");
    return false;
}

function CheckForCheckBoxCheckedForPopupControls(objGrid, popupId) {

    //get reference of GridView control

    var grid = document.getElementById(objGrid);
    //variable to contain the cell of the grid
    var cell;
    var popup = document.getElementById(popupId);
    var atLeastOneChecked = false;
    if (grid == null) {
        alert("No record(s) checked.");
        //alert(popup);
        $find(popupId).hide();
        return false;
    }

    if (grid.rows.length > 0) {
        //loop starts from 1. rows[0] points to the header.
        for (i = 1; i < grid.rows.length; i++) {

            //get the reference of first column
            cell = grid.rows[i].cells[0];


            //loop according to the number of childNodes in the cell
            for (j = 0; j < cell.childNodes.length; j++) {

                //if childNode type is CheckBox
                if (cell.childNodes[j].type == "checkbox") {
                    //assign the status of the Select All checkbox to the cell checkbox within the grid
                    if (cell.childNodes[j].checked) {
                        $find(popupId).show();
                        return true;

                    }
                }   //if

            }
        }

    }
    alert("No record(s) checked.");
    $find(popup).hide();
    return false;
}

function CheckForCheckBoxCheckedForTariffLines(ctl) {
    grid = document.getElementById(ctl);
    var x = grid.getElementsByTagName("input");
    for (nIdx = 0; nIdx < x.length; nIdx++) {
        oElem = x[nIdx];
        if ((oElem.type == 'checkbox') && oElem.id.indexOf('chkSelect') >= 0) {
            if (oElem.checked) {
                return true;
            }
        }

    }
    alert("No record(s) checked.");
    return false;
}

function CheckForCheckBoxCheckedForTariffLinesForPopup(ctl, popupId) {
    grid = document.getElementById(ctl);
    var x = grid.getElementsByTagName("input");
    for (nIdx = 0; nIdx < x.length; nIdx++) {
        oElem = x[nIdx];
        if ((oElem.type == 'checkbox') && oElem.id.indexOf('chkSelect') >= 0) {
            if (oElem.checked) {
                $find(popupId).show();
                return true;
            }
        }

    }
    alert("No record(s) checked.");
    $find(popupId).hide();
    return false;
}

function CheckForCheckBoxCheckedForTariffLinesDeletion(ctl) {
    grid = document.getElementById(ctl);
    var x = grid.getElementsByTagName("input");
    for (nIdx = 0; nIdx < x.length; nIdx++) {
        oElem = x[nIdx];
        if ((oElem.type == 'checkbox') && oElem.id.indexOf('chkSelect') >= 0) {
            if (oElem.checked) {
                return true;
            }
        }

    }
    alert("No record(s) checked for deletion.");
    return false;
}
function CheckForCheckBoxCheckedForGeneralDeletion(ctl) {
    grid = document.getElementById(ctl);
    var atLeastOneChecked = false;
    if (grid == null) {
        alert("No record(s) checked for deletion.");
        return false;
    }

    var x = grid.getElementsByTagName("input");
    for (nIdx = 0; nIdx < x.length; nIdx++) {
        oElem = x[nIdx];
        if ((oElem.type == 'checkbox') && oElem.id.indexOf('chkSelect') >= 0) {
            if (oElem.checked) {

                atLeastOneChecked = true;
                break;
            }
        }

    }
    if (atLeastOneChecked) {
        return confirm('Are you sure you want to delete this record?');
    }
    else {
        alert("No record(s) checked for deletion.");
        return false;
    }
}
//HR IBS 05/30/09 Checking Whether at least one row is checked
function CheckForCheckBoxCheckedForExpire(objGrid) {

    //get reference of GridView control

    var grid = document.getElementById(objGrid);
    //variable to contain the cell of the grid
    var cell;

    var atLeastOneChecked = false;
    if (grid == null) {
        alert("No record(s) checked for Expire.");
        return false;
    }

    if (grid.rows.length > 0) {
        //loop starts from 1. rows[0] points to the header.
        for (i = 1; i < grid.rows.length; i++) {

            //get the reference of first column
            cell = grid.rows[i].cells[0];


            //loop according to the number of childNodes in the cell
            for (j = 0; j < cell.childNodes.length; j++) {

                //if childNode type is CheckBox
                if (cell.childNodes[j].type == "checkbox") {
                    //assign the status of the Select All checkbox to the cell checkbox within the grid
                    if (cell.childNodes[j].checked) {
                        atLeastOneChecked = true;
                        break;

                    }
                }   //if

            }
        }

    }
    if (atLeastOneChecked) {
        return confirm('Are you sure you want to expire this record?');
    }
    else {
        alert("No record(s) checked for expire.");
        return false;
    }
}

function ConfirmForExpire() {

    return confirm('Expire entire tariff set. Are you sure?');

}
function ConfirmForExpireSurcharge() {

    return confirm('Are you sure you want to expire this record?');

}

function ConfirmForExpiretariffs() {

    return confirm('Confirm expire tariffs. Are you sure?');

}


function DisableIncludeColumn(CtrlChk, Ctrlddl, Ctrl1, Ctrl2) {
    if (document.getElementById(CtrlChk).checked == false) {
        document.getElementById(Ctrl1).disabled = true;
        document.getElementById(Ctrl2).disabled = true;
    }
    else {

        if (document.getElementById(Ctrlddl).options[(document.getElementById(Ctrlddl)).selectedIndex].value != "2") {
            document.getElementById(Ctrl1).disabled = false;
            document.getElementById(Ctrl2).disabled = false;
        }
        else {
            document.getElementById(Ctrl1).disabled = false;
        }
    }
    return;
}



function OnTreeViewCheckBoxCheckChanged(evt) {
    var src = window.event != window.undefined ? window.event.srcElement : evt.target;
    var isChkBoxClick = (src.tagName.toLowerCase() == "input" && src.type == "checkbox");
    if (isChkBoxClick) {
        var parentTable = GetParentByTagName("table", src);
        var nxtSibling = parentTable.nextSibling;
        if (nxtSibling && nxtSibling.nodeType == 1)//check if nxt sibling is not null & is an element node
        {
            if (nxtSibling.tagName.toLowerCase() == "div") //if node has children
            {
                //check or uncheck children at all levels
                CheckUncheckChildren(parentTable.nextSibling, src.checked);
            }
        }
        //check or uncheck parents at all levels
        CheckUncheckParents(src, src.checked);
    }
}
function CheckUncheckChildren(childContainer, check) {
    var childChkBoxes = childContainer.getElementsByTagName("input");
    var childChkBoxCount = childChkBoxes.length;
    for (var i = 0; i < childChkBoxCount; i++) {
        childChkBoxes[i].checked = check;
    }
}
function CheckUncheckParents(srcChild, check) {
    var parentDiv = GetParentByTagName("div", srcChild);
    var parentNodeTable = parentDiv.previousSibling;

    if (parentNodeTable) {
        var checkUncheckSwitch;

        if (check) //checkbox checked
        {
            var isAllSiblingsChecked = AreAllSiblingsChecked(srcChild);
            if (isAllSiblingsChecked)
                checkUncheckSwitch = true;
            else
                return; //do not need to check parent if any(one or more) child not checked
        }
        else //checkbox unchecked
        {
            checkUncheckSwitch = false;
        }

        var inpElemsInParentTable = parentNodeTable.getElementsByTagName("input");
        if (inpElemsInParentTable.length > 0) {
            var parentNodeChkBox = inpElemsInParentTable[0];
            parentNodeChkBox.checked = checkUncheckSwitch;
            //do the same recursively
            CheckUncheckParents(parentNodeChkBox, checkUncheckSwitch);
        }
    }
}
function AreAllSiblingsChecked(chkBox) {
    var parentDiv = GetParentByTagName("div", chkBox);
    var childCount = parentDiv.childNodes.length;
    for (var i = 0; i < childCount; i++) {
        if (parentDiv.childNodes[i].nodeType == 1) //check if the child node is an element node
        {
            if (parentDiv.childNodes[i].tagName.toLowerCase() == "table") {
                var prevChkBox = parentDiv.childNodes[i].getElementsByTagName("input")[0];
                //if any of sibling nodes are not checked, return false
                if (!prevChkBox.checked) {
                    return false;
                }
            }
        }
    }
    return true;
}
//utility function to get the container of an element by tagname
function GetParentByTagName(parentTagName, childElementObj) {
    var parent = childElementObj.parentNode;
    while (parent.tagName.toLowerCase() != parentTagName.toLowerCase()) {
        parent = parent.parentNode;
    }
    return parent;
}
     