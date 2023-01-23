$serverApi = new ServerApi(ServerApi::V1);
$client = new MongoDB\Client(
    'mongodb+srv://acCELLerate:u74gQ5EpDgFM74mz2TX7@orderlist.tggdj44.mongodb.net/?retryWrites=true&w=majority', [], ['serverApi' => $serverApi]);
$db = $client->test;
