const { ShardingManager } = require('discord.js');
const bumbe = new ShardingManager('./index.js', { //main dosyanızı yazın!
	totalShards: 2, //Auto yazılabilir veya farklı bir sayı yazabilirsiniz.
    token: "NzQxODY2NTUxNTAxNzgzMTQw.Xy9zEQ.p8adXoyii6VuL4-SBfUwPQw_7Go" //Tokeninizi giriniz
});
bumbe.spawn();

bumbe.on('shardCreate', shard => {
    console.log(`${shard.id} İDli shard başlatıldı!`);
});
