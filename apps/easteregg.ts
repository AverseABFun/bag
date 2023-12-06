import { createPromiseClient } from '@connectrpc/connect'
import { createGrpcTransport } from '@connectrpc/connect-node'
import { ElizaService } from '../gen/proto/eliza_connect'
import 'dotenv/config'

async function app() {
  const transport = createGrpcTransport({
    baseUrl: 'http://localhost:3000',
    httpVersion: '1.1'
  })

  const client = createPromiseClient(ElizaService, transport)
  const key = process.env.TEST_APP_KEY // App key for Easter Egg is stored at TEST_APP_KEY, for the sake of testing

  // Now I'm going to add a custom Slack action that listens for a response of "Hello, world!" in the #baggie channel.
  // When we receive a response, my app will assign the user a Easter Egg badge.
  // We created the Easter Egg badge by?
  const response = await client.addSlackAction(
    {
      key // Pass in key first
    },
    {}
  )
  const response = await client.addSlackAction({ key }, '', '', async props => {
    // How much should we expose?
    props.assignItem
  })
}

app()
