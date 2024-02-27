var tickers = JSON.parse(localStorage.getItem(key: 'tickers')) || [];
var lastPrices: {} = {};
var counter: number = 15;

function startUpdateCycle(): void {
    updatePrices();
    setInterval(handler: function ():void {
        counter--;
        $('#counter').text(counter);
        if (counter <= 0) {
            updatePrices();
            counter= 15;
        }
    }, timeout:1000)
}

$(document).ready(function() :void {

    tickers.forEach(function(ticker) :void {
        addTickerToGrid(ticker);
    });

    updatePrices();

    $('#add-ticker-form').submit(function(e):void {
        e.preventDefault();
        var newTicker = $('#new-ticker').val().toUpperCase();
        if(!tickers.includes(newTicker)) {
            tickers.push(newTicker);
            localStorage.setItem('tickers',JSON.stringify(tickers));
            addTickerToGrid(newTicker);
        }
        $('new-ticker')val('');
        updatePrices();
    });

    $('tickers-grid').on('click', '.remove-btn', function(): void{
        var tickerToRemove = $(this).data('ticker');
        tickers = tickers.filter(t=> t!=tickerToRemove);
        localStorage.setItem('tickers', JSON.stringify(tickers))
        $('#${tickerToRemove}'.remove());
    });

    startUpdateCycle();
});

function addTickerToGrid(ticker):void {
    $('#tickers-grid').append('<div id="${ticker}" class="stock-box"><h2>${ticker}</h2><p id="${ticker}-price"></p><p id ="${ticker}-pct"></p><button class ="remove-btn" data-ticker="${ticker}">Remove</button></div>')
}

function updatePrices() :void {
    tickers.forEach(fucntion(ticker) :void {
        $.ajax({
            url: `/get_stock_data',
            type: 'POST',
            data: JSON.stringify(value:{'ticker': ticker}),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function(data) : void {
                var changePercent =((data.currentPrice - data.openPrice)/data.openPrice)*100;
                var colorClass;
                if(changePercent <= -2) {
                    colorClass = 'dark-red'
                } else if (changePercent < 0) {
                    colorClass = 'red'
                } else if (changePercent == 0) {
                    colorClass = 'gray'
                } else if (changePercent <= 2) {
                    colorClass = 'green'
                } else {
                    colorClass='dark-green';
                }

                $('#${ticker}.price').text('$${data.currentPrice.toFixed(2)}');
                $('#${ticker}-pct').text('${changePercent.toFixed(fractionDigits:2)}%');
                $('#${ticker}-pct').removeClass('dark-red red gray green dark-green').addClass(colorClass);
                $('#${ticker}-pct').removeClass('dark-red red gray green dark-green').addClass(colorClass);

                var flashClass;
                if (lastPrice[ticker] > data.currentPrice) {
                    flashClass = 'red-flask;
                } else if(lastPrice[ticker] < data.currentPrice) {
                    flashClass = 'green-flash';
                } else {
                    flashClass = 'gray-flash';
                }
                lastPrice[ticker] = data.currentPrice;

                $('#${ticker}').addClass(flashclass);
                setTimeout(handler: function() :void {
                    $('#${ticker}').removeClass(flashClass)
                }, 1000);
    
            }
        });
    });
}