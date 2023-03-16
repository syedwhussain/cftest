function LoadReport(Page) {   
    var properties = { caption: 'CargoFlights', center_win: true, show_loading: true, width:1000,height:590, fullscreen: false, callback_fn: null };
    var win = new GB_Window(properties);
    win.show(Page);
}

