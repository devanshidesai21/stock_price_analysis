import pandas as pd

start_date = 1641168000
end_date = 1642550400

specific_columns = ['Date', 'Close', 'Volume']

tickers = ['MSFT', 'AAPL', 'IBM']

all_data = pd.DataFrame()

for ticker in tickers:
    query_string = f'https://query1.finance.yahoo.com/v7/finance/download/{ticker}?period1={start_date}&period2={end_date}&interval=1d&events=history&includeAdjustedClose=true'
    df = pd.read_csv(query_string, usecols=specific_columns)
    df['Symbol'] = ticker

    # Calculate 2-day moving average
    #df['2-Day Moving Average'] = df['Close'].rolling(window=2, min_periods=1).mean()

    # Calculate 2-day VWAP
    #df['2-Day VWAP'] = (df['Close'] * df['Volume']).rolling(window=2, min_periods=1).sum() / df['Volume'].rolling(window=2, min_periods=1).sum()

    all_data = all_data.append(df, ignore_index=True)

all_data.to_csv('stock_data.csv', index=False)

print("CSV file created successfully!")

