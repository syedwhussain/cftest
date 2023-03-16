function fnGetSelectedItem(lstSource, txtTarget) {

    var varSource = document.getElementById(lstSource);
    var varTarget = document.getElementById(txtTarget);
    if (varSource != null) {
        if (varSource.length < 1) {
            alert('There are no items in the source ListBox');
            return false;
        }
        if (varSource.options.selectedIndex == -1) // when no Item is selected the index will be -1
        {
            alert('Please select an Item to move');
            return false;
        }
        if (varSource.options.selectedIndex >= 0) {
            varTarget.value = varSource.options[varSource.options.selectedIndex].value;
        }
    }
}
function CloseWindow() {
    window.returnValue = true;
    window.close();
}  
function CloseWindowWithoutNavigation() {
    window.returnValue = false;
    window.close();
} 
