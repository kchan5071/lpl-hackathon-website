import pandas as pd 
import random
from openai import OpenAI
import yfinance as yf
import warnings 

class Stock_Feedback:
    def __init__(self):
        warnings.filterwarnings("ignore")
        key = self.read_key()
        self.client = OpenAI(
            api_key=key
        )
        self.sp500 = pd.read_csv("constituents.csv")
        self.stock_list = self.sp500['Symbol'].tolist()
        self.master_stock_verify_list = pd.read_csv("stock_info.csv")['Ticker'].tolist() + self.stock_list
        self.defensive_sectors = ['Health Care', 'Consumer Staples', 'Utilities']

    def read_key(self):
        with open("/home/ubuntu/openai_key.txt", "r") as file:
            return file.read()

    def verify_percentages(self, percentages):
        if sum(percentages) != 1:
            sum_percent = sum(percentages)
            for i in range(len(percentages)):
                percentages[i] = percentages[i] / sum_percent
        return percentages
    
    def verify_tickers(self, input_stocks):
        for stock in input_stocks:
            if stock not in self.master_stock_verify_list:
                # print(f'{stock} is not in the master list')
                input_stocks.remove(stock)
            else:
                # print(f'{stock} is in the master list')
                pass
        return input_stocks
    
    def summarize(self, input_stocks, percentages):
        # verify that percentages add up to 1
        percentages = self.verify_percentages(percentages)
        #check that all stocks are in the master list
        input_stocks = self.verify_tickers(input_stocks)
        stock_sectors, stock_sector_percentages,_, _, = self.track_sector_percentages(input_stocks, percentages)
        zipped_sector = list(zip(stock_sectors, stock_sector_percentages))
        percent_defensive = self.get_defensive_percentage(zipped_sector)
        defensive_message = self.get_defensive_message(percent_defensive)
        significant_sectors = self.get_significant_sectors(zipped_sector)
        response = self.call_openai(defensive_message + significant_sectors)
        print(response)
        return response


    def get_sector(self, stock_name):
        stock = yf.Ticker(stock_name)
        sector = None
        sub_industry = None
        if stock.ticker in self.stock_list:
            sector = self.sp500.loc[self.sp500['Symbol'] == stock.ticker]['GICS Sector'].values[0]
            sub_industry = self.sp500.loc[self.sp500['Symbol'] == stock.ticker]['GICS Sub-Industry'].values[0]
            print(f'{stock} is in the {sector} sector and the {sub_industry} sub-industry')
        else:
            try:
                sector = stock.info['sector']
                sub_industry = stock.info['industry']
                # print(f'{stock} is in the {sector} sector and the {sub_industry} sub-industry')
            except:
                # print(f'{stock} sector and sub-industry are not available')
                pass
        return sector, sub_industry
    
    def track_sector_percentages(self, input_stocks, percentages):
        stock_sectors = []
        stock_sector_percentages = []
        stock_sub_industries = []
        stock_sub_industry_percentages = []
        for i in range(len(input_stocks)):
            stock_name = input_stocks[i]
            stock_percentage = percentages[i]
            sector, sub_industry = self.get_sector(stock_name)
            if sector is not None and sub_industry is not None:
                if sector not in stock_sectors:
                    stock_sectors.append(sector)
                    stock_sector_percentages.append(stock_percentage)
                else:
                    index = stock_sectors.index(sector)
                    stock_sector_percentages[index] += stock_percentage

                if sub_industry not in stock_sub_industries:
                    stock_sub_industries.append(sub_industry)
                    stock_sub_industry_percentages.append(stock_percentage)
                else:
                    index = stock_sub_industries.index(sub_industry)
                    stock_sub_industry_percentages[index] += stock_percentage
        return stock_sectors, stock_sector_percentages, stock_sub_industries, stock_sub_industry_percentages
    
    def get_defensive_percentage(self, zipped_sector):
        percent_defensive = 0
        for index in range(len(zipped_sector)):
            if zipped_sector[index][0] in self.defensive_sectors:
                percent_defensive += zipped_sector[index][1]
        return percent_defensive
    
    def get_defensive_message(self, percent_defensive):
        if percent_defensive >= 0.5:
            return "The portfolio is defensive"
        elif percent_defensive == 0:
            return "The portfolio has no defensive sectors"
        elif percent_defensive <= 0.2:
            return "The portfolio is aggressive"
        elif percent_defensive > 0.2 and percent_defensive < 0.5:
            return "The portfolio is moderately defensive"
        
        
    def get_significant_sectors(self, zipped_sector):
        message = ""
        for each in zipped_sector:
            if each[1] >= 0.1:
                message += f'{each[0]} is a significant sector in the portfolio'
        return message
    
    def call_openai(self, message):
        if message:
            completion = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "developer", "content": "You are a helpful assistant."},
                    {
                        "role": "user",
                        "content": f'summarize in a paragraph format: {message}.'
                    }
                ]
            )
            return completion.choices[0].message.content


def main():
    stock_feedback = Stock_Feedback()
    input_stocks = random.sample(stock_feedback.stock_list, 6)
    percentages = random.choices(range(1, 101), k=6)
    stock_feedback.summarize(input_stocks, percentages)

if __name__ == "__main__":
    main()
