import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { convertHourStringToMinute } from './utils/convert-hour-string-to-minute';
import { convertMinuteToHourString } from './utils/convert-minute-to-hour-string';
import morgan from 'morgan';

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

const prisma = new PrismaClient({
  log: ['query']
});

app.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
  })
  // games.length = 6
  return response.json(games);
}) 

app.post('/games/:gameId/ads', async (request, response) => {
  const gameId = request?.params?.gameId;

  const game = await prisma.ad.create({
    data: { 
      ...request.body,
      hourStart: convertHourStringToMinute(request.body.hourStart),
      hourEnd: convertHourStringToMinute(request.body.hourEnd),
      gameId 
    }
  });

  return response.status(201).json(game);
}) 

app.get('/games/:id/ads', async (request, response) => {
  const gameId = request?.params?.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true
    },
    where: { gameId },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return response.json(ads.map(ad => ({
    ...ad,
    weekDays: ad.weekDays.split(','),
    hourStart: convertMinuteToHourString(ad.hourStart),
    hourEnd: convertMinuteToHourString(ad.hourEnd)
  })));
})

app.get('/ads/:id/discord', async (request, response) => {
  const adId = request?.params?.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: { id: adId }
  })

  return response.json(ad);
}) 

let port = 3333
app.listen(port, () => console.log(`server listen on port ${port}`))