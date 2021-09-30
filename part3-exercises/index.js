const getRandomInt = (max) => Math.floor(Math.random() * max);

const express = require("express");
const app = express();
const morgan = require("morgan");

morgan.token("custom", function (req, res) {
	const method = req.method;
	const path = req.route.path;
	const code = res.statusCode;
	const contentLength = res._contentLength;

	return `${method} ${path} ${code} ${contentLength}`;
});

morgan.token("body", function (req, res) {
	const body = JSON.stringify(req.body);
	const method = req.method;

	if (method === "POST") {
		return body;
	}
});

app.use(express.json());
app.use(morgan(":custom - :response-time ms :body"));

let people = [
	{
		id: 1,
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: 2,
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: 3,
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: 4,
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
];

app.get("/api/people", (request, response) => {
	response.json(people);
});

app.get("/api/people/:id", (request, response) => {
	const id = Number(request.params.id);
	const person = people.find((person) => person.id === id);

	if (person) {
		response.json(person);
	} else {
		response.status(404).end();
	}
});

app.get("/info", (request, response) => {
	response.send(`
        <p>Phonebook has info for ${people.length} people</p>
        <br />
        <p>${new Date()}</p>
    `);
});

app.delete("/api/people/:id", (request, response) => {
	const id = Number(request.params.id);
	people = people.filter((person) => person.id !== id);

	response.status(204).end();
});

app.post("/api/people", (request, response) => {
	const body = request.body;

	if (!body.name || !body.number) {
		return response.status(400).json({
			error: "content missing",
		});
	}

	if (people.find((person) => person.name === body.name)) {
		return response.status(409).json({
			error: "name must be unique",
		});
	}

	const person = {
		id: getRandomInt(1231234),
		name: body.name,
		number: body.number,
	};

	people = people.concat(person);

	response.json(person);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);

// --------------
// {/* <ref *2> IncomingMessage {
//   _readableState: ReadableState {
//     objectMode: false,
//     highWaterMark: 16384,
//     buffer: BufferList { head: null, tail: null, length: 0 },
//     length: 0,
//     pipes: [],
//     flowing: true,
//     ended: true,
//     endEmitted: true,
//     reading: false,
//     sync: false,
//     needReadable: false,
//     emittedReadable: false,
//     readableListening: false,
//     resumeScheduled: false,
//     errorEmitted: false,
//     emitClose: true,
//     autoDestroy: false,
//     destroyed: false,
//     errored: null,
//     closed: false,
//     closeEmitted: false,
//     defaultEncoding: 'utf8',
//     awaitDrainWriters: null,
//     multiAwaitDrain: false,
//     readingMore: false,
//     decoder: null,
//     encoding: null,
//     [Symbol(kPaused)]: false
//   },
//   _events: [Object: null prototype] { end: [Function: clearRequestTimeout] },
//   _eventsCount: 1,
//   _maxListeners: undefined,
//   socket: <ref *1> Socket {
//     connecting: false,
//     _hadError: false,
//     _parent: null,
//     _host: null,
//     _readableState: ReadableState {
//       objectMode: false,
//       highWaterMark: 16384,
//       buffer: BufferList { head: null, tail: null, length: 0 },
//       length: 0,
//       pipes: [],
//       flowing: true,
//       ended: false,
//       endEmitted: false,
//       reading: true,
//       sync: false,
//       needReadable: true,
//       emittedReadable: false,
//       readableListening: false,
//       resumeScheduled: false,
//       errorEmitted: false,
//       emitClose: false,
//       autoDestroy: false,
//       destroyed: false,
//       errored: null,
//       closed: false,
//       closeEmitted: false,
//       defaultEncoding: 'utf8',
//       awaitDrainWriters: null,
//       multiAwaitDrain: false,
//       readingMore: false,
//       decoder: null,
//       encoding: null,
//       [Symbol(kPaused)]: false
//     },
//     _events: [Object: null prototype] {
//       end: [Array],
//       timeout: [Function: socketOnTimeout],
//       data: [Function: bound socketOnData],
//       error: [Function: socketOnError],
//       close: [Function: bound socketOnClose],
//       drain: [Function: bound socketOnDrain],
//       resume: [Function: onSocketResume],
//       pause: [Function: onSocketPause]
//     },
//     _eventsCount: 8,
//     _maxListeners: undefined,
//     _writableState: WritableState {
//       objectMode: false,
//       highWaterMark: 16384,
//       finalCalled: false,
//       needDrain: false,
//       ending: false,
//       ended: false,
//       finished: false,
//       destroyed: false,
//       decodeStrings: false,
//       defaultEncoding: 'utf8',
//       length: 0,
//       writing: false,
//       corked: 0,
//       sync: false,
//       bufferProcessing: false,
//       onwrite: [Function: bound onwrite],
//       writecb: null,
//       writelen: 0,
//       afterWriteTickInfo: null,
//       buffered: [],
//       bufferedIndex: 0,
//       allBuffers: true,
//       allNoop: true,
//       pendingcb: 0,
//       prefinished: false,
//       errorEmitted: false,
//       emitClose: false,
//       autoDestroy: false,
//       errored: null,
//       closed: false,
//       closeEmitted: false
//     },
//     allowHalfOpen: true,
//     _sockname: null,
//     _pendingData: null,
//     _pendingEncoding: '',
//     server: Server {
//       maxHeaderSize: undefined,
//       insecureHTTPParser: undefined,
//       _events: [Object: null prototype],
//       _eventsCount: 2,
//       _maxListeners: undefined,
//       _connections: 2,
//       _handle: [TCP],
//       _usingWorkers: false,
//       _workers: [],
//       _unref: false,
//       allowHalfOpen: true,
//       pauseOnConnect: false,
//       httpAllowHalfOpen: false,
//       timeout: 0,
//       keepAliveTimeout: 5000,
//       maxHeadersCount: null,
//       headersTimeout: 60000,
//       requestTimeout: 0,
//       _connectionKey: '6::::3001',
//       [Symbol(IncomingMessage)]: [Function: IncomingMessage],
//       [Symbol(ServerResponse)]: [Function: ServerResponse],
//       [Symbol(kCapture)]: false,
//       [Symbol(async_id_symbol)]: 6
//     },
//     _server: Server {
//       maxHeaderSize: undefined,
//       insecureHTTPParser: undefined,
//       _events: [Object: null prototype],
//       _eventsCount: 2,
//       _maxListeners: undefined,
//       _connections: 2,
//       _handle: [TCP],
//       _usingWorkers: false,
//       _workers: [],
//       _unref: false,
//       allowHalfOpen: true,
//       pauseOnConnect: false,
//       httpAllowHalfOpen: false,
//       timeout: 0,
//       keepAliveTimeout: 5000,
//       maxHeadersCount: null,
//       headersTimeout: 60000,
//       requestTimeout: 0,
//       _connectionKey: '6::::3001',
//       [Symbol(IncomingMessage)]: [Function: IncomingMessage],
//       [Symbol(ServerResponse)]: [Function: ServerResponse],
//       [Symbol(kCapture)]: false,
//       [Symbol(async_id_symbol)]: 6
//     },
//     parser: HTTPParser {
//       '0': [Function: bound setRequestTimeout],
//       '1': [Function: parserOnHeaders],
//       '2': [Function: parserOnHeadersComplete],
//       '3': [Function: parserOnBody],
//       '4': [Function: parserOnMessageComplete],
//       '5': [Function: bound onParserExecute],
//       '6': [Function: bound onParserTimeout],
//       _headers: [],
//       _url: '',
//       socket: [Circular *1],
//       incoming: null,
//       outgoing: null,
//       maxHeaderPairs: 2000,
//       _consumed: true,
//       onIncoming: [Function: bound parserOnIncoming],
//       [Symbol(resource_symbol)]: [HTTPServerAsyncResource]
//     },
//     on: [Function: socketListenerWrap],
//     addListener: [Function: socketListenerWrap],
//     prependListener: [Function: socketListenerWrap],
//     _paused: false,
//     _httpMessage: null,
//     _peername: { address: '::1', family: 'IPv6', port: 56300 },
//     timeout: 5000,
//     [Symbol(async_id_symbol)]: 12,
//     [Symbol(kHandle)]: TCP {
//       reading: true,
//       onconnection: null,
//       _consumed: true,
//       [Symbol(owner_symbol)]: [Circular *1]
//     },
//     [Symbol(kSetNoDelay)]: false,
//     [Symbol(lastWriteQueueSize)]: 0,
//     [Symbol(timeout)]: Timeout {
//       _idleTimeout: 5000,
//       _idlePrev: [TimersList],
//       _idleNext: [TimersList],
//       _idleStart: 3413,
//       _onTimeout: [Function: bound ],
//       _timerArgs: undefined,
//       _repeat: null,
//       _destroyed: false,
//       [Symbol(refed)]: false,
//       [Symbol(kHasPrimitive)]: false,
//       [Symbol(asyncId)]: 24,
//       [Symbol(triggerId)]: 22
//     },
//     [Symbol(kBuffer)]: null,
//     [Symbol(kBufferCb)]: null,
//     [Symbol(kBufferGen)]: null,
//     [Symbol(kCapture)]: false,
//     [Symbol(kBytesRead)]: 0,
//     [Symbol(kBytesWritten)]: 0,
//     [Symbol(RequestTimeout)]: undefined
//   },
//   httpVersionMajor: 1,
//   httpVersionMinor: 1,
//   httpVersion: '1.1',
//   complete: true,
//   headers: {
//     'content-type': 'application/json',
//     'user-agent': 'PostmanRuntime/7.28.4',
//     accept: '*/*',
//     'postman-token': '3a92a4b7-3ddc-4af8-8510-8b4bbf1607ca',
//     host: 'localhost:3001',
//     'accept-encoding': 'gzip, deflate, br',
//     connection: 'keep-alive',
//     'content-length': '52'
//   },
//   rawHeaders: [
//     'Content-Type',
//     'application/json',
//     'User-Agent',
//     'PostmanRuntime/7.28.4',
//     'Accept',
//     '*/*',
//     'Postman-Token',
//     '3a92a4b7-3ddc-4af8-8510-8b4bbf1607ca',
//     'Host',
//     'localhost:3001',
//     'Accept-Encoding',
//     'gzip, deflate, br',
//     'Connection',
//     'keep-alive',
//     'Content-Length',
//     '52'
//   ],
//   trailers: {},
//   rawTrailers: [],
//   aborted: false,
//   upgrade: false,
//   url: '/api/people',
//   method: 'POST',
//   statusCode: null,
//   statusMessage: null,
//   client: <ref *1> Socket {
//     connecting: false,
//     _hadError: false,
//     _parent: null,
//     _host: null,
//     _readableState: ReadableState {
//       objectMode: false,
//       highWaterMark: 16384,
//       buffer: BufferList { head: null, tail: null, length: 0 },
//       length: 0,
//       pipes: [],
//       flowing: true,
//       ended: false,
//       endEmitted: false,
//       reading: true,
//       sync: false,
//       needReadable: true,
//       emittedReadable: false,
//       readableListening: false,
//       resumeScheduled: false,
//       errorEmitted: false,
//       emitClose: false,
//       autoDestroy: false,
//       destroyed: false,
//       errored: null,
//       closed: false,
//       closeEmitted: false,
//       defaultEncoding: 'utf8',
//       awaitDrainWriters: null,
//       multiAwaitDrain: false,
//       readingMore: false,
//       decoder: null,
//       encoding: null,
//       [Symbol(kPaused)]: false
//     },
//     _events: [Object: null prototype] {
//       end: [Array],
//       timeout: [Function: socketOnTimeout],
//       data: [Function: bound socketOnData],
//       error: [Function: socketOnError],
//       close: [Function: bound socketOnClose],
//       drain: [Function: bound socketOnDrain],
//       resume: [Function: onSocketResume],
//       pause: [Function: onSocketPause]
//     },
//     _eventsCount: 8,
//     _maxListeners: undefined,
//     _writableState: WritableState {
//       objectMode: false,
//       highWaterMark: 16384,
//       finalCalled: false,
//       needDrain: false,
//       ending: false,
//       ended: false,
//       finished: false,
//       destroyed: false,
//       decodeStrings: false,
//       defaultEncoding: 'utf8',
//       length: 0,
//       writing: false,
//       corked: 0,
//       sync: false,
//       bufferProcessing: false,
//       onwrite: [Function: bound onwrite],
//       writecb: null,
//       writelen: 0,
//       afterWriteTickInfo: null,
//       buffered: [],
//       bufferedIndex: 0,
//       allBuffers: true,
//       allNoop: true,
//       pendingcb: 0,
//       prefinished: false,
//       errorEmitted: false,
//       emitClose: false,
//       autoDestroy: false,
//       errored: null,
//       closed: false,
//       closeEmitted: false
//     },
//     allowHalfOpen: true,
//     _sockname: null,
//     _pendingData: null,
//     _pendingEncoding: '',
//     server: Server {
//       maxHeaderSize: undefined,
//       insecureHTTPParser: undefined,
//       _events: [Object: null prototype],
//       _eventsCount: 2,
//       _maxListeners: undefined,
//       _connections: 2,
//       _handle: [TCP],
//       _usingWorkers: false,
//       _workers: [],
//       _unref: false,
//       allowHalfOpen: true,
//       pauseOnConnect: false,
//       httpAllowHalfOpen: false,
//       timeout: 0,
//       keepAliveTimeout: 5000,
//       maxHeadersCount: null,
//       headersTimeout: 60000,
//       requestTimeout: 0,
//       _connectionKey: '6::::3001',
//       [Symbol(IncomingMessage)]: [Function: IncomingMessage],
//       [Symbol(ServerResponse)]: [Function: ServerResponse],
//       [Symbol(kCapture)]: false,
//       [Symbol(async_id_symbol)]: 6
//     },
//     _server: Server {
//       maxHeaderSize: undefined,
//       insecureHTTPParser: undefined,
//       _events: [Object: null prototype],
//       _eventsCount: 2,
//       _maxListeners: undefined,
//       _connections: 2,
//       _handle: [TCP],
//       _usingWorkers: false,
//       _workers: [],
//       _unref: false,
//       allowHalfOpen: true,
//       pauseOnConnect: false,
//       httpAllowHalfOpen: false,
//       timeout: 0,
//       keepAliveTimeout: 5000,
//       maxHeadersCount: null,
//       headersTimeout: 60000,
//       requestTimeout: 0,
//       _connectionKey: '6::::3001',
//       [Symbol(IncomingMessage)]: [Function: IncomingMessage],
//       [Symbol(ServerResponse)]: [Function: ServerResponse],
//       [Symbol(kCapture)]: false,
//       [Symbol(async_id_symbol)]: 6
//     },
//     parser: HTTPParser {
//       '0': [Function: bound setRequestTimeout],
//       '1': [Function: parserOnHeaders],
//       '2': [Function: parserOnHeadersComplete],
//       '3': [Function: parserOnBody],
//       '4': [Function: parserOnMessageComplete],
//       '5': [Function: bound onParserExecute],
//       '6': [Function: bound onParserTimeout],
//       _headers: [],
//       _url: '',
//       socket: [Circular *1],
//       incoming: null,
//       outgoing: null,
//       maxHeaderPairs: 2000,
//       _consumed: true,
//       onIncoming: [Function: bound parserOnIncoming],
//       [Symbol(resource_symbol)]: [HTTPServerAsyncResource]
//     },
//     on: [Function: socketListenerWrap],
//     addListener: [Function: socketListenerWrap],
//     prependListener: [Function: socketListenerWrap],
//     _paused: false,
//     _httpMessage: null,
//     _peername: { address: '::1', family: 'IPv6', port: 56300 },
//     timeout: 5000,
//     [Symbol(async_id_symbol)]: 12,
//     [Symbol(kHandle)]: TCP {
//       reading: true,
//       onconnection: null,
//       _consumed: true,
//       [Symbol(owner_symbol)]: [Circular *1]
//     },
//     [Symbol(kSetNoDelay)]: false,
//     [Symbol(lastWriteQueueSize)]: 0,
//     [Symbol(timeout)]: Timeout {
//       _idleTimeout: 5000,
//       _idlePrev: [TimersList],
//       _idleNext: [TimersList],
//       _idleStart: 3413,
//       _onTimeout: [Function: bound ],
//       _timerArgs: undefined,
//       _repeat: null,
//       _destroyed: false,
//       [Symbol(refed)]: false,
//       [Symbol(kHasPrimitive)]: false,
//       [Symbol(asyncId)]: 24,
//       [Symbol(triggerId)]: 22
//     },
//     [Symbol(kBuffer)]: null,
//     [Symbol(kBufferCb)]: null,
//     [Symbol(kBufferGen)]: null,
//     [Symbol(kCapture)]: false,
//     [Symbol(kBytesRead)]: 0,
//     [Symbol(kBytesWritten)]: 0,
//     [Symbol(RequestTimeout)]: undefined
//   },
//   _consuming: true,
//   _dumped: false,
//   next: [Function: next],
//   baseUrl: '',
//   originalUrl: '/api/people',
//   _parsedUrl: Url {
//     protocol: null,
//     slashes: null,
//     auth: null,
//     host: null,
//     port: null,
//     hostname: null,
//     hash: null,
//     search: null,
//     query: null,
//     pathname: '/api/people',
//     path: '/api/people',
//     href: '/api/people',
//     _raw: '/api/people'
//   },
//   params: {},
//   query: {},
//   res: ServerResponse {
//     _events: [Object: null prototype] { finish: [Function: bound resOnFinish] },
//     _eventsCount: 1,
//     _maxListeners: undefined,
//     outputData: [],
//     outputSize: 0,
//     writable: true,
//     destroyed: false,
//     _last: false,
//     chunkedEncoding: false,
//     shouldKeepAlive: true,
//     _defaultKeepAlive: true,
//     useChunkedEncodingByDefault: true,
//     sendDate: true,
//     _removedConnection: false,
//     _removedContLen: false,
//     _removedTE: false,
//     _contentLength: 51,
//     _hasBody: true,
//     _trailer: '',
//     finished: true,
//     _headerSent: true,
//     socket: null,
//     _header: 'HTTP/1.1 200 OK\r\n' +
//       'X-Powered-By: Express\r\n' +
//       'Content-Type: application/json; charset=utf-8\r\n' +
//       'Content-Length: 51\r\n' +
//       'ETag: W/"33-/b4BL+DpTMUj0bP4xo2wgfUNMik"\r\n' +
//       'Date: Thu, 30 Sep 2021 07:58:07 GMT\r\n' +
//       'Connection: keep-alive\r\n' +
//       'Keep-Alive: timeout=5\r\n' +
//       '\r\n',
//     _keepAliveTimeout: 5000,
//     _onPendingData: [Function: bound updateOutgoingData],
//     _sent100: false,
//     _expect_continue: false,
//     req: [Circular *2],
//     locals: [Object: null prototype] {},
//     _startAt: [ 37603, 954732018 ],
//     _startTime: 2021-09-30T07:58:07.380Z,
//     writeHead: [Function: writeHead],
//     __onFinished: null,
//     statusCode: 200,
//     statusMessage: 'OK',
//     [Symbol(kCapture)]: false,
//     [Symbol(kNeedDrain)]: false,
//     [Symbol(corked)]: 0,
//     [Symbol(kOutHeaders)]: [Object: null prototype] {
//       'x-powered-by': [Array],
//       'content-type': [Array],
//       'content-length': [Array],
//       etag: [Array]
//     }
//   },
//   body: { name: 'Rasmus', number: '0761854123' },
//   _body: true,
//   length: undefined,
//   _startAt: [ 37603, 952891583 ],
//   _startTime: 2021-09-30T07:58:07.378Z,
//   _remoteAddress: '::1',
//   route: Route {
//     path: '/api/people',
//     stack: [ [Layer] ],
//     methods: { post: true }
//   },
//   [Symbol(kCapture)]: false,
//   [Symbol(RequestTimeout)]: undefined
// } */}
