interface FundRanking {
    mstar_id: string,
    thailand_fund_code: string,
    nav_return: number,
    nav: number,
    nav_date: Date,
    avg_return: number
}

interface FundRankingResponse {
    status: true,
    error: string,
    data: FundRanking[]
}

export {FundRanking,FundRankingResponse};