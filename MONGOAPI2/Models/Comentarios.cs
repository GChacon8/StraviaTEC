using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Runtime.Serialization;

namespace MONGOAPI2.Models;

[BsonIgnoreExtraElements]
public class Comentarios
{
    
    [BsonId]
    public MongoDB.Bson.ObjectId _id { get; set; }


    public int ID { get; set; }

    public string Comentario { get; set; }
}
