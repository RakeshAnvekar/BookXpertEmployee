using BookXpert.Backend.Models.Employee;

namespace BookXpert.Backend.Repository.Interfaces;

public interface IEmployeeRepository
{
    Task<IEnumerable<Employee>> GetAllAsync(int page, int pageSize,CancellationToken cancellationToken);
    Task<int> GetTotalCountAsync(CancellationToken cancellationToken);
    Task<Employee?> GetByIdAsync(int id, CancellationToken cancellationToken);
    Task<Employee?> GetByNameAsync(string name, CancellationToken cancellationToken);
    Task<IEnumerable<Employee>> SearchByNameAsync(string name, CancellationToken cancellationToken);
    Task AddAsync(Employee employee, CancellationToken cancellationToken);
    Task UpdateAsync(Employee employee, CancellationToken cancellationToken);
    Task DeleteAsync(int id, CancellationToken cancellationToken);
    Task DeleteMultipleAsync(List<int> ids, CancellationToken cancellationToken);
    Task<bool> IsDuplicateAsync(string name, CancellationToken cancellationToken, int? idToExclude = null);
}
