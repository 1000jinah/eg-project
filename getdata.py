# 1 db access
import pandas as pd
from sqlalchemy import create_engine
engine = create_engine("postgresql://dneuro:1004@svc.sel3.cloudtype.app:31621/DNEURO")
# US market ticker  from yahoo
query = """
            SELECT  ticker, tm.stk_id, ticker_yahoo, iso_code
            FROM tb_meta tm
            LEFT JOIN tb_ticker tt ON tt.stk_id = tm.stk_id
            WHERE iso_code = 'US'
        """
tb_meta_ticker_yahoo = pd.read_sql(query, con=engine)
# tb_meta_ticker_yahoo
# # df_new_dailybar_yahoo
# query = """
#     SELECT ticker_yahoo
#             , stk_id
#     FROM tb_ticker tt
# """
# df_tb_ticker_yahoo = pd.read_sql_query(query, con=engine)
# df_tb_ticker_yahoo