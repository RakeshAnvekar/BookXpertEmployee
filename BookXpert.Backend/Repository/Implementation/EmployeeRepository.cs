namespace BookXpert.Backend.Repository.Implementation;

using BookXpert.Backend.Context;
using BookXpert.Backend.Models.Employee;
using BookXpert.Backend.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

public class EmployeeRepository : IEmployeeRepository
{
    #region Fields
    private readonly BookXpertApplicationDbContext _context;
    #endregion

    #region Constructors
    public EmployeeRepository(BookXpertApplicationDbContext context)
    {
        _context = context;
    }
    #endregion
    #region Methods

    public async Task<IEnumerable<Employee>> GetAllAsync(int page, int pageSize, CancellationToken cancellationToken)
    {
        return await _context.Employees
            .Include(e => e.State)
            .OrderBy(e => e.Name)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);
    }

    public async Task<int> GetTotalCountAsync(CancellationToken cancellationToken)
    {
        return await _context.Employees.CountAsync(cancellationToken);
    }

    public async Task<Employee?> GetByIdAsync(int id, CancellationToken cancellationToken)
    {
        return await _context.Employees.FirstOrDefaultAsync(e => e.Id == id,cancellationToken);
    }

    public async Task<Employee?> GetByNameAsync(string name, CancellationToken cancellationToken)
    {
        return await _context.Employees.FirstOrDefaultAsync(e => e.Name == name,cancellationToken);
    }

    public async Task<IEnumerable<Employee>> SearchByNameAsync(string name,CancellationToken cancellationToken)
    {
        return await _context.Employees
            .Include(e => e.State)
            .Where(e => e.Name.Contains(name))
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Employee employee,CancellationToken cancellationToken)
    {
        await _context.Employees.AddAsync(employee,cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Employee employee,CancellationToken cancellationToken)
    {
        _context.Employees.Update(employee);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(int id, CancellationToken cancellationToken)
    {
        var employee = await _context.Employees.FindAsync(id, cancellationToken);
        if (employee != null)
        {
            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }

    public async Task DeleteMultipleAsync(List<int> ids,CancellationToken cancellationToken)
    {
        var employees = await _context.Employees.Where(e => ids.Contains(e.Id)).ToListAsync(cancellationToken);
        _context.Employees.RemoveRange(employees);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task<bool> IsDuplicateAsync(string name, CancellationToken cancellationToken, int? idToExclude = null)
    {
        return await _context.Employees.AnyAsync(e =>
            e.Name == name && (!idToExclude.HasValue || e.Id != idToExclude), cancellationToken);
    }

    #endregion
}

