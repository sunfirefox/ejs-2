require ejs.web
    
let server: HttpServer = new HttpServer
var router = Router(Router.LegacyRoutes)

server.on("readable", function (event, request) {
    App.log.info(request.method, request.uri, request.scheme)
    server.serve(request, router)
})

//  See ejsrc to modify the endpoint
App.log.info("Listen on", App.config.web.endpoint)
server.listen(App.config.web.endpoint)
App.run()
