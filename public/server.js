const { MongoClient, ServerApiVersion } = require('mongodb')
const uri =
    'mongodb+srv://acCELLerate:u74gQ5EpDgFM74mz2TX7@orderlist.tggdj44.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
})
client.connect((err) => {
    const collection = client.db('test').collection('devices')
    // perform actions on the collection object
    client.close()
})
