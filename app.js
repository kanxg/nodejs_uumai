var restify = require('restify');

var ip_addr = process.env.OPENSHIFT_NODEJS_IP   || '127.0.0.1';
var port    = process.env.OPENSHIFT_NODEJS_PORT || '8080';

var server = restify.createServer({
	name : "uumai"
});

server.pre(restify.pre.userAgentConnection());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.fullResponse());
server.use(restify.bodyParser());
server.use(restify.CORS());

//amazon rest
var amazon=require('./tables/amazon.js');
server.get({path : '/amazons' , version : '0.0.1'} , amazon.findAll);
server.get({path : '/amazons' +'/:id' , version : '0.0.1'} , amazon.find);

//xueqiu rest
var xueqiu=require('./tables/xueqiu.js');
server.get({path : '/xueqius' , version : '0.0.1'} , xueqiu.findAll);
server.get({path : '/xueqius' +'/:id' , version : '0.0.1'} , xueqiu.find);

server.listen(port ,ip_addr, function(){
	console.log('%s listening at %s ', server.name , server.url);
})
