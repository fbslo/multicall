# muticall issue

`yarn install`

`calls` has the CUB-BUSD LP info that works.
`callsK` has the CAKE kingdom contract info.

Put either one here:

`const calldata = callsK.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])`

And run `node multicall` to see the results.