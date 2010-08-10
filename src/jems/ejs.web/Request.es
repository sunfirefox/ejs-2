/**
    Request.es -- Ejscript web request object. The Request object respresents a single HTTP request and provides
    low-level properties and methods to inspect and control the request. Request objects support the CommonJS JSGI 
    protocol specification. 
 */
module ejs.web {

    /**
        Web request class. Request objects manage the state and execution of a web request. The HttpServer class creates
        instances of Request in response to incoming client requests. The Request object holds the client request state
        including the request URL and headers. It provides low-level properties and methods to inspect and control the
        request. The Request object is a Stream and by calling the read() and write() methods, request body 
        content can be read and written.

        The response to send back to the client can be defined by setting status and calling setHeaders() and write() to 
        set the response status, headers and body content respectively.
        @spec ejs
        @stability prototype
     */
    dynamic class Request implements Stream {
        use default namespace public

        /** 
            Absolute Uri for the top-level of the application. This returns an absolute Uri (includes scheme and host) 
            for the top-most application Uri. See $home to get a relative Uri.
         */ 
        native enumerable var absHome: Uri

        /** 
            Authentication group. This property is set to the value of the authentication group header. 
            This field is read-only.
         */
        native enumerable var authGroup: String

        /** 
            Authentication method if authorization is being used (basic or digest). Set to null if not using authentication. 
            This field is read-only.
         */
        native enumerable var authType: String

        /** 
            Authentication user name. This property is set to the value of the authentication user header. Set to null if
            not yet defined.
            This field is read-only.
         */
        native enumerable var authUser: String

        /** 
            Will the request auto-finalize. Set to false if dontFinalize() is called. Templated pages and controllers 
            will auto-finalize, i.e. calling finalize() is not required unless dontFinalize() has been called.
         */
        native enumerable var autoFinalize: Boolean

        /** 
            Request configuration. Initially refers to App.config which is filled with the aggregated "ejsrc" content.
            Middleware may modify to refer to a request local configuration object.
         */
        enumerable var config: Object

        /** 
            Associated Controller object. Set to null if no associated controller
         */
        enumerable var controller: Controller

        /** 
            Get the request content length. This is the length of body data sent by the client with the request. 
            This property is read-only and is set to the length of the request content body in bytes or -1 if not known.
            Body data is readable by using $read() or by using the request object as a stream.
         */
        native enumerable var contentLength: Number

        /** 
            The request content type as specified by the "Content-Type" Http request header. This is set to null 
            if not defined.
         */
        native enumerable var contentType: String

        /** 
            Cookie headers. Cookies are sent by the client browser via the Set-Cookie Http header. They are typically 
            used used to specify the session state. If sessions are being used, an Ejscript session cookie will be 
            sent to and from the browser with each request. 
         */
        native enumerable var cookies: Object

        /** 
            Application web document directory on the local file system. This is set to the directory containing the
            application. For MVC applications, this is set to the base directory of the application. For non-MVC apps, 
            it is set to the directory containing the application startup script.
         */
        native enumerable var dir: Path

        /** 
            Get the encoding scheme for serializing strings. The default encoding is "utf-8".
            @hide
         */
        native var encoding: String

        /** 
            Descriptive error message for the request. This message is defined internally by the Request if a request
            times out or has a communications error.
         */
        native enumerable var errorMessage: String

        /** 
            Files uploaded as part of the request. For each uploaded file, an instance of UploadFile is created in files. 
            Each element is named by the file upload HTML input element ID in the HTML page form. 
         */
        native enumerable var files: Object

        /**
            Physical filename for the resource supplying the response content for the request. Virtual requests where
            the Request $uri does not correspond to any physical resource may not define this property.
         */
        enumerable var filename: Path

        /** 
            Request Http headers. This is an object hash filled with lower-case request headers from the client. If multiple 
            headers of the same key value are defined, their contents will be catenated with a ", " separator as per the 
            HTTP/1.1 specification. Use the header() method if you want to retrieve a single header.
            Headers defined on the server-side by creating new header entries in $headers will preserve case. 
            Use $headers() if you want to match headers using a mixed case key. e.g. headers("Content-Length").
         */
        native enumerable var headers: Object

        /** 
            Home URI for the application. This is a relative Uri for the top-most level of the application. 
         */ 
        native enumerable var home: Uri

        /** 
            Host serving the request. This is initialized to the authorized server hostname (HttpServer.name) if one is 
            configured.  Otherwise it will use Http "Host" header value if supplied by the client else the server IP 
            address of the accepting interface. This algorithm attempts to use the most public address available for 
            the server.
         */
        native enumerable var host: String

        /** 
            Flag indicating if the request is using secure communications. This means that TLS/SSL is the underlying
            protocol scheme.
         */
        native enumerable var isSecure: Boolean

        /**
            Resource limits for the request. The limits have initial default values defined by the owning HttpServer.
            @param limits. Limits is an object hash with the following properties:
            @option chunk Maximum size of a chunk when using chunked transfer encoding.
            @option inactivityTimeout Maximum time in seconds to keep a connection open if idle. Set to zero for no timeout.
            @option receive Maximum size of incoming body data.
            @option requestTimeout Maximum time in seconds for a request to complete. Set to zero for no timeout.
            @option reuse Maximum number of times to reuse a connection for requests (KeepAlive count).
            @option sessionTimeout Maximum time to preserve session state. Set to zero for no timeout.
            @option transmission Maximum size of outgoing body data.
            @option upload Maximum size of uploaded files.
            @see setLimits
          */
        native enumerable var limits: Object

        /** 
            Server IP address of the accepting interface
         */
        native enumerable var localAddress: String

        /** 
            Logger object. Set to App.log. This is configured from the "log" section of the "ejsrc" config file.
         */
        native var log: Logger 

        /** 
            Request HTTP method. String containing the Http method (DELETE | GET | POST | PUT | OPTIONS | TRACE)
         */
        native enumerable var method: String

        /** 
            Original HTTP request method used by the client. If the method is overridden by including a "__method__" 
            parameter in a POST request or by defining an X-HTTP-METHOD-OVERRIDE Http header, the original method used by
            the client is stored in this property and the method property reflects the newly defined value.
         */
        enumerable var originalMethod: String

        /**
            The original request URI supplied by the client. This is the Uri path supplied by the client on the first
            line of the Http request. It is combined with the HttpServer scheme, host and port components to yield a 
            fully qualified URI. The "uri" property has fields for: scheme, host, port, path, query and reference.
            The "uri" property is read-only.
         */
        native enumerable var originalUri: Uri

        /** 
            The request form parameters. This parameters are www-url decoded from the POST request body data. 
         */
        native enumerable var params: Object

        /** 
            Portion of the request URL after the scriptName. This is the location of the request within the application.
            The pathInfo is originally derrived from uri.path after splitting off the scriptName. Changes to the 
            uri or scriptName properties will not affect the pathInfo property.
         */
        native enumerable var pathInfo: String

        /** 
            TCP/IP port number for the server of this request.
         */
        native enumerable var port: Number

        /** 
            Http request protocol (HTTP/1.0 | HTTP/1.1)
         */
        native enumerable var protocol: String

        /** 
            Request query string. This is the portion of the Uri after the "?". Set to null if there is no query.
         */
        native enumerable var query: String

        /** 
            Request reference string. This is the portion of the Uri after the "#". Set to null if there is no reference.
         */
        native enumerable var reference: String

        /** 
            Name of the referring URL. This comes from the request "Referrer" Http header. Set to null if there is
            no defined referrer.
         */
        native enumerable var referrer: String

        /** 
            IP address of the client issuing the request. 
         */
        native enumerable var remoteAddress: String

        /** 
            Http response headers. This is the proposed set of headers to send with the response.
            The case of header keys is preserved.
         */
        native enumerable var responseHeaders: Object

        /** 
            Route used for the request. The route is the matching entry in the route table for the request.
            The route has properties two properties of particular interest: "name" which is the name of the route and
            and "type" which classifies the type of request. 
         */
        enumerable var route: Route

        /** 
            Http request scheme (http | https)
         */
        native enumerable var scheme: String

        /** 
            Script name for the current application serving the request. This is typically the leading Uri portion 
            corresponding to the application, but middleware may modify this to be an arbitrary string representing 
            the application.  The script name is often determined by the Router as it parses the request using 
            the routing tables. The scriptName will be set to the empty string if not defined.
         */
        native enumerable var scriptName: String

        /** 
            Owning server for the request. This is the HttpServer object that created this request.
         */
        native enumerable var server: HttpServer

        /** 
            Session state object. The session state object can be used to share state between requests.
            If a session has not already been created, accessing this property automatically creates a new session 
            and sets the $sessionID property and a cookie containing a session ID sent to the client with the response.
            To test if a session has been created, test the sessionID property which will not auto-create a session.
            Objects are stored in the session state using JSON serialization.
         */
        native var session: Session 

        /** 
            Current session ID. Index into the $sessions object. Set to null if no session is defined.
         */
        native enumerable var sessionID: String

        /** 
            Set to the (proposed) Http response status code.
         */
        native enumerable var status: Number

        /**
            The current request URI. This property is read-only and is dynamically computed from the originalUri combined
            with the current scheme, host, port, scriptName, pathInfo, query and reference property values. 
            The "uri" property has fields for: scheme, host, port, path, query and reference.
         */
        native enumerable var uri: Uri

        /*************************************** Methods ******************************************/

        /** 
            @duplicate Stream.async
            Request does not support sync mode and only supports async mode.
         */
        native function get async(): Boolean
        native function set async(enable: Boolean): Void

        /** 
            @duplicate Stream.close
            This closes the current request by finalizing all transmission data and sending a "close" event. It may 
            not close the actually socket connection so that it can be reused for future requests.
         */
        native function close(): Void

//  MOB -- have a default timeout value
        /**
            Create a session state object. The session state object can be used to share state between requests.
            If a session has not already been created, this call will create a new session and initialize the 
            $session property with the new session. It will also set the $sessionID property and a cookie containing 
            a session ID will be sent to the client with the response. Sessions can also be used/created by simply
            accessing the session property.  Objects are stored in the session state using JSON serialization.
            @param timeout Session state timeout in seconds. After the timeout has expired, the session will be deleted.
         */
        function createSession(timeout: Number = -1): Session {
            setLimits({ sessionTimeout: timeout })
            return session
        }

        /**
            Stop auto-finalizing the request. Calling dontFinalize will keep the request open until a forced finalize is
            made via "finalize(true). 
         */
        native function dontFinalize(): Void

        /** 
            Destroy a session. This call destroys the session state store that is being used for the current client. 
            If no session exists, this call has no effect. Sessions are created by reading or writing to the $session 
            property.
         */
        native function destroySession(): Void

        /** 
            The request pathInfo file extension
         */
        function get extension(): String
            Uri(pathInfo).extension

        /** 
            Signals the end of any write data and flushes any buffered write data to the client. 
            If dontFinalize() has been called, this call will have no effect unless $force is true.
            @param force Do finalization even if dontFinalize has been called.
         */
        native function finalize(force: Boolean = false): Void 

        /** 
            Flush request data. Calling flush(Sream.WRITE) or finalize() is required to ensure write data is sent 
            to the client. Flushing the read direction is ignored
            @duplicate Stream.flush
         */
        native function flush(dir: Number = Stream.WRITE): Void

        /** 
            Get a request header by keyword. Headers supplied by the remote client are stored in lower-case. 
            Headers defined on the server-side preserve case. This routine supports both by doing a case-insensitive lookup.
            @param key Header key value to retrieve. The key match is case insensitive.
            @return The header value
         */
        native function header(key: String): String

        /** 
            Make a URI, provided parts of the URI. The URI is completed using the current request and route state.
            @params location The location parameter can be a URI string or object hash of components. If the URI is a
               string, it is may be an absolute or relative URI. It is joined using Uri.join() to a base URI fromed from
               the current request parameters. If the URI is an object hash, the following properties are examined
               and used to augment parameters from the existing request: scheme, host, port, path, query, reference. 
               Properties that are relevant to the current request route, such as "controller", or "action" are also
               consulted.
            @option scheme String URI protocol scheme (http or https)
            @option host String URI host name or IP address.
            @option port Number TCP/IP port number for communications
            @option path String URI path 
            @option query String URI query parameters. Does not include "?"
            @option reference String URI path reference. Does not include "#"
            @option controller String Controller name if using an MVC route
            @option action String Action name if using an MVC route
            @return A Uri object
         */
        function makeUri(location: Object): Uri {
            if (route) {
                if (location is String) {
                    return route.makeUri(this, params).join(location)
                } else {
                    return route.makeUri(this, blend(params.clone(), location))
                }
            }
            let components = absHome.components
            if (location is String) {
                return Uri(components).join(location)
            } else {
                blend(components, location)
            }
            return Uri(components)
        }

        /** 
            @duplicate Stream.observe
            @event readable Issued when some body content is available.
            @event writable Issued when the connection is writable to accept body data (PUT, POST).
            @event close Issued when the request completes
            @event error Issued if the request does not complete or the connection disconnects. An error event is not 
                caused by non-200 status codes, these are regarded as valid return results. Rather, an error event will
                be issued when the request cannot return a complete, valid Http response to the client.
            All events are called with the signature:
            function (event: String, http: Http): Void
         */
        native function observe(name, observer: Function): Void

        /** 
            @duplicate Stream.read
         */
        native function read(buffer: ByteArray, offset: Number = 0, count: Number = -1): Number 

        /** 
            Redirect the client to a new URL. This call redirects the client's browser to a new location specified 
            by the $url.  Optionally, a redirection code may be provided. Normally this code is set to be the HTTP 
            code 302 which means a temporary redirect. A 301, permanent redirect code may be explicitly set.
            @param location Url to redirect the client toward. This can be a relative or absolute string URL or it can be
                a hash of URL components. For example, the following are valid inputs: "../index.ejs", 
                "http://www.example.com/home.html", {action: "list"}.
            @param status Optional HTTP redirection status
         */
        function redirect(location: Object, status: Number = Http.MovedTemporarily): Void {
            /*
                This permits urls like: ".." or "/" or "http://..."
             */
            let base = uri.clone()
            base.query = ""
            base.reference = ""
            let url = (location is String) ? makeUri(base.join(location).normalize.components) : makeUri(location)
            this.status = status
            setHeader("Location", url)
            write("<!DOCTYPE html>\r\n" +
                   "<html><head><title>Redirect (" + status + ")</title></head>\r\n" +
                    "<body><h1>Redirect (" + status + ")</h1>\r\n" + 
                    "<p>The document has moved <a href=\"" + url + 
                    "\">here</a>.</p>\r\n" +
                    "<address>" + server.software + " at " + host + " Port " + server.port + 
                    "</address></body>\r\n</html>\r\n")
        }

        /** 
            @duplicate Stream.removeObserver 
         */
        native function removeObserver(name, observer: Function): Void

//  MOB -- should this be sendFile - YES
        /**
            Send a static file back to the client. This is a high performance way to send static content to the client.
            This call must be invoked prior to sending any data or headers to the client, otherwise it will be ignored
            and the slower netConnector will be used instead.
            @param file Path to the file to send back to the client
            @return True if the Send connector can successfully be used. 
         */
        native function sendFile(file: Path): Boolean

        /** 
            Send a response to the client. This can be used instead of setting status and calling setHeaders() and write(). 
            The $response argument is an object hash containing status, headers and
            body properties. The respond method replaces previously defined status and headers.
            @option status Numeric Http status code (e.g. 200 for a successful response)
            @option header Object hash of Http headers
            @option body Body content
        */
        function sendResponse(response: Object): Void {
            status = response.status || 200
            if (response.headers)
                setHeaders(response.headers)
            if (response.body)
                write(response.body)
            finalize()
        }

        /** 
            Define a cookie header to send with the response. Path, domain and lifetime can be set to null for 
                default values.
            @param name Cookie name
            @param options Cookie field options
            @options value Cookie value
            @options path Uri path to which the cookie applies
            @options domain String Domain in which the cookie applies. Must have 2-3 "." and begin with a leading ".". 
                For example: domain: .example.com
            @options expires Date When the cookie expires
            @options secure Boolean Set to true if the cookie only applies for SSL based connections
         */
        function setCookie(name: String, options: Object) {
            options.path ||= "/"
            let cookie = Uri.encodeComponent(name) + "=" + options.value
            cookie += "; path=" + options.path
            if (options.domain)
                cookie += "; domain=" + options.domain
            if (options.expires)
                cookie += "; expires= " + options.expires.toUTCString()
            if (options.secure)
                cookie += "; secure"
            setHeader("Set-Cookie", cookie)
            setHeader("Cache-control", "no-cache=\"set-cookie\"")
        }

        /** 
            Convenience routine to set a Http response header in $responseHeaders. If a header has already been 
            defined and $overwrite is true, the header will be overwritten. NOTE: case is ignored in the header keyword.
            Access $responseHeaders to inspect the proposed response header set.
            @param key The header keyword for the request, e.g. "accept".
            @param value The value to associate with the header, e.g. "yes"
            @param overwrite If the header is already defined and overwrite is true, then the new value will
                overwrite the old. If overwrite is false, the new value will be catenated to the old value with a ", "
                separator.
         */
        native function setHeader(key: String, value: String, overwrite: Boolean = true): Void

        /**
            Convenience routine to set multiple Http response headers in $responseHeaders. Access $responseHeaders to 
            inspect the proposed response header set.
            @param headers Set of headers to use
            @param overwrite If the header is already defined and overwrite is true, then the new value will
                overwrite the old. If overwrite is false, the new value will be catenated to the old value with a ", "
                separator.
         */
        function setHeaders(headers: Object, overwrite: Boolean = true): Void {
            for (let [key,value] in headers) {
                setHeader(key, value, overwrite)
            }
        }

        /**
            Update the request resource limits. The supplied limit fields are updated.
            See the $limits property for limit field details.
            @param limits Object hash of limit fields and values
            @see limits
         */
        native function setLimits(limits: Object): Void

        /**
            Convenience routine to define an application at a given Uri prefix and directory location. This is typically
                called from routing tables.
            @param prefix The leading Uri prefix for the application. This prefix is removed from the pathInfo and the
                $scriptName property is set to the prefix.
            @param location Path to where the application home directory is. This sets the $dir property to the $location
                argument.
        */
        function setLocation(prefix: String, location: Path): Void {
            prefix = prefix.trimEnd("/")
            pathInfo = pathInfo.trimStart(prefix)
            scriptName = prefix     //MOB .trimStart("/")
            dir = location
        }

        /** 
            Convenience routine to set the (proposed) Http response status code. This is equivalent to assigning 
            to the $status property.
         */
        function setStatus(status: Number): Void
            this.status = status

        /** 
            Dump objects for debugging
            @param args List of arguments to print.
            @hide
         */
        function show(...args): Void {
            for each (var e: Object in args) {
                write(serialize(e, {pretty: true}) + "\r\n")
            }
        }

        /**
            Configure tracing for this request. Tracing is initialized by the owning HttpServer and is typically
            defined to trace the first line of requests and responses at level 2, headers at level 3 and body content
            at level 4. Once the request has been created however, the first line and headers of the request are 
            already parsed and traced by the HttpServer, so modifying the trace level via trace() on the request object
            will only impact the tracing of response body content.
            
            The options argument contains optional properties: rx and tx 
            (for receive and transmit tracing). The rx and tx properties may contain an object hash which describes 
            the tracing for that direction and includes any of the following fields:
            @param options. Set of trace options with properties "rx" and "tx" for receive and transmit direction tracing.
                The include property is an array of file extensions to include in tracing.
                The include property is an array of file extensions to exclude from tracing.
                The all property specifies that everything for this direction should be traced.
                The conn property specifies that new connections should be traced.
                The first property specifies that the first line of the request should be traced.
                The headers property specifies that the headers (including first line) of the request should be traced.
                The body property specifies that the body content of the request should be traced.
                The size property specifies a maximum body size in bytes that will be traced. Content beyond this limit 
                    will not be traced.
            @option transmit. Object hash with optional properties: include, exclude, first, headers, body, size.
            @option receive. Object hash with optional properties: include, exclude, conn, first, headers, body, size.
            @example:
                trace({
                    transmit: { exclude: ["gif", "png"], "headers": 3, "body": 4, size: 1000000 }
                    receive:  { "conn": 1, "headers": 2 , "body": 4, size: 1024 }
                })
          */
        native function trace(options: Object): Void


        /** 
            Write data to the client. This will buffer the written data until either flush() or finalize() is called. 
            @duplicate Stream.write
         */
        native function write(...data): Number

        /** 
            Write an error message back to the user and finalize the request. 
            The output is html escaped for security.
            @param code Http status code
            @param msgs Messages to send with the response. The messages may be modified for readability if it 
                contains an exception backtrace.
         */
        function writeError(code: Number, ...msgs): Void {
            let text
            status = code
            let msg = msgs.join(" ").replace(/.*Error Exception: /, "")
            let title = "Request Error for \"" + pathInfo + "\""
            let text
            if (config.log.showClient) {
                text = "<pre>" + escapeHtml(msg) + "</pre>\r\n" +
                    '<p>To prevent errors being displayed in the "browser, ' + 
                    'set <b>log.showClient</b> to false in the ejsrc file.</p>\r\n'
            }
            try {
                setHeader("Content-Type", "text/html")
                write(errorBody(title, text))
            } catch {}
            finalize(true)
            log.debug(4, "Request error (" + status + ") for: \"" + uri + "\". " + msg)
        }

        /** 
            Send text back to the client which is first HTML escaped.
            @param args Objects to emit
         */
        function writeHtml(...args): Void
            write(html(...args))

        /********************************************** JSGI  ********************************************************/
        /** 
            JSGI specification configuration object.
            @spec jsgi-0.3
         */
        static var jsgi: Object = {
            errors: App.log,
            version: [0,3],
            multithread: true,
            multiprocess: false,
            runonce: false,
        }

        /** 
            Storage for middleware specific state. Added for JSGI compliance.
            @spec jsgi-0.3
         */
        native enumerable var env: Object

        /**
            Request content stream. This is equivalent to using "this" as Request objects are streams connected to the
            input content. Added for JSGI compliance.
            @spec jsgi-0.3
            @returns Stream object equal to the value of "this" request instance.
        */
        function get input(): Stream
            this

        /** 
            Decoded query string (URL query string). Eqivalent to the $query property. Added for JSGI compliance
            @spec jsgi-0.3
            @return A string containing the request query. Returns an empty string if there is no query.
         */
        function get queryString(): String
            query

        /**
            Listening port number for the server
            @returns A number set to the TCP/IP port for the listening socket.
         */
        function get serverPort(): Number
            server.port

        /*************************************** Deprecated ***************************************/

        /** 
            @hide
            @deprecated 2.0.0
          */
        # Config.Legacy
        function get accept(): String
            header("accept")

        /** 
            @hide
            @deprecated 2.0.0
          */
        # Config.Legacy
        function get acceptCharset(): String
            header("accept-charset")

        /** 
            @hide
            @deprecated 2.0.0
          */
        # Config.Legacy
        function get acceptEncoding(): String
            header("accept-encoding")

        /** 
            @hide
            @deprecated 2.0.0
          */
        # Config.Legacy
        function get authAcl(): String {
            throw new Error("Not supported")
            return null
        }

        /** 
            @hide
            @deprecated 2.0.0
          */
        # Config.Legacy
        function get body(): String
            input.readString()

        /** 
            Control the caching of the response content. Setting cacheable to false will add a Cache-Control: no-cache
            header to the output
            @param enable Set to false (default) to disable caching of the response content.
            @hide
            @deprecated 2.0.0
         */
        # Config.Legacy
        function cachable(enable: Boolean = false): Void {
            if (!cache) {
                setHeader("Cache-Control", "no-cache", false)
            }
        }

        /** 
            @hide
            @deprecated 2.0.0
          */
        # Config.Legacy
        function get connection(): String
            header("connection")

        /** 
            @hide
            @deprecated 2.0.0
          */
        # Config.Legacy
        function get hostName(): String
            host

        /** 
            @hide
            @deprecated 2.0.0
          */
        # Config.Legacy
        function get mimeType(): String
            header("content-type")

        /** 
            @hide
            @deprecated 2.0.0
          */
        # Config.Legacy
        function get pathTranslated(): String
            dir.join(pathInfo)

        /** 
            @hide
            @deprecated 2.0.0
          */
        # Config.Legacy
        function get pragma(): String
            header("pragma")

        /** 
            @hide
            @deprecated 2.0.0
          */
        # Config.Legacy
        function get remoteHost(): String
            header("host")

        /** 
            @hide
            @deprecated 2.0.0
          */
        # Config.Legacy
        function get url(): String
            pathInfo

        /** 
            Get the name of the client browser software set in the "User-Agent" Http header 
            @hide
            @deprecated 2.0.0
         */
        # Config.Legacy
        function get userAgent(): String
            header("user-agent")
    }
}

/*
    @copy   default
    
    Copyright (c) Embedthis Software LLC, 2003-2010. All Rights Reserved.
    Copyright (c) Michael O'Brien, 1993-2010. All Rights Reserved.
    
    This software is distributed under commercial and open source licenses.
    You may use the GPL open source license described below or you may acquire 
    a commercial license from Embedthis Software. You agree to be fully bound 
    by the terms of either license. Consult the LICENSE.TXT distributed with 
    this software for full details.
    
    This software is open source; you can redistribute it and/or modify it 
    under the terms of the GNU General Public License as published by the 
    Free Software Foundation; either version 2 of the License, or (at your 
    option) any later version. See the GNU General Public License for more 
    details at: http://www.embedthis.com/downloads/gplLicense.html
    
    This program is distributed WITHOUT ANY WARRANTY; without even the 
    implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
    
    This GPL license does NOT permit incorporating this software into 
    proprietary programs. If you are unable to comply with the GPL, you must
    acquire a commercial license to use this software. Commercial licenses 
    for this software and support services are available from Embedthis 
    Software at http://www.embedthis.com 

    @end
 */
