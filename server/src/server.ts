import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import { convterHoursStringToMinutes } from './utils/convert-hours-string-to-minutes'
import { convertMinutesToHourString } from './utils/convert-minute-to-hourstring'

const app = express()
const prisma = new PrismaClient({
  log: ['query']
})

app.use(express.json())
app.use(cors())

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
  return response.json(games)
})

app.post('/games', (request, response) => {
  return response.status(201).json([])
})

app.get('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id

  const ads = await prisma.ad.findMany({
    select: {
      discord: false,
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true
    },
    where: {
      gameId: gameId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return response.json(
    ads.map(ad => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(','),
        hourStart: convertMinutesToHourString(ad.hourStart),
        hourEnd: convertMinutesToHourString(ad.hourEnd)
      }
    })
  )
})

app.post('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id
  const body: any = request.body

  //procurar ZOD js

  const ad = await prisma.ad.create({
    data: {
      gameId: gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convterHoursStringToMinutes(body.hourStart),
      hourEnd: convterHoursStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel
    }
  })

  return response.status(201).json(ad)
})

app.get('/ads/:id/discord', async (request, response) => {
  const adId = request.params.id
  const ad = await prisma.ad.findUniqueOrThrow({
    where: {
      id: adId
    },
    select: {
      discord: true
    }
  })

  return response.json({
    discord: ad.discord
  })
})

app.listen(3333)
