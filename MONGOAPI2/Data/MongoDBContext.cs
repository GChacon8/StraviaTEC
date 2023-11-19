using MONGOAPI2.Models;
using MongoDB.Driver;

namespace MONGOAPI2.Data;

public class MongoDBContext
{
    private readonly IMongoDatabase _database;

    public MongoDBContext(string connectionString, string databaseName)
    {
        var client = new MongoClient(connectionString);
        _database = client.GetDatabase(databaseName);
    }

    public IMongoCollection<Comentarios> Comentarios => _database.GetCollection<Comentarios>("Comentarios");
}
