import React from 'react'
import PublicRouter from './public/publicRoutes'
import PrivateRouter from './private/privateRoutes'
export default () =>
    (<>
        <PrivateRouter />
        <PublicRouter />
    </>)