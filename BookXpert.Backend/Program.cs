using BookXpert.Backend.BusinessLogic.Implementation;
using BookXpert.Backend.BusinessLogic.Interfaces;
using BookXpert.Backend.Context;
using BookXpert.Backend.Repository.Implementation;
using BookXpert.Backend.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);




builder.Services.AddDbContext<BookXpertApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("BookXpertApplicationConnection"));
});

#region Repository
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IStateRepository, StateRepository>();
#endregion

#region Business logic
builder.Services.AddScoped<IEmployeeLogic, EmployeeLogic>();
builder.Services.AddScoped<IStateLogic, StateLogic>();
#endregion
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
