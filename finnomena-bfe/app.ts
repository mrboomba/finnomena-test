import express, { Application, Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import { FundRankingResponse } from './type/fund-ranking.model';
import cors from 'cors';
import path from 'path';
const app: Application = express();
const allowedOrigins = ['http://localhost:8080'];
const staticPath = path.join(__dirname, 'views');

const options: cors.CorsOptions = {
  origin: allowedOrigins
};
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(staticPath));
app.use(cors(options));

app.get('/', function (req,res) {    
    res.sendFile(path.join(staticPath , "index.html"));
  });

app.get('/data', async (req: Request, res: Response) => {
    if (req?.query?.range) {
        const url = `https://storage.googleapis.com/finno-ex-re-v2-static-staging/recruitment-test/fund-ranking-${req.query.range}.json`;
        try{
            const response = await axios.get(url);
            const fundRankingResponse: FundRankingResponse = response.data;
            return res.status(200).json({
                    fundRanking: fundRankingResponse.data
            });
        } catch(e:any){
            if(axios.isAxiosError(e)){
                console.error(e.response?.status+" "+e.response?.data);
            }
        }
        
    }
    return res.status(404).json({
        errorMessage: 'Invalid range'
    })
});

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
});