// 
// Samples.Progress :: 
//     Manage progress monitoring 
//

// Define the namespace of the class
Type.registerNamespace('Samples');

// Constructor
Samples.Progress = function Samples$Progress() 
{
    Samples.Progress.initializeBase(this);
    this._timerID = null;
    this._taskID = null;
    this._progressCallback = null;
    this._msInterval = null;
    this._callback = null;
}



// Start the timer to periodically check the status of the ongoing task
function Samples$Progress$startMonitor(taskID, msInterval, progressCallback, progressCompletedCallback) { 
    if (arguments.length !== 4) throw Error.parameterCount();
    
    // Update internal members
    _taskID = taskID;
    _msInterval = msInterval;
    _progressCallback = progressCallback;
    _progressCompletedCallback = progressCompletedCallback;
    
    this._startTimer();
}

// Stop the timer  
function Samples$Progress$stopMonitor() { 
    window.clearTimeout(_timerID);
    if (_progressCompletedCallback !== null)
        _progressCompletedCallback();    
}

// Get task ID
function Samples$Progress$getTaskID(taskID) { 
    return Samples.Random.getNumber(0, 10000000);
}

// Start the timer to control progress
function Samples$Progress$_startTimer() {
    this._callback = Function.createDelegate(this, this._checkProgress);
    _timerID = window.setTimeout(this._callback, _msInterval);
}

// Modify the request to add the task ID to a hidden field (for UpdatePanel pages)
function Samples$Progress$modifyRequestForTaskId(request, taskID, hiddenField) {
    var body = request.get_body();
    var token = "&" + hiddenField + "=";
    body = body.replace(token, token + taskID);
    request.set_body(body);
    
    return request;
}


// Timer function(s)
function Samples$Progress$_checkProgress() {
    PageMethods.GetCurrentStatus(_taskID, this._onFeedbackReceived, this._onFeedbackFailed, this);
}

function Samples$Progress$_onFeedbackReceived(results, context) {
    context._startTimer();
    
    if (_progressCallback !== null)
        _progressCallback(results);
}

function Samples$Progress$_onFeedbackFailed(results) {
}


// Class prototype
Samples.Progress.prototype = 
{
    getTaskID:              Samples$Progress$getTaskID,
    startMonitor:           Samples$Progress$startMonitor,
    stopMonitor:            Samples$Progress$stopMonitor,
    modifyRequestForTaskId: Samples$Progress$modifyRequestForTaskId,
    _startTimer:            Samples$Progress$_startTimer,
    _checkProgress:         Samples$Progress$_checkProgress,
    _onFeedbackReceived:    Samples$Progress$_onFeedbackReceived,
    _onFeedbackFailed:      Samples$Progress$_onFeedbackFailed    
}

// Register the new class
Samples.Progress.registerClass('Samples.Progress');

// Required to load the script through script manager
Sys.Application.notifyScriptLoaded();




