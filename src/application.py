import pandas_datareader.data as web
import dash
import dash_core_components
import dash_html_components
from dash.dependencies import Input, Output
import datetime


app = dash.Dash()
app.title = "Stock Visualization"
app.layout = html.Div(children = [
    html.H1('Stock Visualization Dashboard'),
    html.H4('Please enter the stock name'),
    dcc.Input(id="input", value='', type='text'),
    html.Div(id="output-graph")
])

@app.callback (
    Output(component_id = "output-graph",
    component_property = 'children'),
    [Input(component_id = "input",
    component_property = "value")]       
)
def update_value(input_data):
    start = datetime.datetime(2022, 3, 3)
    end = datetime.datetime(2022, 1, 19)
    df = web.DataReader(input_data, 'yahoo',  start, end)
    return dcc.Graph(id="demo", figure={'data': [
        {'x': df.index, 'y':df.Close, 'type': 'line', 'name': input_data}], 'layout': {'title': input_data}})
    
if  __name__ == '__main__':
    app.run_server(debug=True)