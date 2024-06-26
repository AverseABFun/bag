import { BagService } from '../../gen/bag_connect'
import { prisma } from '../db'
import { mappedPermissionValues } from '../permissions'
import { getKeyByValue } from '../utils'
import { execute } from './routing'
import { ConnectRouter } from '@connectrpc/connect'
import { PermissionLevels } from '@prisma/client'
import { v4 as uuid } from 'uuid'

export default (router: ConnectRouter) => {
  router.rpc(BagService, BagService.methods.createApp, async req => {
    return await execute(
      'create-app',
      req,
      async req => {
        if (!req.name) throw new Error('Name of app not provided')
        const app = await prisma.app.create({
          data: {
            ...req,
            permissions: req.permissions
              ? getKeyByValue(mappedPermissionValues, req.permissions)
              : PermissionLevels.READ,
            key: uuid()
          }
        })
        console.log('New app created: ', app.name)
        return { app }
      },
      mappedPermissionValues.ADMIN
    )
  })

  router.rpc(BagService, BagService.methods.getApp, async req => {
    return await execute('get-app', req, async (req, app) => {
      if (req.optAppId > 0) {
        const appSearch = await prisma.app.findUnique({
          where: {
            id: req.optAppId
          }
        })
        if (!appSearch) throw new Error()
        if (!appSearch.public && app.permissions === PermissionLevels.READ)
          throw new Error('App not found')
        else if (
          !appSearch.public &&
          mappedPermissionValues[app.permissions] <
            mappedPermissionValues.WRITE &&
          !app.specificApps.find(appId => appSearch.id === appId)
        )
          throw new Error('App not found')

        return { app: appSearch }
      } else return { app }
    })
  })

  router.rpc(BagService, BagService.methods.updateApp, async req => {
    return await execute('update-app', req, async (req, app) => {
      if (
        req.optAppId > 0 &&
        mappedPermissionValues[app.permissions] <
          mappedPermissionValues.WRITE_SPECIFIC
      )
        throw new Error('Invalid permissions')
      if (
        req.optAppId > 0 &&
        app.permissions === PermissionLevels.WRITE_SPECIFIC &&
        !app.specificApps.find(appId => appId === req.optAppId)
      )
        throw new Error('Invalid permissions')
      const old = await prisma.app.findUnique({
        where: {
          id: req.optAppId > 0 ? req.optAppId : app.id
        }
      })

      if (req.new.id !== undefined) delete req.new.identity

      return {
        app: await prisma.app.update({
          where: {
            id: req.optAppId > 0 ? req.optAppId : app.id
          },
          data: Object.assign(old, req.new)
        })
      }
    })
  })
}
