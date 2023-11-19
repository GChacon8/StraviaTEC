using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using MONGOAPI2.Models;
using MONGOAPI2.Data;
using MongoDB.Driver;
using Microsoft.Extensions.Options;
using MONGOAPI2.Data;
using MONGOAPI2.Models;

var builder = WebApplication.CreateBuilder(args);

// Register services here
builder.Services.Configure<MongoDBSettings>(builder.Configuration.GetSection(nameof(MongoDBSettings)));

builder.Services.AddSingleton<MongoDBContext>(serviceProvider =>
{
    var settings = serviceProvider.GetRequiredService<IOptions<MongoDBSettings>>().Value;
    return new MongoDBContext(settings.ConnectionString, settings.DatabaseName);
});

// Add controllers
builder.Services.AddControllers();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "MONGOAPI2", Version = "v1" });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseHttpsRedirection();

app.UseRouting();
app.UseSwagger();
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "MONGOAPI2 v1"));

app.UseAuthorization();

app.MapControllers();

app.Run();
