import {
  type Account,
  type Client,
  type TestActions,
  type TestRpcSchema,
  type Transport,
  createTestClient,
  http,
} from 'viem'

import { type Chain, mainnet, mainnet2, optimism } from './chains.js'

export const mainnetTestClient = createTestClient({
  mode: 'anvil',
  cacheTime: 0,
  chain: mainnet,
  transport: http(),
}).extend(decorator)

export const mainnet2TestClient = createTestClient({
  mode: 'anvil',
  cacheTime: 0,
  chain: mainnet2,
  transport: http(),
}).extend(decorator)

export const optimismTestClient = createTestClient({
  mode: 'anvil',
  cacheTime: 0,
  chain: optimism,
  transport: http(),
}).extend(decorator)

export const testClient = {
  mainnet: mainnetTestClient,
  mainnet2: mainnet2TestClient,
  optimism: optimismTestClient,
}

function decorator(
  client: Client<
    Transport,
    Chain,
    Account | undefined,
    TestRpcSchema<'anvil'>,
    TestActions
  >,
) {
  return {
    resetFork() {
      return client.reset({
        jsonRpcUrl: client.chain.fork.url,
        blockNumber: client.chain.fork.blockNumber,
      })
    },
  }
}