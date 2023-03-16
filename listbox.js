    function fnMoveSelectedItems(lstSource, lstTarget, containerID) {
        var varSource = document.getElementById(lstSource);
        var varTarget = document.getElementById(lstTarget);
        if ((varSource != null) && (varTarget != null)) {
            if (varSource.length < 1) {
                alert('There are no items in the source ListBox');
                return false;
            }
            if (varSource.options.selectedIndex == -1) // when no Item is selected the index will be -1
            {
                alert('Please select an Item to move');
                return false;
            }
            while (varSource.options.selectedIndex >= 0) {
                var newOption = new Option(); // Create a new instance of ListItem 

                newOption.text = varSource.options[varSource.options.selectedIndex].text;
                newOption.value = varSource.options[varSource.options.selectedIndex].value;
                varTarget.options[varTarget.length] = newOption; //Append the item in Target Listbox

                varSource.remove(varSource.options.selectedIndex); //Remove the item from Source Listbox 

            }
        }
        var container = document.getElementById(containerID);
        container.value = escape("<listboxes>" + serialize(varSource) + serialize(varTarget) + "</listboxes>");
        return false;
    }

    function serialize(dropdown) {
        var value = '<' + dropdown.id + '>';
        for (var i = 0; i < dropdown.options.length; i++) {
            value += '<option><key><![CDATA[' + dropdown.options[i].text + ']]></key><value><![CDATA[' + dropdown.options[i].value + ']]></value></option>';
        }
        value += '</' + dropdown.id + '>';
        return value
    }

    function unselect(listbox) {
        document.getElementById(listbox).selectedIndex = -1;
    }

    function fnMoveAllItems(lstSource, lstTarget, containerID) {
        var varSource = document.getElementById(lstSource);
        var varTarget = document.getElementById(lstTarget);
        if ((varSource != null) && (varTarget != null)) {
            if (varSource.length < 1) {
                alert('There are no items in the source ListBox');
                return false;
            }
            while (varSource.length >= 0) {
                var newOption = new Option(); // Create a new instance of ListItem 

                newOption.text = varSource.options[0].text;
                newOption.value = varSource.options[0].value;
                varTarget.options[varTarget.length] = newOption; //Append the item in Target Listbox

                varSource.remove(0); //Remove the item from Source Listbox
            }
        }
        var container = document.getElementById(containerID);
        container.value = escape("<listboxes>" + serialize(varSource) + serialize(varTarget) + "</listboxes>");

        return false;
    }
