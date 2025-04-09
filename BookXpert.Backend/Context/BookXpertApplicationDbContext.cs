using BookXpert.Backend.Models.Employee;
using BookXpert.Backend.Models.State;
using Microsoft.EntityFrameworkCore;

namespace BookXpert.Backend.Context;

public class BookXpertApplicationDbContext: DbContext
{
    #region Constructor
    public BookXpertApplicationDbContext(DbContextOptions<BookXpertApplicationDbContext> options) : base(options)
    {
        
    }
    #endregion
    #region Methods
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);        
       
        modelBuilder.Entity<State>().HasData(
            new State { Id = 1, Name = "Texas" },
            new State { Id = 2, Name = "California" },
            new State { Id = 3, Name = "New York" },
            new State { Id = 4, Name = "Florida" }
        );
    }
    #endregion
    #region DbSet
    public DbSet<Employee> Employees { get; set; }
    public DbSet<State> States { get; set; }
    #endregion
}
