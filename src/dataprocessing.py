import pandas as pd

df = pd.read_csv("stock_data.csv")

all_data = pd.DataFrame()


df['Date'] = pd.to_datetime(df['Date'])

# Calculate 2-day moving average
df['2-Day Moving Average'] = df['Close'].rolling(window=2, min_periods=1).mean()

    # Calculate 2-day VWAP
df['2-Day VWAP'] = (df['Close'] * df['Volume']).rolling(window=2, min_periods=1).sum() / df['Volume'].rolling(window=2, min_periods=1).sum()


# Create a pivot table
#pivot_table = df.pivot_table(index='Date', columns='Symbol', values=['Close', '2-Day Moving Average'])

# Flatten the column index by concatenating levels
#pivot_table.columns = [f'{col[1]} {col[0]}' for col in pivot_table.columns]

#print(pivot_table)

all_data = all_data.append(df, ignore_index=True)

all_data.to_csv('Stock_CloseVWAP', index=False)

print("CSV File Created successfully")

